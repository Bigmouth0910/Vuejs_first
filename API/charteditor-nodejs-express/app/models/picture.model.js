module.exports = (sequelize, Sequelize) => {
  const Picture = sequelize.define("chred_pic_sample", {
    ID: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      autoIncrement: true      
    },
    FOLDER_ID: {
      type: Sequelize.INTEGER(20)
    },
    PIC_SAMPLE_KEY: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    VERSION: {
      type: Sequelize.DECIMAL(19,0)
    },
    FILE_NAME: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    FILE_DESC: {
      type: Sequelize.STRING(200)
    },
    FILE_PICTURE: {
      type: Sequelize.BLOB('long')
    },
    FILE_PATH: {
      type: Sequelize.STRING(100)
    },
    FILE_TYPE: {
      type: Sequelize.STRING(100)
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

  return Picture;
};
