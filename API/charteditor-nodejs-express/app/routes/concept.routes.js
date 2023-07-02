module.exports = app => {
  const concepts = require("../controllers/concept.controller.js");

  var router = require("express").Router();

  router.get("/conceptInfo", concepts.conceptInfo);
  router.post("/conceptInfo", concepts.createConcept)
  router.put("/conceptInfo", concepts.updateConcept)
  router.delete("/conceptInfo/:id", concepts.deleteConcept)
  router.get("/countconcept", concepts.countConcept);

  app.use('/api/concept', router);
};
