const db = require("../models");
const ConceptData = db.conceptdata;
const Op = db.Sequelize.Op;
const {v1: uuidv1, v4: uuidv4} = require('uuid');

exports.conceptdataInfo = (req, res) => {
  const {page, limit, F_PARENTID, F_FULLNAME} = req.query

  var condition = null
  if(F_PARENTID && F_FULLNAME) {
    condition = {F_PARENTID: F_PARENTID, F_FULLNAME: { [Op.like]: `%${F_FULLNAME}%` } }
  } else if(F_PARENTID) {
    condition = {F_PARENTID: F_PARENTID}
  } else if(F_FULLNAME) {
    condition = {F_FULLNAME: { [Op.like]: `%${F_FULLNAME}%` } }
  }

  var whereCondition = null
  if(page && limit) {
    whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  } else 
    whereCondition = { where: condition }

  ConceptData.findAndCountAll(whereCondition)
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
          err.message || "Some error occurred while retrieving conceptdata."
      });
    });
};

exports.createConceptdata = (req, res) => {

  const concept = {
    F_ID: uuidv1(),
    F_PARENTID: req.body.F_PARENTID,
    F_FULLNAME: req.body.F_FULLNAME,
    F_CODE: req.body.F_CODE,
    F_SIMPLESPELLING: req.body.F_DESCRIPTION,
    F_SORTCODE: req.body.F_SORTCODE,
    F_ENABLEDMARK: req.body.F_ENABLEDMARK,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save Concept in the database
   ConceptData.create(concept)
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
         err.message || "Some error occurred while creating the Conceptdata."
     });
   });
};

exports.updateConceptdata = (req, res) => {
  const F_ID = req.body.F_ID;

  req.body.F_LASTMODIFYTIME = new Date()
  if(req.body.F_PARENTID === F_ID) {
    req.body.F_PARENTID = undefined
  }

  ConceptData.update(req.body, {
    where: { F_ID: F_ID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Conceptdata was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Conceptdata with id=${id}. Maybe Conceptdata was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Conceptdata with id=" + id
      });
    });
};

exports.deleteConceptdata = (req, res) => {
  const id = req.params.id;

  ConceptData.destroy({
    where: { F_ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code:200,
          message: "Conceptdata was deleted successfully!"
        });
      } else {
        res.send({
          code:200,
          message: `Cannot delete Conceptdata with id=${id}. Maybe Conceptdata was not found!`
        });
      }
    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Conceptdata with id=" + id
      });
    });
     
};

exports.countConceptdata = async(req, res) => {
  const { F_CODE, F_ID } = req.query

  var data = null
  if(F_ID) {
    data = await ConceptData.findAll({ where: {F_ID: F_ID}})    
  }

  if(data !== null && data.length > 0) {
    if(F_CODE === data[0].F_CODE) {
      res.send({
        code: 200,
        data: {
          result: 0
        }
      });
      return;
    } 
  }

  var condition = F_CODE ? {F_CODE: F_CODE} : null
  ConceptData.findAll({ where: condition})
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
          err.message || "Some error occurred while retrieving conceptdata."
      });
    });
 
}
