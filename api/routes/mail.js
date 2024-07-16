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

// router.get("getcontactqueries",(req,res)=>{
//   contactSchema.find().then((data)=>{
//       return res.send({success: true, data})
//   })}






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
    subject: "Welcome to Anarish Innovation - We are excited to Connect! ",
    html: `Hi ${data.name} <br/> Welcome to Our Platform! ! We're thrilled to have the opportunity to work with you! <br/>
    We have received your inquiry and one of our team members will get in touch with you soon to discuss your needs in more detail.
    <br/>
    <br/> <br/> Warm Regards,<br/> Team Anarish`,
  };

  let mailOption2 = {
    // from: ".anarish.com",
    from: {
      name: "Anarish",
      address: "admin@anarish.com",
    },
    to: ["gaurav.khatana@anarish.com"],
    subject: "New Query from Website",
    html: `Following user has tried to contact Anarish on ${data.date} : </br> </br>
    <p> <b> Name: </b> ${data.name} </p></br>
    <p> <b> Email: </b> ${data.email}</p></br>
    <p> <b> Phone Number: </b> ${data.phoneNumber} </p></br>
    <p> <b> Interested In : </b> ${data.intrests} </p></br>
    <p> Message Shared : ${data.projectRequirements} </p></br>`,
  };

  let info = await transporter.sendMail(mailOption1);
  let infoAnarish = await transporter.sendMail(mailOption2);

  callback(info);
}

module.exports = router;

