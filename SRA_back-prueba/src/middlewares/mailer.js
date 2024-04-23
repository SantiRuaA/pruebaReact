const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'srua2005@gmail.com',
    pass: 'ghms ubie xbck awyf'
  }
});

transporter.verify().then(() => {
  console.log('melos pa los emails');
})

module.exports = transporter;