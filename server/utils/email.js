const nodeMailer = require("nodemailer");
const { messages } = require('../utils/messages');
const { codes } = require('../utils/responseCodes');
const { 
    EMAIL_HOST, 
    EMAIL_PORT, 
    EMAIL_ID, 
    EMAIL_PASSWORD, 
    CLIENT_URL
} = process.env;

exports.signupActivationEmailTemplate = (token) => {
    return `
        <h1>Please use the following link to activate your account</h1>
        <p>${CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${CLIENT_URL}</p>
    `;
};

exports.sendSignupActivationEmail = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: EMAIL_ID, 
      pass: EMAIL_PASSWORD
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
 
  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Signup Activation Email sent: ${info.response}`);
      return res.status(codes.ok).json({
        message: messages.signup.activation.email.success,
      });
    })
    .catch((err) => console.error(messages.signup.activation.email.error, err));
};