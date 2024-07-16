const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.anarish.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "admin@anarish.com",
    pass: "Anarish@123",
  },
});

// Route to handle POST requests for sending emails
router.post("/", async (req, res) => {
  console.log("Request received");
  
  try {
    const data = req.body;

    // Define mail options
    const mailOptions1 = {
      from: {
        name: "Anarish",
        address: "admin@anarish.com",
      },
      to: data.email,
      subject: "Welcome to Anarish Innovation - We are excited to Connect!",
      html: `
        Hi ${data.name} <br/>
        Welcome to Our Platform! We're thrilled to have the opportunity to work with you! <br/>
        We have received your inquiry and one of our team members will get in touch with you soon to discuss your needs in more detail.
        <br/><br/>
        Warm Regards,<br/> Team Anarish
      `,
    };

    const mailOptions2 = {
      from: {
        name: "Anarish",
        address: "admin@anarish.com",
      },
      to: "gaurav.khatana@anarish.com",
      subject: "New Query from Website",
      html: `
        Following user has tried to contact Anarish on ${data.date} : <br/><br/>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone Number:</b> ${data.phoneNumber}</p>
        <p><b>Interested In:</b> ${data.interests}</p>
        <p><b>Message Shared:</b> ${data.projectRequirements}</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);

    console.log("A mail has been sent to the user and to Anarish");
    return res.status(200).json({ message: "Emails sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
