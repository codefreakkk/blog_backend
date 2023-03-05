const express = require("express");
const router = express.Router();

const blogController = require("../controller/blogController");

router.get("/getblogbyid/:id", blogController.getBlogById);
router.get("/getallposts", blogController.getAllPosts);
router.post("/createpost", blogController.createPost);
router.post("/uploadimg", blogController.addImage);
router.post("/deleteimg", blogController.deleteImg);
router.post("/publishblog", blogController.publishBlog);

module.exports = router;