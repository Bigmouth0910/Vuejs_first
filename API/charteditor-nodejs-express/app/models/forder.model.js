module.exports = (sequelize, Sequelize) => {
  const Concept = sequelize.define("chred_forder", {
    ID: {
      type: Sequelize.INTEGER(19),
      primaryKey: true,
      autoIncrement: true      
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    FORDER_ID: {              
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    PARENT_FORDER_ID: {
      type: Sequelize.STRING(20)
    },    
    FORDER_NAME: {
      type: Sequelize.STRING(100)
    },
    UNIT: {
      type: Sequelize.STRING(500)
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
