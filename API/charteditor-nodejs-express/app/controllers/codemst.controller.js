const db = require("../models");
const Codemst = db.codemst;
const Codedtl = db.codedtl;
const Op = db.Sequelize.Op;

exports.codemstInfo = (req, res) => {
  const {page, limit, CODE_TYPE, ENABLED} = req.query

  var condition = null
  if(CODE_TYPE && ENABLED) {
    condition = { CODE_TYPE: { [Op.like]: `%${CODE_TYPE}%` },  ENABLED: ENABLED}
  } else if(CODE_TYPE) {
    condition = { CODE_TYPE: { [Op.like]: `%${CODE_TYPE}%` } }
  } else if(ENABLED) {
    condition = { ENABLED: ENABLED }
  }

  var whereCondition = null
  if(page && limit) {
    whereCondition = { where: condition, limit:limit*1, offset:limit*(page-1)}
  } else 
    whereCondition = { where: condition }

  Codemst.findAndCountAll(whereCondition)
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
        err.message || "Some error occurred while retrieving codemst."
    });
  });

};

exports.createCodemst = (req, res) => {

  const codemst = {
    CODE_TYPE: req.body.CODE_TYPE,
    CODE_DESC: req.body.CODE_DESC,
    CODE_BACKGROUND_DESC: req.body.CODE_BACKGROUND_DESC,
    CODE_TIP_DESC: req.body.CODE_TIP_DESC,
    FIELD_WIDTH: req.body.FIELD_WIDTH,
    READONLY_FLAG: req.body.READONLY_FLAG,
    ENABLED: req.body.ENABLED,
    DATA_SOURCE: req.body.DATA_SOURCE,
    USER_UPDATEABLE: req.body.USER_UPDATEABLE,
    USER_DELETEABLE: req.body.USER_DELETEABLE,
    USER_INPUTTYPE: req.body.USER_INPUTTYPE,
    ALLOW_MULTIPLE_CHOOICE: req.body.ALLOW_MULTIPLE_CHOOICE,
    F_CREATORTIME: new Date(),
    F_LASTMODIFYTIME: new Date()
  };

   // Save Codemst in the database
   Codemst.create(codemst)
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
         err.message || "Some error occurred while creating the Codemst."
     });
   });
};

exports.updateCodemst = (req, res) => {
  const id = req.body.ID;

  req.body.F_LASTMODIFYTIME = new Date()

  Codemst.update(req.body, {
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          code: 200,
          lastmodifytime: req.body.F_LASTMODIFYTIME,
          message: "Codemst was updated successfully."
        });
      } else {
        res.send({
          code: 500,
          message: `Cannot update Codemst with id=${id}. Maybe Codemst was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        code: 500,
        message: "Error updating Codemst with id=" + id
      });
    });
};

exports.deleteCodemst = (req, res) => {
  const code_type = req.params.code_type;
  Codedtl.findAll( { where: { CODE_TYPE: code_type } })
    .then(data => {
      if( data.length > 0) {
        res.send({
          code:500,
          message: "Could not delete Codemst with code type=" + code_type + ", There are childrens."
        });
        return;
      }
      Codemst.destroy({
        where: { CODE_TYPE: code_type }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              code:200,
              message: "Codemst was deleted successfully!"
            });
          } else {
            res.send({
              code:200,
              message: `Cannot delete Codemst with code type=${code_type}. Maybe Codemst was not found!`
            });
          }
        })
        .catch(err => {
          res.send({
            code:500,
            message: "Could not delete Codemst with code type=" + code_type
          });
        });
    })
    .catch(err => {
      res.send({
        code:500,
        message: "Could not delete Codemst with code type=" + code_type
      });
    });
};

exports.countCodemst = async(req, res) => {
  const { CODE_TYPE, ID } = req.query

  var data = null
  if(ID) {
    data = await Codemst.findAll({ where: {ID: ID}})    
  }

  if(data !== null && data.length > 0) {
    if(CODE_TYPE === data[0].CODE_TYPE) {
      res.send({
        code: 200,
        data: {
          result: 0
        }
      });
      return;
    } 
  }

  var condition = CODE_TYPE ? {CODE_TYPE: CODE_TYPE} : null
  Codemst.findAll({ where: condition})
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
          err.message || "Some error occurred while retrieving codemst."
      });
    });
}
