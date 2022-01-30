const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = async (to, link) => {
  const msg = {
    to: to, // Change to your recipient
    from: "barpitkumar2000@gmail.com", // Change to your verified sender
    subject: "Password reset request",
    text: "and easy to do anywhere, even with Node.js",
    html: `<div>
      <p>CLick below link to reset password</p>
      <a href='${link}'>RESET</a>
  </div>`,
  };

  await sgMail.send(msg);
};
