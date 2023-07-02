module.exports = app => {
  const externals = require("../controllers/external.controller.js");

  var router = require("express").Router();

  router.get("/getDoctorNames", externals.getDoctorNames);
  router.get("/getBasicInfos", externals.getBasicInfos);

  router.get("/genereatePdf", externals.genereatePdf);

  app.use('/api/external', router);
};
