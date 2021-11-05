import type { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({
    errors: errors.array().map(err => err.msg)
  });

  next();
};

export const userValidationRules = (req?: Request): any => {
  return [
    body("username", "Username required")
      .not()
      .isEmpty(),
    body("username", "Username minimum length of 4 and maximum of 50 characters")
      .trim()
      .escape()
      .blacklist(" ")
      .isLength({ min: 4, max: 50 })
      .isAlphanumeric(),

    body("email", "Email required")
      .not()
      .isEmpty(),
    body("email", "Email not valid")
      .trim()
      .isEmail()
      .normalizeEmail()
      .isLength({ max: 200 }),

    body("password", "Password required")
      .not()
      .isEmpty(),
    body("password", "Password minimum length of 8 characters")
      .trim()
      .isLength({ min: 8, max: 250 })
      .isAlphanumeric(),
  ];
};

export const nicknameValidationRules = (req?: Request): any => {
  return [
    body("newNickname", "Nickname required")
      .not()
      .isEmpty(),
    body("newNickname", "Nickname invalid")
      .trim()
      .isLength({ min: 1, max: 50 }),
  ];
};

export const loginValidationRules = (req?: Request): any => {
  return [
    body("usernameOrEmail", "Username or Email required")
      .not()
      .isEmpty(),
    body("usernameOrEmail", "Username or Email invalid")
      .trim()
      .escape()
      .isLength({ max: 200 }),

    body("password", "Password required")
      .not()
      .isEmpty(),
    body("password", "Password minimum length of 8 and maximum of 250 characters")
      .trim()
      .isLength({ min: 8, max: 250 }),
    
    body("remember", "Remember boolean required")
      .isBoolean(),
  ]
};

export const postValidationRules = (req?: Request): any => {
  return [
    body("body", "Body required")
      .not()
      .isEmpty(),
    body("body", "Body maximum length of 500 characters")
      .trim()
      .isLength({ min: 1, max: 500 }),
  ];
};

export const passwordValidationRules = (req?: Request): any => {
  return [
    body("password", "Password required")
      .not()
      .isEmpty(),
    body("password", "Password minimum length of 8 and maximum of 250 characters")
      .trim()
      .isLength({ min: 8, max: 250 }),
  ];
};

export const newEmailValidationRules = (req?: Request): any => {
  return [
    body("newEmail", "New Email required")
      .not()
      .isEmpty(),
    body("newEmail", "New Email not valid")
      .trim()
      .isEmail()
      .normalizeEmail()
      .isLength({ max: 200 }),
  ];
};

export const passwordChangeValidationRules = (req?: Request): any => {
  return [
    body("currentPassword", "Current Password required")
      .not()
      .isEmpty(),
    body("currentPassword", "Current Password minimum length of 8 and maximum of 250 characters")
      .trim()
      .isLength({ min: 8, max: 250 }),
      
    body("newPassword", "New Password required")
      .not()
      .isEmpty(),
    body("newPassword", "New Password minimum length of 8 and maximum of 250 characters")
      .trim()
      .isLength({ min: 8, max: 250 }),
  ];
};

export const avatarValidationRules = (req?: Request): any => {
  return [
    body("newAvatar", "New Avatar required")
      .not()
      .isEmpty(),
    body("newAvatar", "New Avatar length of 32 required")
      .trim()
      .isLength({ min: 32, max: 32 }),
  ];
};