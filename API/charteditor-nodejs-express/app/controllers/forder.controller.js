const db = require("../models");
const Forder = db.forder;
const Sheetdef = db.sheetdef;
const Op = db.Sequelize.Op;
var arrayToTree = require('array-to-tree');

exports.orderInfo = (req, res) => {
  const {page, limit, FORDER_ID, FORDER_NAME} = req.query

  var condition = null
  if(FORDER_ID && FORDER_NAME) {
    condition =  { FORDER_NAME: { [Op.like]: `%${FORDER_NAME}%` }, FORDER_ID: { [Op.like]: `%${FORDER_ID}%` } }
  } else if(FORDER_ID) {
    condition =  { FORDER_ID: { [Op.like]: `%${FORDER_ID}%` } }
  } else if(FORDER_NAME) {
    condition =  { FORDER_NAME: { [Op.like]: `%${FORDER_NAME}%` } }
  }
 
  var whereCondition = null
  // if(page && limit) {
  //   whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  // } else 
  //   whereCondition = { where: condition }
  whereCondition = { where: condition }

  Forder.findAndCountAll(whereCondition)
    .then(data => {
      res.send({
        code: 200,
        data: {
          result: {
            rows: arrayToTree(JSON.parse(JSON.stringify(data.rows)), { customID: "FORDER_ID", parentProperty: "PARENT_FORDER_ID", childrenProperty: "children"}),
            count:data.count
          } 
        }
      });
    })
    .catch(err => {
      res.send({
        code:500,
        message:
          err.message || "Some error occurred while retrieving forders."
      });
    });
};

exports.createOrder = (req, res) => {

  const order = {
    FORDER_ID: req.body.FORDER_ID,
    PARENT_FORDER_ID: req.body.PARENT_FORDER_ID,
    FORDER_NAME: req.body.FORDER_NAME,
    UNIT: req.body.UNIT,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save order in the database
   Forder.create(order)
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
         err.message || "Some error occurred while creating the Order."
     });
   });
};

exports.updateOrder = (req, res) => {
  const ID = req.body.ID;

  req.body.F_LASTMODIFYTIME = new Date()
  if(req.body.PARENT_FORDER_ID === req.body.FORDER_ID) {
    req.body.PARENT_FORDER_ID = undefined
  }

  console.log("parentid", req.body.PARENT_FORDER_ID)
  console.log("updateOrder", req.body)

  Forder.update(req.body, {
    where: { ID: ID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          message: "Order was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Order with order id=${ID}. Maybe Order was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Order with order id=" + FORDER_ID
      });
    });
};

exports.deleteOrder = (req, res) => {
  const FORDER_ID = req.params.forder_id;

  Forder.findAll( { where: { PARENT_FORDER_ID: FORDER_ID } })
    .then(data => {
      if( data.length > 0) {
        res.send({
          code:500,
          message: "Could not delete Order with order id=" + FORDER_ID
        });
        return;
      }

      Sheetdef.findAll( { where: { FORDER_ID: FORDER_ID } })
      .then(data => {
        if( data.length > 0) {
          res.send({
            code:500,
            message: "Could not delete Order with order id=" + FORDER_ID
          });
          return;
        }
        Forder.destroy({
          where: { FORDER_ID: FORDER_ID }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                code:200,
                message: "Order was deleted successfully!"
              });
            } else {
              res.send({
                code:200,
                message: `Cannot delete Order with order id=${FORDER_ID}. Maybe Order was not found!`
              });
            }
          })
          .catch(err => {
            res.send({
              code:500,
              message: "Could not delete Order with order id=" + FORDER_ID
            });
          });
      })    
      .catch(err => {
        res.send({
          code:500,
          message: "Could not delete Order with order id=" + FORDER_ID
        });
      });

    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Order with order id=" + FORDER_ID
      });
    });
};
