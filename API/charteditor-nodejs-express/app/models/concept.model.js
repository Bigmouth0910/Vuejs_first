module.exports = (sequelize, Sequelize) => {
  const Concept = sequelize.define("chred_concept", {
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
    F_ISTREE: {
      type: Sequelize.DOUBLE
    },
    F_DESCRIPTION: {
      type: Sequelize.TEXT('long')
    },
    F_SORTCODE: {
      type: Sequelize.DOUBLE
    },
    F_ENABLEDMARK: {
      type: Sequelize.DECIMAL(10,0)
    },
    F_CREATORTIME: {
      type: Sequelize.DATE,
      // get: function() {
      //   if(this.get('F_CREATORTIME') == null)
      //     return Sequelize.NOW
      //   else this.get('F_CREATORTIME')
      // }
    },
    F_CREATORUSERID: {
      type: Sequelize.UUID
    },
    F_LASTMODIFYTIME: {
      type: Sequelize.DATE,
      // defaultValue: Sequelize.NOW
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
