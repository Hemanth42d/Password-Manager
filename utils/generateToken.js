const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    try {
        return jwt.sign({ email : user.email, id : user._id}, process.env.JWT_KEY);
    } catch (error) {
        console.log(error);
    }
}

module.exports = generateToken;