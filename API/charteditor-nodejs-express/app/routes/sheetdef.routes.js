module.exports = app => {
  const sheetdefs = require("../controllers/sheetdef.controller.js");

  var router = require("express").Router();

  router.get("/sheetInfo", sheetdefs.sheetInfo);
  router.post("/sheetInfo", sheetdefs.createSheet)
  router.put("/sheetInfo", sheetdefs.updateSheet)
  router.delete("/sheetInfo/:id", sheetdefs.deleteSheet)

  router.get("/countsheet", sheetdefs.countSheet);

  app.use('/api/sheet', router);
};
