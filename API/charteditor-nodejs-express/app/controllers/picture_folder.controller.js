const db = require("../models");
const PictureFolder = db.picture_folder;
const Picture = db.picture;
const Op = db.Sequelize.Op;
var arrayToTree = require('array-to-tree');
const {v1: uuidv1, v4: uuidv4} = require('uuid');
var fs = require('fs');


exports.pictureFolderInfo = (req, res) => {
  const {page, limit, PARENT_ID, FOLDER_NAME} = req.query

  var condition = null
  var isLeaf = 0
  //leaf
  if(PARENT_ID && FOLDER_NAME) {
    condition = {FOLDER_NAME: { [Op.like]: `%${FOLDER_NAME}%` } , PARENT_ID: PARENT_ID}
    isLeaf = 1
  } else if(PARENT_ID) {
    condition = {PARENT_ID: PARENT_ID}
    isLeaf = 1
  } else if(FOLDER_NAME) {
    condition = { FOLDER_NAME: { [Op.like]: `%${FOLDER_NAME}%` } }
    isLeaf = 1
  }
  //tree
  else {
    
  }

  var whereCondition = null
  if(isLeaf === 1) {
    if(page && limit) {
      whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
    } else 
      whereCondition = { where: condition }
  } else 
    whereCondition = { where: condition }

  PictureFolder.findAndCountAll(whereCondition)
    .then(data => {
      res.send({
        code: 200,
        data: {
          result: {
            rows: arrayToTree(JSON.parse(JSON.stringify(data.rows)), { customID: "ID", parentProperty: "PARENT_ID", childrenProperty: "children"}),
            count:data.count
          }
        }
      });
    })
    .catch(err => {
      res.send({
        code:500,
        message:
          err.message || "Some error occurred while retrieving picture folder."
      });
    });
};

exports.createPictureFolder = (req, res) => {

  const picture = {
    PARENT_ID: req.body.PARENT_ID,
    PIC_FOLDER_KEY: req.body.PIC_FOLDER_KEY,
    FOLDER_NAME: req.body.FOLDER_NAME,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save Picture in the database
   PictureFolder.create(picture)
   .then(data => {
     res.send({
      code: 200,
      data: {
        result: "success"
      }
    });
   })
   .catch(err => {
     res.send({
      code:500,
       message:
         err.message || "Some error occurred while creating the picture folder."
     });
   });
};

exports.updatePictureFolder = (req, res) => {
  const ID = req.body.ID;

  req.body.F_LASTMODIFYTIME = new Date()
  PictureFolder.update(req.body, {
    where: { ID: ID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Picture folder was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update picture folder with id=${id}. Maybe picture folder was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating picture folder with id=" + id
      });
    });
};

exports.deletePictureFolder = (req, res) => {
  const id = req.params.id;

  PictureFolder.findAll( { where: { PARENT_ID: id } })
    .then(data => {
      if( data.length > 0) {
        res.send({
          code:500,
          message: "Could not delete Picture with id=" + id
        });
        return;
      }
     
      Picture.findAll({where: {FOLDER_ID: id}})
      .then(data => {
        Picture.destroy({
          where: { FOLDER_ID: id }
        })
        .then(num => {
          if (num == 1) {  
            fs.unlinkSync('./uploads/' + data[0].FILE_PATH)
          } else {
            console.log(`Cannot delete picture with id=${id}. Maybe picture was not found!`)
          }
        })
        .catch(err => {
        });
      })
      .catch(err => {
      });

      
      
      PictureFolder.destroy({
        where: { ID: id }
      })
        .then(num => {
          if (num == 1) {            
            res.send({
              code:200,
              message: "Picture folder was deleted successfully!"
            });
          } else {
            res.send({
              code:200,
              message: `Cannot delete Picture folder with id=${id}. Maybe Picture folder was not found!`
            });
          }
        })
        .catch(err => {
          res.send({
            code:500,
            message: "Could not delete Picture folder with id=" + id
          });
        });     
    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Picture folder with id=" + id
      });
    });
};
