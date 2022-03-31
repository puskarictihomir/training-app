const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  token: String,
  createdAt: { type: Number, default: () => Date.now() },
});

UserSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bycrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    bycrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
