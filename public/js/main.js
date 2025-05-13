// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const nav = document.querySelector("nav");

  mobileMenuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          contactForm.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error sending message. Please try again later.");
        });
    });
  }

  // Contact page form submission
  const contactPageForm = document.getElementById("contactPageForm");
  if (contactPageForm) {
    contactPageForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactPageForm);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          contactPageForm.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error sending message. Please try again later.");
        });
    });
  }

  // Simple testimonial slider
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll(".testimonial");

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.style.display = "none";
    });
    testimonials[index].style.display = "block";
  }

  if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);

    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }
});
