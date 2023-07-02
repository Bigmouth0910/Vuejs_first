module.exports = app => {
  const pictures = require("../controllers/picture.controller.js");
  const upload = require("../middleware/upload");
  var router = require("express").Router();

  router.get("/pictureInfo", pictures.pictureInfo);

  router.post("/pictureInfo",  upload.single("FILE_PICTURE"), pictures.createPicture)
  router.put("/pictureInfo", upload.single("FILE_PICTURE"), pictures.updatePicture)
 
  router.delete("/pictureInfo/:id", pictures.deletePicture)

  router.get("/countpicture", pictures.countPicture);

  app.use('/api/picture', router);
};
