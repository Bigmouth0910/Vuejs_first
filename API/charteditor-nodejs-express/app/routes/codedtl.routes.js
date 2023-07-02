module.exports = app => {
  const codedtls = require("../controllers/codedtl.controller.js");

  var router = require("express").Router();

  router.get("/codedtlInfo", codedtls.codedtlInfo);
  router.post("/codedtlInfo", codedtls.createCodedtl)
  router.put("/codedtlInfo", codedtls.updateCodedtl)
  router.delete("/codedtlInfo/:id", codedtls.deleteCodedtl)

  router.get("/countCodedtl", codedtls.countCodedtl);

  app.use('/api/codedtl', router);
};
