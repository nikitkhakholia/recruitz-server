const nodemailer = require("nodemailer");

function sendEmail(to,subject,htmlBody,replyTo,files) {
  return new Promise(async (resolve, reject) => {

  let transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user: "cs.recruitz@gmail.com", // generated ethereal user
      pass: "2GG]Q{YgeW}@\\`J4", // generated ethereal password
    },
  });
    let info = await transporter.sendMail({
      from: 'cs.recruitz@gmail.com',
      to: to,
      subject: subject,
      html: htmlBody,
      replyTo: replyTo,
      attachments: files,
    });
    resolve(true);
  });
}

module.exports = { sendEmail };
