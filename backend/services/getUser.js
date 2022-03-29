const User = require("../models/user");

const getUser = (token) => {
  return User.findOne({ token });
};

module.exports = { getUser };
