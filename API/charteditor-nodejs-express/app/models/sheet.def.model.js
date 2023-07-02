module.exports = (sequelize, Sequelize) => {
  const Concept = sequelize.define("chred_sheet_def", {
    ID: {
      type: Sequelize.INTEGER(19),
      primaryKey: true,
      autoIncrement: true      
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    DOCUMENT_CODE: {
      type: Sequelize.STRING(20)
    },
    SHEET_ID: {              
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    SHEET_NAME: {
      type: Sequelize.STRING
    },
    SHEET_TYPE: {
      type: Sequelize.STRING(10)
    },
    DEPT_NO: {
      type: Sequelize.STRING(20)
    },
    OWNER_SYS: {
      type: Sequelize.STRING(50)
    },
    FORDER_ID: {
      type: Sequelize.STRING(20)
    },
    AFTER_SAVE_METHOD: {
      type: Sequelize.STRING(100)
    },
    ONLOAD_METHOD: {
      type: Sequelize.STRING(100)
    },
    PRELOAD_METHOD: {
      type: Sequelize.STRING(100)
    },
    SAVE_METHOD: {
      type: Sequelize.STRING(100)
    },
    STATUS: {
      type: Sequelize.CHAR(1)
    },
    PUBLISH_DATE: {
      type: Sequelize.DATE
    },
    CANCEL_DATE: {
      type: Sequelize.DATE
    },
    WEB_SERVICE_TYPE: {
      type: Sequelize.STRING(20)
    },
    XML_NAME: {
      type: Sequelize.STRING(45)
    },
    SHEET_HTML: {
      type: Sequelize.TEXT('long')
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
    },
    SHEET_STYLETYPE: {
      type: Sequelize.BOOLEAN
    }
  });

  return Concept;
};
