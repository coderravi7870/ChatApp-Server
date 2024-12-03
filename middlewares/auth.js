import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { TryCatch } from "./error.js";
import { adminSecretKey } from "../app.js";
import { CHATTU_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";

export const isAuthenticated = (req, res, next) => {
  const { ChatRoom_Token } = req.cookies;
  
  if (!ChatRoom_Token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }

  const decodedData = jwt.verify(ChatRoom_Token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
};

export const adminOnly = (req, res, next) => {
  const token = req.cookies["ChatRoom-admin-token"];

  if (!token) {
    return next(new ErrorHandler("Only Admin can access this route", 401));
  }

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  // console.log(secretKey);
  

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) {
    return next(new ErrorHandler("Only Admin can access this route", 401));
  }

  next();
};

export const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHATTU_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};
