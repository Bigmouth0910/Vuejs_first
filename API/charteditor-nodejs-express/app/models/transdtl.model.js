module.exports = (sequelize, Sequelize) => {
  const TransDtl = sequelize.define("chred_trans_dtl", {
    ID: {
      type: Sequelize.INTEGER(19),
      primaryKey: true,
      autoIncrement: true      
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    TRANS_ID: {
      type: Sequelize.STRING(40)
    },
    SHEET_ID: {
      type: Sequelize.STRING(255)
    },
    ITEM_ID: {
      type: Sequelize.STRING(100)
    },    
    ITEM_NAME: {
      type: Sequelize.STRING(500)
    },
    ITEM_EDIT_TYPE: {
      type: Sequelize.STRING(20)
    },
    ITEM_VALUE: {
      type: Sequelize.STRING(500)
    },
    PUBLISH_FLAG: {
      type: Sequelize.CHAR(1)
    },
    CONFIRM_STATUS: {
      type: Sequelize.CHAR(1)
    },
    DATA_TYPE: {
      type: Sequelize.CHAR(1)
    },
    DISABLED: {
      type: Sequelize.CHAR(1)
    },
    RECORD_TIME: {
      type: Sequelize.STRING(50)
    },
    REMARK: {
      type: Sequelize.STRING(512)
    },
    MODIFYFLAG: {
      type: Sequelize.CHAR(1)
    },
    F_CREATORTIME: {
      type: Sequelize.DATE
    },
    F_CREATORUSERID: {
      type: Sequelize.UUID
    },
    F_LASTMODIFYTIME: {
      type: Sequelize.DATE
    },
    F_LASTMODIFYUSERID: {
      type: Sequelize.STRING(50)
    },
    F_DELETEMARK: {
      type: Sequelize.DOUBLE
    },
    F_DELETETIME: {
      type: Sequelize.DATE
    },
    F_DELETEUSERID: {
      type: Sequelize.UUID
    }
  });

  return TransDtl;
};
