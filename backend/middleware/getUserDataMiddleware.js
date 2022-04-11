const { getUser } = require("../services/getUser");

async function getUserDataMiddleware(req, res, next) {
  const token = req.headers.authorization;

  const user = await getUser(token);

  if (!token || !user) {
    return res.send({ statusCode: 404 });
  }

  req.user = { _id: user._id, fullName: user.fullName, username: user.username, dateOfBirth: user.dateOfBirth };

  next();
}

module.exports = getUserDataMiddleware;
