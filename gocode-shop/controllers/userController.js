const serverResponse = require("../utils/serverResponse");
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return serverResponse(res, 200, allUsers);
  } catch (e) {
    return serverResponse(res, 500, {
      message: "internal error has accured " + e,
    });
  }
};

const createNewUser = async (req, res) => {
  try {
    const user = new User({ ...req.body });

    await user.save();
    return serverResponse(res, 200, user);
  } catch (e) {
    return serverResponse(res, 500, {
      message: "internal error occured" + e,
    });
  }
};

module.exports = { getAllUsers, createNewUser };
