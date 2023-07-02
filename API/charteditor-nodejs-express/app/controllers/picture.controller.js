const db = require("../models");
const Picture = db.picture;
const Op = db.Sequelize.Op;
var arrayToTree = require('array-to-tree');
const {v1: uuidv1, v4: uuidv4} = require('uuid');
var fs = require('fs');

exports.pictureInfo = (req, res) => {
  const {page, limit, FOLDER_ID, FILE_NAME, FILE_TYPE} = req.query

  console.log("file_type", FILE_TYPE)
  var type = FILE_TYPE
  if(FILE_TYPE === "null") type = null

  var condition = null
  var isLeaf = 0
  //leaf
  if(FOLDER_ID && FILE_NAME) {
    condition = {FILE_NAME: { [Op.like]: `%${FILE_NAME}%` } , FOLDER_ID: FOLDER_ID, FILE_TYPE:{[Op.not]: null}}
    isLeaf = 1
  } else if(FOLDER_ID) {
    condition = {FOLDER_ID: FOLDER_ID, FILE_TYPE:{[Op.not]: null}}
    isLeaf = 1
  } else if(FILE_NAME) {
    condition = { FILE_NAME: { [Op.like]: `%${FILE_NAME}%` }, FILE_TYPE:{[Op.not]: null} }
    isLeaf = 1
  } 
  //tree
  else if(FILE_NAME && FILE_TYPE) {
    condition = {FILE_NAME: { [Op.like]: `%${FILE_NAME}%` } , FILE_TYPE:{[Op.is]: type}}
  }   
  else if(FILE_TYPE) {
    condition = { FILE_TYPE:{[Op.is]: type} }
  } else {
    condition = { FILE_TYPE:{[Op.not]: null} }
  }

  var whereCondition = null
  if(isLeaf === 1) {
    if(page && limit) {
      whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
    } else 
      whereCondition = { where: condition }
  } else 
    whereCondition = { where: condition }

  Picture.findAndCountAll(whereCondition)
    .then(data => {
      res.send({
        code: 200,
        data: {
          result: data
        }
      });
    })
    .catch(err => {
      res.send({
        code:500,
        message:
          err.message || "Some error occurred while retrieving pictures."
      });
    });
};

exports.createPicture = (req, res) => {

  // var imageData = FS.readFileSync(__dirname + '/1.jpg');

  console.log("file_name", req.body.FILE_NAME)

  const picture = {
    FOLDER_ID: req.body.FOLDER_ID,
    PIC_SAMPLE_KEY: req.body.PIC_SAMPLE_KEY,
    FILE_NAME: req.body.FILE_NAME,
    FILE_DESC: req.body.FILE_DESC,
    FILE_PATH: req.body.FILE_PATH,
    FILE_TYPE: req.body.FILE_TYPE,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

  // try {
  //   const data = await Picture.create(picture);
  //   // you can now access the newly created user
  //   console.log('success', data);
  // } catch (err) {
  //   // print the error details
  //   console.log(err);
  // }

   // Save Picture in the database
   Picture.create(picture)
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
         err.message || "Some error occurred while creating the Picture."
     });
   });
};

exports.updatePicture = (req, res) => {
  const ID = req.body.ID;

  if(req.body.FILE_PATH != undefined && req.body.FILE_PATH != '' && req.body.FILE_PATH != null) {
    Picture.findAll({where: {ID: ID}})
      .then(data => {
        fs.unlinkSync('./uploads/' + data[0].FILE_PATH)
      })
      .catch(err => {
      });
  }
  req.body.F_LASTMODIFYTIME = new Date()
  req.body.FILE_PICTURE = undefined

  console.log("file_path", req.body.FILE_PATH)

  if(req.body.FOLDER_ID === ID) {
    req.body.FOLDER_ID = undefined
  }

  Picture.update(req.body, {
    where: { ID: ID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Picture was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Picture with id=${id}. Maybe Picture was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Picture with id=" + id
      });
    });
};

exports.deletePicture = (req, res) => {
  const id = req.params.id;

  Picture.findAll({where: {ID: id}})
  .then(data => {
    fs.unlinkSync('./uploads/' + data[0].FILE_PATH)
  })
  .catch(err => {
  });
  
  Picture.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {            
        res.send({
          code:200,
          message: "Picture was deleted successfully!"
        });
      } else {
        res.send({
          code:200,
          message: `Cannot delete picture with id=${id}. Maybe Picture was not found!`
        });
      }
    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete picture with id=" + id
      });
    });
};

exports.countPicture = async(req, res) => {
  const { PIC_SAMPLE_KEY, ID } = req.query

  var data = null
  if(ID) {
    data = await Picture.findAll({ where: {ID: ID}})    
  }

  if(data !== null && data.length > 0) {
    if(PIC_SAMPLE_KEY === data[0].PIC_SAMPLE_KEY) {
      res.send({
        code: 200,
        data: {
          result: 0
        }
      });
      return;
    }
  }

  var condition = PIC_SAMPLE_KEY ? {PIC_SAMPLE_KEY: PIC_SAMPLE_KEY} : null
  Picture.findAll({ where: condition})
    .then(data => {
      res.send({
        code: 200,
        data: {
          result: data.length
        }
      });
    })
    .catch(err => {
      res.send({
        code:500,
        message:
          err.message || "Some error occurred while retrieving picture."
      });
    });
};