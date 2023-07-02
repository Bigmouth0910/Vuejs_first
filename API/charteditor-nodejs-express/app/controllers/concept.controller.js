const db = require("../models");
const Concept = db.concept;
const ConceptData = db.conceptdata;
const Op = db.Sequelize.Op;
var arrayToTree = require('array-to-tree');
const {v1: uuidv1, v4: uuidv4} = require('uuid');

exports.conceptInfo = (req, res) => {
  const {page, limit, F_FULLNAME} = req.query
  var condition = F_FULLNAME ? { F_FULLNAME: { [Op.like]: `%${F_FULLNAME}%` } } : null;

  var whereCondition = null
  // if(page && limit) {
  //   whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  // } else 
  //   whereCondition = { where: condition }

  whereCondition = { where: condition }

  Concept.findAndCountAll(whereCondition)
    .then(data => {
      res.send({
        code: 200,
        data: {
          result: {
            rows: arrayToTree(JSON.parse(JSON.stringify(data.rows)), { customID: "F_ID", parentProperty: "F_PARENTID", childrenProperty: "children"}),
            count: data.count
          } 
        }
      });
    })
    .catch(err => {
      res.send({
        code:500,
        message:
          err.message || "Some error occurred while retrieving concepts."
      });
    });
};

exports.createConcept = (req, res) => {

  const concept = {
    F_ID: uuidv1(),
    F_PARENTID: req.body.F_PARENTID,
    F_FULLNAME: req.body.F_FULLNAME,
    F_CODE: req.body.F_CODE,
    F_DESCRIPTION: req.body.F_DESCRIPTION,
    F_SORTCODE: req.body.F_SORTCODE,
    F_ENABLEDMARK: req.body.F_ENABLEDMARK,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save Concept in the database
   Concept.create(concept)
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
         err.message || "Some error occurred while creating the Concept."
     });
   });
};

exports.updateConcept = (req, res) => {
  const F_ID = req.body.F_ID;

  req.body.F_LASTMODIFYTIME = new Date()
  if(req.body.F_PARENTID === F_ID) {
    req.body.F_PARENTID = undefined
  }

  Concept.update(req.body, {
    where: { F_ID: F_ID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Concept was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Concept with id=${id}. Maybe Concept was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Concept with id=" + id
      });
    });
};

exports.deleteConcept = (req, res) => {
  const id = req.params.id;

  Concept.findAll( { where: { F_PARENTID: id } })
    .then(data => {
      if( data.length > 0) {
        res.send({
          code:500,
          message: "Could not delete Concept with id=" + id
        });
        return;
      }

      ConceptData.findAll( { where: { F_PARENTID: id } })
      .then(data => {
        if( data.length > 0) {
          res.send({
            code:500,
            message: "Could not delete Concept with id=" + id
          });
          return;
        }
        Concept.destroy({
          where: { F_ID: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                code:200,
                message: "Concept was deleted successfully!"
              });
            } else {
              res.send({
                code:200,
                message: `Cannot delete Concept with id=${id}. Maybe Concept was not found!`
              });
            }
          })
          .catch(err => {
            res.send({
              code:500,
              message: "Could not delete Concept with id=" + id
            });
          });
      })    
      .catch(err => {
        res.send({
          code:500,
          message: "Could not delete Concept with id=" + id
        });
      });

    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Concept with id=" + id
      });
    });
};

exports.countConcept = async(req, res) => {
  const { F_CODE, F_ID } = req.query

  var data = null
  if(F_ID) {
    data = await Concept.findAll({ where: {F_ID: F_ID}})    
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
  Concept.findAll({ where: condition})
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
          err.message || "Some error occurred while retrieving concept."
      });
    });
}
