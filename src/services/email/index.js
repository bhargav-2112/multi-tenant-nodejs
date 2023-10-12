const nodemailer = require("nodemailer");
const {
  EMAIL_PORT,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
} = require("../../utils/constants");

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

/**
 * General use function for sending emails
 * 
 * @param {{from:string, to:string, subject: string, html: Html}} mailOptions 
 */
const sendMail = (
  mailOptions = {
    from: EMAIL_FROM,
    to: to,
    subject: subject,
    html: html,
  }
) => {
  transporter.sendMail(
    {
      from: EMAIL_FROM,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    },
    function (err, result) {
      if (err) {
        console.log("Could not send email", err);
      } else {
        console.log(" :: MAIL SENT :: ", result);
      }
    }
  );
};

module.exports = sendMail;
