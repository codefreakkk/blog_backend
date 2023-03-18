const categoryModel = require("../model/categoryModel");

exports.addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const result = await categoryModel.create({ categoryName });
    if (result) {
      return res
        .status(200)
        .json({ status: true, message: "Category added successfully" });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Category not added" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const result = await categoryModel.find();
    if (result) {
      return res.status(200).json({ status: true, data: result });
    } else {
      return res.status(400).json({ status: false, data: null });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Some error occured" });
  }
};
