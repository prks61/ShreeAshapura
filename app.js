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

// Email sending route
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const smtpPort = parseInt(process.env.EMAIL_PORT);
    const isSecure = smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: smtpPort,
      secure: isSecure, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
