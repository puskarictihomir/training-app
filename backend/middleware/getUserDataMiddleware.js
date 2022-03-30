const { getUser } = require("../services/getUser");

async function getUserDataMiddleware(req, res, next) {
  const token = req.headers.authorization;

  const user = await getUser(token);

  if (!token || !user) {
    return res.send({ statusCode: 404 });
  }

  req.user = user;

  next();
}

module.exports = getUserDataMiddleware;
