const blogModel = require("../model/blogModel");
const cloudinary = require("cloudinary").v2;

// image upload configuration
cloudinary.config({
  cloud_name: "duwbwdwqc",
  api_key: "723896973772636",
  api_secret: "srE4voWKjc8uQ8MnR4BXXqDecgY",
});

exports.createPost = async (req, res) => {
  try {
    const result = await blogModel.create({
      userId: "",
      images: [],
      content: "",
    });

    if (result) {
      return res.status(200).json({ status: true, data: result });
    } else {
      return res.status(400).json({ status: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.addImage = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ status: false, message: "File not found" });
    }
    const blogId = req.body.id;
    const image = req.files.image;
    const result = await blogModel.findOne({ _id: blogId });
    let imageArray = result.images;
    const path = image.tempFilePath;

    cloudinary.uploader.upload(path, async (err, result) => {
      if (!err) {
        imageArray.push(result.url);
        const update = await blogModel.findOneAndUpdate(
          { _id: blogId },
          {
            $set: {
              images: imageArray,
            },
          }
        );

        if (update) {
          return res.status(200).json({ status: true });
        } else {
          return res.status(500).json({ status: false });
        }
      } else {
        return res.status(500).json({ message: "Some error occured" });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.deleteImg = async (req, res) => {
  try {
    const { id, index } = req.body;
    const result = await blogModel.findOne({ _id: id });
    let images = result.images;
    images.splice(index, 1);

    const update = await blogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { images },
      }
    );

    if (update) {
      return res.status(200).json({ status: true });
    } else {
      return res.status(500).json({ status: false });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await blogModel.findOne({ _id: id });
    if (result) {
      return res.status(200).json({ status: true, data: result });
    } else {
      return res.status(400).json({ status: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.publishBlog = async (req, res) => {
  try {
    const { id, content, title } = req.body;
    const result = await blogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );

    if (result) {
      return res
        .status(200)
        .json({ status: true, message: "Data saved successfully" });
    } else {
      return res
        .status(400)
        .json({
          status: false,
          message: "Some error occured while publishing blog",
        });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};
