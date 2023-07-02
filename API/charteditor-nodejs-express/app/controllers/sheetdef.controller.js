const db = require("../models");
const Sheetdef = db.sheetdef;
const Forder = db.forder;
const Op = db.Sequelize.Op;

exports.sheetInfo = (req, res) => {
  const {page, limit, FORDER_ID, SHEET_TYPE} = req.query

  var condition = null
  if(FORDER_ID && SHEET_TYPE) {
    condition = { SHEET_TYPE: { [Op.like]: `%${SHEET_TYPE}%` },  FORDER_ID: FORDER_ID}
  } else if(SHEET_TYPE) {
    condition = { SHEET_TYPE: { [Op.like]: `%${SHEET_TYPE}%` } }
  } else if(FORDER_ID) {
    condition = { FORDER_ID: FORDER_ID }
  }

  var whereCondition = null
  if(page && limit) {
    whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  } else 
    whereCondition = { where: condition }


  Sheetdef.findAndCountAll(whereCondition)
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
        err.message || "Some error occurred while retrieving sheetdef."
    });
  });

};

exports.createSheet = (req, res) => {

  const sheet = {
    DOCUMENT_CODE: req.body.DOCUMENT_CODE,
    SHEET_ID: req.body.SHEET_ID,
    SHEET_NAME: req.body.SHEET_NAME,
    SHEET_TYPE: req.body.SHEET_TYPE,
    DEPT_NO: req.body.DEPT_NO,
    OWNER_SYS: req.body.OWNER_SYS,
    FORDER_ID: req.body.FORDER_ID,
    SHEET_HTML: req.body.SHEET_HTML,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save Sheetdef in the database
   Sheetdef.create(sheet)
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
         err.message || "Some error occurred while creating the Sheet."
     });
   });
};

exports.updateSheet = (req, res) => {
  const id = req.body.ID;

  req.body.F_LASTMODIFYTIME = new Date()
  
  Sheetdef.update(req.body, {
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Sheetdef was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Sheetdef with id=${id}. Maybe Sheetdef was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Sheetdef with id=" + id
      });
    });
};

exports.deleteSheet = (req, res) => {
  const id = req.params.id;
  Sheetdef.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code:200,
          message: "Sheetdef was deleted successfully!"
        });
      } else {
        res.send({
          code:200,
          message: `Cannot delete Sheetdef with id=${id}. Maybe Sheetdef was not found!`
        });
      }
    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Sheetdef with id=" + id
      });
    });
};

exports.countSheet = async(req, res) => {
  const { SHEET_ID, ID } = req.query

  var data = null
  if(ID) {
    data = await Sheetdef.findAll({ where: {ID: ID}})    
  }

  if(data !== null && data.length > 0) {
    if(SHEET_ID === data[0].SHEET_ID) {
      res.send({
        code: 200,
        data: {
          result: 0
        }
      });
      return;
    } 
  }

  var condition = SHEET_ID ? {SHEET_ID: SHEET_ID} : null
  Sheetdef.findAll({ where: condition})
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
          err.message || "Some error occurred while retrieving sheetdef."
      });
    });
 
}
