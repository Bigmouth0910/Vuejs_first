module.exports = app => {
  const forders = require("../controllers/forder.controller.js");

  var router = require("express").Router();

    router.get("/orderInfo", forders.orderInfo);
  router.post("/orderInfo", forders.createOrder)
  router.put("/orderInfo", forders.updateOrder)
  router.delete("/orderInfo/:forder_id", forders.deleteOrder)

  app.use('/api/order', router);
};
