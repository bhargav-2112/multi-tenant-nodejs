const sendMail = require("./index");
const ejs = require("ejs");
const path = require("path");
const { FRONTEND_BASE_URL } = require("../../utils/constants");

module.exports = {

  /**
   * Sends an email to reset the password.
   * 
   * @param {Object} user - User object
   * @param {String} resetPasswordToken - reset password token 
   */
  sendResetPasswordEmail: (user, resetPasswordToken) => {
    ejs.renderFile(
      path.join(__dirname, "./templates/resetPassword.ejs"),
      {
        user: user,
        resetPasswordToken: `${FRONTEND_BASE_URL}/reset-password/${resetPasswordToken}`,
      },
      (error, html) => {
        if (error) {
          console.log("Error rendering email template", error);
          return res
            .status(400)
            .json(sendResponse(null, 400, SERVER_ERROR));
        } else {
          sendMail({
            subject: "Click link below to change your password",
            to: user.email,
            html: html,
          });
        }
      }
    );
  },
};
