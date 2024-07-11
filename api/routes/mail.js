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
    host: "anarish.com",
    auth: {
      user: "admin@anarish.com",
      pass: "Anarish@123",
    },
  });

  let mailOption1 = {
    // from: ".anarish.com",
    from: {
      name: "Anarish",
      address: "admin@anarish.com",
    },
    to: [data.email],
    subject: "Anarish Innovations",
    html: `<h1>Welcome to Our Platform</h1>
    <p>Thankyou for choosing anarish innovations, Our team will get in touch with you soon</b>.</p></br>`,
  };

  let mailOption2 = {
    // from: ".anarish.com",
    from: {
      name: "Anarish",
      address: "admin@anarish.com",
    },
    to: ["marketing@anarish.com","maheshwari.charu@gmail.com"],
    subject: "New Query Anarish Innovations",
    html: `<h1>Anarish Innovations</h1>
    <h3>New user :-</h3></br> </br>
    <p> user name: ${data.name} </p></br>
    <p>email: ${data.email}</p></br>
    <p> Phone Number: ${data.phoneNumber} </p></br>
    <p> intrests: ${data.intrests} </p></br>
    <p>projectRequirements: ${data.projectRequirements} </p></br>
    <p>date: ${data.date}</p>`,
  };

  let info = await transporter.sendMail(mailOption1);
  let infoAnarish = await transporter.sendMail(mailOption2);

  callback(info);
}
module.exports = router;
