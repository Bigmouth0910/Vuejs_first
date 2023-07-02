const db = require("../models");
const Transmst = db.transmst;
const Op = db.Sequelize.Op;
const {v1: uuidv1, v4: uuidv4} = require('uuid');

exports.transmstInfo = (req, res) => {
  const {page, limit, SHEET_ID} = req.query

  var condition = null
  if(SHEET_ID) {
    condition = { SHEET_ID: SHEET_ID }
  }

  var whereCondition = null
  if(page && limit) {
    whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  } else 
    whereCondition = { where: condition }

  Transmst.findAndCountAll(whereCondition)
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
        err.message || "Some error occurred while retrieving transmst."
    });
  });

};

exports.createTransmst = (req, res) => {

  const transmst = {
    // TRANS_ID: uuidv1(),
    TRANS_ID: req.body.TRANS_ID,
    CHART_NO: req.body.CHART_NO,
    ENCOUNTER_NO: req.body.ENCOUNTER_NO,
    SHEET_ID: req.body.SHEET_ID,
    SHEET_NAME: req.body.SHEET_NAME,
    SHEET_HTML: req.body.SHEET_HTML,
    SHEET_TEXT: req.body.SHEET_TEXT,
    SMHC_STATUS: req.body.SMHC_STATUS,
    SHEET_STYLETYPE: req.body.SHEET_STYLETYPE,
    F_CREATORUSERID: req.body.F_CREATORUSERID,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save Transmst in the database
   Transmst.create(transmst)
   .then(data => {
     res.send({
      code: 200,
      data: {
        result: data
      }
    });
   })
   .catch(err => {
     console.log(err)
     res.send({
      code:500,
       message:
         err.message || "Some error occurred while creating the Transmst."
     });
   });
};

exports.updateTransmst = (req, res) => {
  const TRANS_ID = req.body.TRANS_ID;

  req.body.F_LASTMODIFYTIME = new Date()

  Transmst.update(req.body, {
    where: { TRANS_ID: TRANS_ID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          lastmodifytime: req.body.F_LASTMODIFYTIME,
          message: "Transmst was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Transmst with trans id=${TRANS_ID}. Maybe Transmst was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Transmst with trans id=" + TRANS_ID
      });
    });
};
