import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

/**************************************************************************/
export const signup = async (req, res, next) => {
  // console.log(req.body)
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save(); //this will take some time so use await
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

/**************************************************************************/
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }

    // Now after validation we need to authenticate the user
    // 1. Add a cookie in the browser
    // 2. Create a hash-token (includes email & password of user)
    // 3. Save this token inside browser cookie
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // not return the hashed password in the response(so seperate password and other data)
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

/***************************************************************************/
export const signout = async(req, res, next) => {
  try{
    res.clearCookie('access_token')
    res.status(200).json({"message": "User has been logged out!"})
  }catch(error) {
    next(error)
  }
}

/***************************************************************************/
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // if user already exist - sign-in
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // if user does not exist - sign-up
      // generate the dummy password then hashed it and create the new user
      const generatedPassword =
        Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random.toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
