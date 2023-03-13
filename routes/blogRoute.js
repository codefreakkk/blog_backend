const express = require("express");
const router = express.Router();

const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");

router.get("/getblogbyid/:id", blogController.getBlogById);
router.get("/getallposts", blogController.getAllPosts);
router.get("/drafts", auth, blogController.getDrafts);
router.post("/getposts", blogController.getPosts);
router.post("/createpost", auth, blogController.createPost);
router.post("/uploadimg", auth, blogController.addImage);
router.post("/deleteimg", auth, blogController.deleteImg);
router.post("/publishblog", auth, blogController.publishBlog);
router.delete("/deletepost/:id", auth, blogController.deletePost)

module.exports = router;