module.exports = (sequelize, Sequelize) => {
  const Concept = sequelize.define("chred_codedtl", {
    ID: {
      type: Sequelize.INTEGER(19),
      primaryKey: true,
      autoIncrement: true      
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    CODE_TYPE: {
      type: Sequelize.UUID
    },
    CODE_NO: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    CODE_DESC: {
      type: Sequelize.STRING(500)
    },
    ENG_DESC: {
      type: Sequelize.STRING(1000)
    },
    SORT_VALUE: {
      type: Sequelize.INTEGER(11)
    },
    REMARK_DESC: {
      type: Sequelize.STRING(2000)
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
