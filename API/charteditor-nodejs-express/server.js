const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({limit: '50mb'}));  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to charteditor application." });
});

app.use('/uploads', express.static('uploads'));

require("./app/routes/user.routes")(app);
require("./app/routes/concept.routes")(app);
require("./app/routes/conceptdata.routes")(app);
require("./app/routes/picture.routes")(app);
require("./app/routes/picture_folder.routes")(app);
require("./app/routes/codemst.routes")(app);
require("./app/routes/codedtl.routes")(app);
require("./app/routes/forder.routes")(app);
require("./app/routes/sheetdef.routes")(app);
require("./app/routes/transmst.routes")(app);
require("./app/routes/transdtl.routes")(app);

require("./app/routes/external.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
