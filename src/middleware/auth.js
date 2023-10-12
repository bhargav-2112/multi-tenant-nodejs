const jwt = require("jsonwebtoken");
const { UNAUTHORIZE_ERROR, JWT_SECRET } = require("../utils/constants");
const { sendResponse } = require("../utils/helpers");
const Models = require("../models");

/**
 * Takes access token as `Bearer` or `x-access-token` from header
 * if token is valid then api will be accessible otherwise returned `401`
 * with session expired error message
 * 
 * Create a curried function with `(...roles) =>` and uncomment role code 
 * to give access based on roles
 */
module.exports = async (req, res, next) => {
  try {
    const token =
      req.headers["x-access-token"] ||
      req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json(sendResponse(null, 401, UNAUTHORIZE_ERROR));
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    // if (roles.includes(Number(decoded.role)))
    //   return res
    //     .status(UNAUTHORIZED)
    //     .json(sendResponse(null, UNAUTHORIZED, NOT_AUTHORIZED));

    const user = await Models.users.findOne({
      where: { email: decoded.email },
    });

    console.log('user.toJSON().token -->', user);
    console.log('token -->', token);
    if (user.toJSON().token !== token)
      return res
        .status(401)
        .json(sendResponse(null, 401, "Session expired, Please re-login"));

    req.user = user.toJSON();
    next();
  } catch (err) {
    console.log(":: err :: ", err);
    return res
      .status(401)
      .json(sendResponse(null, 401, "Session expired, Please re-login"));
  }
};
