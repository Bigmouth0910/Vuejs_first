const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false,
    freezeTableName: true
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.concept = require("./concept.model.js")(sequelize, Sequelize);
db.conceptdata = require("./conceptdata.model.js")(sequelize, Sequelize);
db.picture = require("./picture.model.js")(sequelize, Sequelize);
db.picture_folder = require("./picture_folder.model.js")(sequelize, Sequelize);
db.codemst = require("./codemst.model.js")(sequelize, Sequelize);
db.codedtl = require("./codedtl.model.js")(sequelize, Sequelize);
db.forder = require("./forder.model.js")(sequelize, Sequelize);
db.sheetdef = require("./sheet.def.model.js")(sequelize, Sequelize);
db.transmst = require("./transmst.model.js")(sequelize, Sequelize);
db.transdtl = require("./transdtl.model.js")(sequelize, Sequelize);


module.exports = db;
