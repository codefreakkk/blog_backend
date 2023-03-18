const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");

router.get("/getallcategories", categoryController.getAllCategories);
router.post("/addcategory", categoryController.addCategory);

module.exports = router;