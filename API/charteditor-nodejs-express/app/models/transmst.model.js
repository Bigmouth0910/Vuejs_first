module.exports = (sequelize, Sequelize) => {
  const TransMst = sequelize.define("chred_trans_mst", {
    ID: {
      type: Sequelize.INTEGER(19),
      primaryKey: true,
      autoIncrement: true      
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    TRANS_ID: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true
    },
    CHART_NO: {
      type: Sequelize.STRING(20)
    },
    ENCOUNTER_NO: {
      type: Sequelize.STRING(20)
    },
    ONWER_SYS: {
      type: Sequelize.STRING(20)
    },
    SHEET_ID: {
      type: Sequelize.STRING(255)
    },
    SHEET_NAME: {
      type: Sequelize.STRING(60)
    },
    SHEET_VERSION: {
      type: Sequelize.STRING(5)
    },
    SMHC_STATUS: {
      type: Sequelize.CHAR(1)
    },
    PUBLISH_DATE: {
      type: Sequelize.DATE
    },
    REMARK: {
      type: Sequelize.STRING(255)
    },
    SHEET_HTML: {
      type: Sequelize.TEXT('long')
    },
    SHEET_TEXT: {
      type: Sequelize.TEXT('long')
    },
    CANCEL_DATE: {
      type: Sequelize.DATE
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

  return TransMst;
};
