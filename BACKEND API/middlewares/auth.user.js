require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = async (request, response, next) => {
  try {
    let token = request.headers.authorization;
    if (!token)
      return response
        .status(400)
        .json({ success: false, responseMessage: " Please provide token" });
    token = token.split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.secret);
    let userEmail = await User.findOne({ email: decodedToken.email });
    console.log(student.role);
    if (userEmail.email === User.email) {
      next();
      
    } else {
      return response
      .status(400)
      .json({ success: false, responseMessage: `Unauthorized User` });
    }
  } catch (error) {
    return response.status(401).json({
      success: false,
      responseMessage: `Failed to create task due to ${error}`,
    });
  }
};
