const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const {
  RECORD_CREATED,
  USER_TYPES,
  SERVER_ERROR,
  RECORDS_FOUND,
  INVALID_CREDENTIALS,
  JWT_SECRET,
  JWT_EXPIRESIN,
  RECORD_FOUND,
} = require("../utils/constants");

const Models = require("../models");
const emailChacker = require("deep-email-validator");
const { sendResponse } = require("../utils/helpers");
const { sendResetPasswordEmail } = require("../services/email/users");
const logger = require("../logs/logger");

/**
 * method : POST
 *
 * url : `BACKEND_BASE_URL/api/v1/auth/signup`
 *
 * Takes `email`, `password`, `firstName` & `lastName` as required
 * in request body and creates a new user.
 *
 * Default user type is set to `CUSTOMER` from USER_TYPES.CUSTOMER
 */
exports.signup = async (req, res, next) => {
  try {
    const { tenant_id, email, password } = req.body;
    // not allowing someone to create new SUPER_ADMIN
    if (req.body.role && Number(req.body.role) === USER_TYPES.SUPER_ADMIN) {
      return res
        .status(400)
        .json(sendResponse(null, 400, "Invalid request, Please try again"));
    }

    // is valid email
    const validationEmail = await emailChacker.validate({
      email,
      validateSMTP: false,
    });

    if (!validationEmail.valid) {
      return res
        .status(400)
        .json(
          sendResponse(
            null,
            400,
            "Invalid email, Please check your email and try again."
          )
        );
    }

    // if user already exists
    const user = await Models.users.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json(
          sendResponse(null, 400, "Account with this email already exists.")
        );
    }

    const userObj = { ...req.body };

    userObj.password = bcryptjs.hashSync(password, 8);

    const createdUser = await Models.users.create({
      ...userObj,
      role: userObj.role || USER_TYPES.CUSTOMER,
    });
    let token = jwt.sign(
      {
        id: createdUser.dataValues.id,
        email: createdUser.dataValues.email,
        role: userObj.role || USER_TYPES.CUSTOMER,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRESIN,
      }
    );

    await Models.users.update(
      { token: token },
      {
        where: {
          id: createdUser.dataValues.id,
        },
      }
    );
    res.user = createdUser;

    res.status(201).json({
      data: {
        user: { ...createdUser.dataValues, token },
      },
      code: 201,
      message: RECORD_CREATED,
    });
  } catch (error) {
    logger.error("Whooops! This broke with error: ", error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : POST
 *
 * url : `BACKEND_BASE_URL/api/v1/auth/signin`
 *
 * Takes `email`, `password` in request body and returns user data with access token
 */
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Models.users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json(sendResponse(null, 400, INVALID_CREDENTIALS));
    }
    console.log('user--->', user.dataValues);
    if (user && user.dataValues) {
      let isPasswordValid = await bcryptjs.compare(
        password,
        user.dataValues.password
      );
      if (!isPasswordValid)
        return res
          .status(400)
          .json(sendResponse(null, 400, INVALID_CREDENTIALS));
      let token = jwt.sign(
        {
          id: user.dataValues.id,
          email: user.dataValues.email,
          // role: user.dataValues.role,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRESIN,
        }
      );

      const updateQuery = await Models.users.update(
        { token: token },
        {
          where: {
            id: user.dataValues.id,
          },
        }
      );
      console.log('updateQuery-->', updateQuery);
      const response = await Models.users.findOne({
        where: { email: email },
      });

      return res.status(200).json(
        sendResponse(
          {
            ...response.toJSON(),
            token: token
          },
          200,
          RECORDS_FOUND
        )
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : POST
 * 
 * url : `BACKEND_BASE_URL/api/v1/auth/signin`
 * 
 * Takes `email` in request body and send a mail to reset the password  
 */
exports.reqestResetPasswords = async (req, res, next) => {
  try {
    let resetPasswordToken = jwt.sign({ email: req.body.email }, JWT_SECRET, {
      expiresIn: "1days",
    });

    // if user exists or not
    const userExists = await Models.users.findOne({
      where: { email: req.body.email },
    });

    if (!userExists) {
      return res
        .status(404)
        .json(sendResponse(null, 404, "We couldn't find your account."));
    }

    await Models.users.update(
      { passwordToken: resetPasswordToken },
      {
        where: { email: req.body.email },
      }
    );

    sendResetPasswordEmail(userExists, resetPasswordToken);

    return res.json(
      sendResponse(null, 200, "Please check your email to reset your password.")
    );
  } catch (error) {
    console.log("  ::error:: ", error);
    return res.status(500).send(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : `POST`
 * 
 * url : `BACKEND_BASE_URL/api/v1/auth/signin`
 * 
 * Takes `password`, `confirmPassword`, & `token` in request body 
 * resets the password if `resetPassword` token is still valid
 * then `resetPassword` token will be set to null 
 */
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    let decoded = null;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.log("  :: err ::", err);
      return res
        .status(400)
        .json(
          sendResponse(
            null,
            400,
            "Your password reset link has been expired, Please try again."
          )
        );
    }

    const user = await Models.users.findOne({
      where: { email: decoded.email },
    });

    if (!user) {
      return res
        .status(400)
        .json(
          sendResponse(
            null,
            400,
            "This link has been expired. Please try again"
          )
        );
    }

    if (user.dataValues.passwordToken === token) {
      let encryptedPassword = bcryptjs.hashSync(password, 8);
      await Models.users.update(
        { passwordToken: null, password: encryptedPassword },
        { where: { email: decoded.email } }
      );
      return res
        .status(200)
        .json(sendResponse(null, 200, "Your password has been reset"));
    } else {
      return res
        .status(400)
        .json(
          sendResponse(
            null,
            400,
            "Your password reset link has been expired, Please try again."
          )
        );
    }
  } catch (error) {
    console.log("  ::error:: ", error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    console.log('user-->', req.user);
    const user = await Models.users.findAll({attributes :{exclude:['password', 'token']}});
    res.status(201).json({
      data: {
        user: user,
      },
      code: 201,
      message: RECORD_FOUND,
    });
  } catch (error) {
    logger.error("Whooops! This broke with error: ", error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
}
