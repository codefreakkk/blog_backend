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
    const uid = req.user._id.toString();
    const result = await blogModel.create({
      userId: uid,
      images: [],
      content: "",
      title: "",
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
      return res.status(500).json({ status: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

// need to work on this feature - need to add validations and other stuffs
exports.publishBlog = async (req, res) => {
  try {
    const { id, content, title, userName } = req.body;

    // if filee not found
    if (!req.files) {
      const result = await blogModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title: title,
            content: content,
            userName: userName,
            status: "true",
          },
        }
      );

      if (result) {
        return res
          .status(200)
          .json({ status: true, message: "Data saved successfully" });
      } else {
        console.log("else");
        return res.status(200).json({
          status: false,
          message: "Some error occured while publishing blog",
        });
      }
    }

    const previewImage = req.files.previewImage;
    const path = previewImage.tempFilePath;

    cloudinary.uploader.upload(path, async (err, r) => {
      if (err) {
        return res
          .status(400)
          .json({ status: false, message: "Some error occured" });
      }
      const url = r.url;

      if (r) {
        const result = await blogModel.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              title: title,
              content: content,
              userName: userName,
              previewImage: url,
              status: "true",
            },
          }
        );

        if (result) {
          return res
            .status(200)
            .json({ status: true, message: "Data saved successfully" });
        } else {
          console.log("else");
          return res.status(200).json({
            status: false,
            message: "Some error occured while publishing blog",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const result = await blogModel
      .find({ status: "true" })
      .sort({ $natural: -1 })
      .limit(7);
    if (result) {
      return res.status(200).json({ status: true, data: result });
    } else {
      return res.status(400).json({ status: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const result = await blogModel
      .find({ status: "true" })
      .sort({ $natural: -1 });
    if (result) {
      return res.status(200).json({ status: true, data: result });
    } else {
      return res.status(400).json({ status: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.getDrafts = async (req, res) => {
  try {
    const uid = req.user._id.toString();
    const result = await blogModel.find({ userId: uid });
    if (result) {
      return res.status(200).json({ status: true, data: result });
    } else {
      return res.status(400).json({ status: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await blogModel.deleteOne({_id: id});
    if (result) {
      return res.status(200).json({status: true, message: "Your post was deleted"})
    }
    else {
      return res.status(200).json({status: false, message: "Your post was not deleted"})
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error ocured" });
  }
};
