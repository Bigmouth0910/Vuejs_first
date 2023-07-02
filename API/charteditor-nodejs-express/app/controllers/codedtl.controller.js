const db = require("../models");
const Codedtl = db.codedtl;
const Op = db.Sequelize.Op;

exports.codedtlInfo = (req, res) => {
  const {page, limit, CODE_NO, CODE_DESC, CODE_TYPE} = req.query

  var condition = {CODE_TYPE: CODE_TYPE}
  if(CODE_NO)
    condition.CODE_NO = { [Op.like]: `%${CODE_NO}%` }
  if(CODE_DESC)
    condition.CODE_DESC = { [Op.like]: `%${CODE_DESC}%` }

  var whereCondition = null
  if(page && limit) {
    whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  } else 
    whereCondition = { where: condition }


  Codedtl.findAndCountAll(whereCondition)
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
        err.message || "Some error occurred while retrieving codedtl."
    });
  });

};

exports.createCodedtl = (req, res) => {

  const codedtl = {
    CODE_TYPE: req.body.CODE_TYPE,
    CODE_NO: req.body.CODE_NO,
    CODE_DESC: req.body.CODE_DESC,
    ENG_DESC: req.body.ENG_DESC,
    SORT_VALUE: req.body.SORT_VALUE,
    REMARK_DESC: req.body.REMARK_DESC,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save Codedtl in the database
   Codedtl.create(codedtl)
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
         err.message || "Some error occurred while creating the Codedtl."
     });
   });
};

exports.updateCodedtl = (req, res) => {
  const id = req.body.ID;

  req.body.F_LASTMODIFYTIME = new Date()

  Codedtl.update(req.body, {
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Codedtl was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Codedtl with id=${id}. Maybe Codedtl was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Codedtl with id=" + id
      });
    });
};

exports.deleteCodedtl = (req, res) => {
  const id = req.params.id;
  Codedtl.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code:200,
          message: "Codedtl was deleted successfully!"
        });
      } else {
        res.send({
          code:200,
          message: `Cannot delete Codedtl with id=${id}. Maybe Codedtl was not found!`
        });
      }
    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Codedtl with id=" + id
      });
    });
   
};

exports.countCodedtl = async(req, res) => {
  const { CODE_NO, CODE_TYPE, ID } = req.query

  var data = null
  if(ID) {
    data = await Codedtl.findAll({ where: {ID: ID}})    
  }

  if(data !== null && data.length > 0) {
    if(CODE_NO === data[0].CODE_NO) {
      res.send({
        code: 200,
        data: {
          result: 0
        }
      });
      return;
    } 
  }

  var condition = null
  if(CODE_NO)
    condition = {CODE_TYPE: CODE_TYPE, CODE_NO: CODE_NO}
  else condition = {CODE_TYPE: CODE_TYPE}

  Codedtl.findAll({ where: condition})
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
          err.message || "Some error occurred while retrieving codedtl."
      });
    });
}
