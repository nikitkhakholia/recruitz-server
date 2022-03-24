const nodemailer = require("nodemailer");

function sendEmail(to,subject,htmlBody,replyTo,files) {
  return new Promise(async (resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: 'gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'khakholia.nk@gmail.com',
        pass: 'asdfghjkl',
      },
    });
    let info = await transporter.sendMail({
      from: 'placements@cu.in',
      to: to,
      subject: subject,
      html: htmlBody,
      replyTo: replyTo,
      attachments: files
    });
    resolve(true);
  });
}

module.exports = { sendEmail };
