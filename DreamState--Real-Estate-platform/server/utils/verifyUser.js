import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // get token from the cookie
  const token = req.cookies.access_token;

  // check if token is a valid value
  if (!token) return next(errorHandler(401, "Unauthorized"));

  // verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden")); // if get error
    req.user = user; // set the user get from the cookie to the request user
    next(); // go to the next -> updateUser
  });
};
