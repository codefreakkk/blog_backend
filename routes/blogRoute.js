const express = require("express");
const router = express.Router();

const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");

router.get("/getblogbyid/:id", auth, blogController.getBlogById);
router.get("/getallposts", blogController.getAllPosts);
router.get("/getposts", blogController.getPosts);
router.get("/drafts", blogController.getDrafts);
router.post("/createpost", auth, blogController.createPost);
router.post("/uploadimg", auth, blogController.addImage);
router.post("/deleteimg", auth, blogController.deleteImg);
router.post("/publishblog", auth, blogController.publishBlog);

module.exports = router;