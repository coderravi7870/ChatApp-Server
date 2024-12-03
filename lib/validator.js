import { body, check, param, query, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

export const validateHandler = (req, res, next) => {
  
  const errors = validationResult(req);

  const errorMessage = errors
    .array()
    .map((error) => error.msg)
    .join(",");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessage, 400));
};

export const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

export const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

export const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be between 2 and 100"),
];

export const addMemberValidator = () => [
  body("chatId", "Please Enter ChatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be between 1 and 97"),
];

export const removeMemberValidator = () => [
  body("chatId", "Please Enter ChatId").notEmpty(),
  body("userId", "Please Enter UserId").notEmpty(),
];

export const sendattachmentsValidator = () => [
  body("chatId", "Please Enter ChatId").notEmpty(),
];

export const chatIdValidator = () => [
  param("id", "Please Enter ChatId").notEmpty(),
];

export const renameValidator = () => [
  param("id", "Please Enter ChatId").notEmpty(),
  body("name", "Please Enter Name").notEmpty(),
];

export const sendRequestValidator = () => [
  body("userId", "Please Enter UserId").notEmpty(),
];

export const adminLoginValidator=()=>[
  body("secretKey","Please Enter Secret Key").notEmpty(),
]

export const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];
