module.exports = (sequelize, Sequelize) => {
  const Concept = sequelize.define("chred_conceptdata", {
    F_ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    F_PARENTID: {
      type: Sequelize.UUID
    },
    F_FULLNAME: {
      type: Sequelize.STRING(50)
    },
    F_CODE: {
      type: Sequelize.STRING(50)
    },
    F_SIMPLESPELLING: {
      type: Sequelize.STRING(500)
    },
    F_ISDEFAULT: {
      type: Sequelize.DOUBLE
    },
    F_DESCRIPTION: {
      type: Sequelize.STRING(500)
    },
    F_SORTCODE: {
      type: Sequelize.DOUBLE
    },
    F_ENABLEDMARK: {
      type: Sequelize.DOUBLE
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
    F_DICTIONARYTYPEID: {
      type: Sequelize.STRING(50)
    }
  });

  return Concept;
};
