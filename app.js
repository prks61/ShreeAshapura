require("dotenv").config();
const express = require("express");
const path = require("path");


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



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
