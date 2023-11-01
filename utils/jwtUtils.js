const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // Replace with your secret key

// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "1h", // Token expiration time (1 hour in this example)
  };

  return jwt.sign(payload, secretKey, options);
};

// Function to verify and decode a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.id;
  } catch (error) {
    // Token is invalid or has expired
    return null;
  }
};

module.exports = { generateToken, verifyToken };
