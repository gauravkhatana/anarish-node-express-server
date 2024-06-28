const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("req came");
  data = req.body;
  sendMail(data, (info) => {
    console.log(info);
    console.log("A mail has been sent to the user");
    return res.status(200).json(info);
  });
});

async function sendMail(data, callback) {
  console.log("Sending mail is in process");

  //   let transporter = nodemailer.createTransport({
  //     host: "smtp@anarish.com",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: ".anarish.com",
  //       pass: "password",
  //     },
  //   });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "bansaldeepu.888@gmail.com",
      pass: "gvdw snma zprt xhfr",
    },
  });

  let mailOptions = {
    // from: ".anarish.com",
    from: {
      name: "Anarish",
      address: "bansaldeepu.888@gmail.com",
    },
    to: [data.email, "kumartech0102@gmail.com"],
    subject: "Anarish Innovations",
    html: `<h1>Hello!</h1>
    <p>Thankyou for choosing anarish innovations, Our team will get in touch with you soon</b>.</p></br>`,
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
module.exports = router;
