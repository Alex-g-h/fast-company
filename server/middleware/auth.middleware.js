const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    // Bearer sdfstwer43r34rsgsd2et
    const token = req.headers.authorization?.split(" ").at(1);
    if (!token) throw 0;

    const data = tokenService.validateAccess(token);
    if (!data) throw 0;

    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
