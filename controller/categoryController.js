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
