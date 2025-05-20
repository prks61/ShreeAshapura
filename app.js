require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home | Shree Ashapura Febro & Construction" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us | Shree Ashapura Febro & Construction",
  });
});

app.get("/services", (req, res) => {
  res.render("services", {
    title: "Services | Shree Ashapura Febro & Construction",
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects | Shree Ashapura Febro & Construction",
  });
});

app.get("/clients", (req, res) => {
  res.render("clients", {
    title: "Clients | Shree Ashapura Febro & Construction",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us | Shree Ashapura Febro & Construction",
  });
});

// send email
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Create transporter using your GoDaddy SMTP configuration
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // SSL/TLS as shown in your configuration
      auth: {
        user: process.env.EMAIL_USER || "admin@theashapura.com",
        pass: process.env.EMAIL_PASS
      },
      tls: {
        // This helps with some certificate issues
        rejectUnauthorized: false,
      },
    });

    // Set up email data
    const mailOptions = {
      from: `"Ashapura" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER, // Where you want to receive emails
      replyTo: email, // So you can reply directly to the sender
      subject: `${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
