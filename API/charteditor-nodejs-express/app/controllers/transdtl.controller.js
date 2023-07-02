const db = require("../models");
const Transdtl = db.transdtl;
const Op = db.Sequelize.Op;
const {v1: uuidv1, v4: uuidv4} = require('uuid');

exports.transdtlInfo = (req, res) => {
  const {page, limit, TRANS_ID, SHEET_ID, ITEM_ID} = req.query

  var condition = {}
  if(TRANS_ID) {
    condition.TRANS_ID = TRANS_ID
  }
  if(SHEET_ID) {
    condition.SHEET_ID = SHEET_ID
  }
  if(ITEM_ID) {
    condition.ITEM_ID = ITEM_ID
  }

  var whereCondition = null
  if(page && limit) {
    whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  } else 
    whereCondition = { where: condition }

  Transdtl.findAndCountAll(whereCondition)
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
        err.message || "Some error occurred while retrieving transdtl."
    });
  });

};

exports.createTransdtl = (req, res) => {

  // Transdtl.findAndCountAll({where:{ITEM_ID: req.body.ITEM_ID, SHEET_ID: req.body.SHEET_ID}})
  // .then(data => {
  //   // console.log("data-------------",data)
  //   if(data.count !== 0) {
  //     req.body.F_LASTMODIFYTIME = new Date()
  //     Transdtl.update(req.body, {
  //       where: { ITEM_ID: req.body.ITEM_ID, SHEET_ID: req.body.SHEET_ID }
  //     })
  //       .then(num => {
  //         if (num == 1) {
  //           res.send({
  //             code: 200,
  //             message: "Transdtl was updated successfully."
  //           });
  //         } else {
  //           res.send({
  //             code: 500,
  //             message: `Cannot update Transdtl with item id=${req.body.ITEM_ID}. Maybe Transdtl was not found or req.body is empty!`
  //           });
  //         }
  //       })
  //       .catch(err => {
  //         res.send({
  //           code: 500,
  //           message: "Error updating Transdtl with item id=" + req.body.ITEM_ID
  //         });
  //       });
  //       return
  //   } else {
      // console.log("item id", req.body.ITEM_ID)
      const transdtl = {
        TRANS_ID: req.body.TRANS_ID,
        SHEET_ID: req.body.SHEET_ID,
        ITEM_ID: req.body.ITEM_ID,
        ITEM_NAME: req.body.ITEM_NAME,
        ITEM_EDIT_TYPE: req.body.ITEM_EDIT_TYPE,
        ITEM_VALUE: req.body.ITEM_VALUE,
        RECORD_TIME: req.body.RECORD_TIME,
        F_CREATORTIME: new Date(),
        F_LASTMODIFYTIME: new Date()
      };
    
       // Save Transdtl in the database
       Transdtl.create(transdtl)
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
             err.message || "Some error occurred while creating the Transdtl."
         });
       });
  //   }
  // }).catch(err => {
  //   res.send({
  //     code:500,
  //     message:
  //       err.message || "Some error occurred while retrieving transdtl."
  //   });
  // });
};

exports.updateTransdtl = (req, res) => {
  const item_id = req.body.ITEM_ID;

  req.body.F_LASTMODIFYTIME = new Date()

  Transdtl.update(req.body, {
    where: { ITEM_ID: item_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Transdtl was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Transdtl with item id=${item_id}. Maybe Transdtl was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Transdtl with item id=" + item_id
      });
    });
};


exports.deleteTransdtl = (req, res) => {
  const TRANS_ID = req.params.trans_id;
  Transdtl.destroy({
    where: { TRANS_ID: TRANS_ID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code:200,
          message: "Transdtl was deleted successfully!"
        });
      } else {
        res.send({
          code:200,
          message: `Cannot delete Transdtl with trans id =${TRANS_ID}. Maybe Transdtl was not found!`
        });
      }
    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Transdtl with id=" + TRANS_ID
      });
    });
};