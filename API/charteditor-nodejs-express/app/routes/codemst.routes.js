module.exports = app => {
  const codemsts = require("../controllers/codemst.controller.js");

  var router = require("express").Router();

  router.get("/codemstInfo", codemsts.codemstInfo);
  router.post("/codemstInfo", codemsts.createCodemst)
  router.put("/codemstInfo", codemsts.updateCodemst)
  router.delete("/codemstInfo/:code_type", codemsts.deleteCodemst)

  router.get("/countcodemst", codemsts.countCodemst);

  app.use('/api/codemst', router);
};
