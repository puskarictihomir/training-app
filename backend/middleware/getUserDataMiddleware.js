const { getUser } = require("../services/getUser");

async function getUserDataMiddleware(req, res, next) {
  const { token } = req.query;

  const user = await getUser(token);

  req.user = user;

  next();
}

module.exports = getUserDataMiddleware;
