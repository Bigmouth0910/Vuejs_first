module.exports = app => {
  const transmsts = require("../controllers/transmst.controller.js");

  var router = require("express").Router();

  router.get("/transmstInfo", transmsts.transmstInfo);
  router.post("/transmstInfo", transmsts.createTransmst)
  router.put("/transmstInfo", transmsts.updateTransmst)

  app.use('/api/transmst', router);
};
