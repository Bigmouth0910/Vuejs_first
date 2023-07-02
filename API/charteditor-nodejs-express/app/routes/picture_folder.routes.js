module.exports = app => {
  const picture_folder = require("../controllers/picture_folder.controller.js");
  var router = require("express").Router();

  router.get("/pictureFolderInfo", picture_folder.pictureFolderInfo);

  router.post("/pictureFolderInfo",  picture_folder.createPictureFolder)
  router.put("/pictureFolderInfo",  picture_folder.updatePictureFolder)
  
  router.delete("/pictureFolderInfo/:id", picture_folder.deletePictureFolder)

  app.use('/api/picture', router);
};
