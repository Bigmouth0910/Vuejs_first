module.exports = app => {
  const transdtls = require("../controllers/transdtl.controller.js");

  var router = require("express").Router();
  
  router.get("/transdtlInfo", transdtls.transdtlInfo);
  router.post("/transdtlInfo", transdtls.createTransdtl)
  router.put("/transdtlInfo", transdtls.updateTransdtl)
  router.delete("/transdtlInfo/:trans_id", transdtls.deleteTransdtl)
  
  app.use('/api/transdtl', router);
};
