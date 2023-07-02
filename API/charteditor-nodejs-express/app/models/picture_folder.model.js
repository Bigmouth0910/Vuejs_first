module.exports = (sequelize, Sequelize) => {
  const PictureFolder = sequelize.define("chred_pic_folder", {
    ID: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      autoIncrement: true      
    },
    PARENT_ID: {
      type: Sequelize.INTEGER(20)
    },
    PIC_FOLDER_KEY: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    FOLDER_NAME: {
      type: Sequelize.STRING(200),
      allowNull: false
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

  return PictureFolder;
};
