import jwt from "jsonwebtoken";
import { AUTH_EXCEPT_PATHS } from "#utils/constants.js";
const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const authenticate = (req, res, next) => {
  // Check if the request path is in the exceptions list
  if (AUTH_EXCEPT_PATHS.includes(req.path)) {
    return next(); // Bypass authentication
  }

  let token = req.headers["authorization"] || req.headers["Authorization"];
  if (token) {
    const tokenParts = token.split(" ");
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      token = tokenParts[1];
    } else {
      return res.status(401).send("Invalid token format.");
    }
  } else {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add the decoded token to the request
    next();
  } catch (error) {
    console.error(error); // Internal logging
    res.status(403).send("Invalid token."); // Public response
  }
};
