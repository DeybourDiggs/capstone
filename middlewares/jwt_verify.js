const jwt = require("jsonwebtoken");

const jwt_verify = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "You are not authorized to view this page",
        },
      ],
    });
  }

  try {
    let user = await jwt.verify(token, "hdhdgshsgtedgsytwt");
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};

module.exports = jwt_verify;