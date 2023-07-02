module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/login", users.login);
  router.get("/info", users.getInfo);
  router.post("/logout", users.logout);

  app.use('/api/user', router);
};
