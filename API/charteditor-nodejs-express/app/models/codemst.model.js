module.exports = (sequelize, Sequelize) => {
  const Concept = sequelize.define("chred_codemst", {
    ID: {
      type: Sequelize.INTEGER(19),
      primaryKey: true,
      autoIncrement: true      
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    SYSTEM_CODE: {
      type: Sequelize.STRING(20)
    },
    CODE_TYPE: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    CODE_DESC: {
      type: Sequelize.STRING(200)
    },
    CODE_BACKGROUND_DESC: {
      type: Sequelize.STRING(200)
    },
    CODE_TIP_DESC: {
      type: Sequelize.STRING(200)
    },    
    FIELD_WIDTH: {
      type: Sequelize.DECIMAL(11,1)
    },
    READONLY_FLAG: {
      type: Sequelize.CHAR(1)
    },
    ENABLED: {
      type: Sequelize.CHAR(1)
    },
    DATA_SOURCE: {
      type: Sequelize.STRING(200)
    },  
    USER_UPDATEABLE: {
      type: Sequelize.CHAR(1)
    },
    USER_DELETEABLE: {
      type: Sequelize.CHAR(1)
    },
    USER_INPUTTYPE: {
      type: Sequelize.CHAR(1)
    },
    ALLOW_MULTIPLE_CHOOICE: {
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

  return Concept;
};
