module.exports = app => {
  const conceptdata = require("../controllers/conceptdata.controller.js");

  var router = require("express").Router();

  router.get("/conceptdataInfo", conceptdata.conceptdataInfo);
  router.post("/conceptdataInfo", conceptdata.createConceptdata)
  router.put("/conceptdataInfo", conceptdata.updateConceptdata)
  router.delete("/conceptdataInfo/:id", conceptdata.deleteConceptdata)
  router.get("/countconceptdata", conceptdata.countConceptdata);

  app.use('/api/conceptdata', router);
};
