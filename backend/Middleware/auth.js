const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    let token;

    if (authHeader) {
      token = req.header("Authorization").replace("Bearer ", "");
    } else {
      token = req.query.token.replace("Bearer ", "");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      email: decodedToken.email,
    });

    if (!user) {
      throw new Error("User not found with given information.");
    }

    req.token = token;
    req.user = user;

    if (user.role !== "admin") {
      req.isAdmin = false;
    } else {
      req.isAdmin = true;
    }

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { auth };
