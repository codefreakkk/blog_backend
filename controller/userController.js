const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    const email = await userModel.findOne({ userEmail: userEmail });
    if (email) {
      return res.status(200).json({
        status: true,
        message: `user already signup with ${userEmail}`,
      });
    }

    const result = await userModel.create({
      userName,
      userEmail,
      userPassword,
    });

    if (result) {
      return res
        .status(200)
        .json({ status: true, message: "Signup successfull" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Signup unsuccessfull" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};

exports.login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await userModel.findOne({ userEmail, userPassword });
    if (user) {
      const uid = user._id.toString();
      const userName = user.userName;

      // generate token
      const token = jwt.sign({ uid }, "codefreak", { expiresIn: "1d" });
      return res
        .status(200)
        .json({ success: true, token: `Bearer ${token}`, userName, userEmail});
    } else
      return res.status(200).json({
        success: false,
        message: `Please check your username or password`,
      });

  } catch (e) {
    return res.status(500).json({ message: "Some error occured" });
  }
};
