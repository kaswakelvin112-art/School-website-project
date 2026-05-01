// Function to load header and footer
async function loadHeaderFooter() {
  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  if (headerElement) {
    try {
      const headerResponse = await fetch("header.html");
      const headerContent = await headerResponse.text();
      headerElement.innerHTML = headerContent;
      console.log(headerContent);
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }

  if (footerElement) {
    try {
      const footerResponse = await fetch("footer.html");
      const footerContent = await footerResponse.text();
      console.log(footerContent);
      footerElement.innerHTML = footerContent;
    } catch (error) {
      console.error("Error loading footer:", error);
    }
  }
}

function highlightCurrentPageLink() {
  const nav = document.querySelector(".nav-links");
  const pageLinks = nav.querySelectorAll("li a");
  const currentFile = window.location.pathname.split("/").pop();
  pageLinks.forEach((link) => {
    if (link.href.split("/").pop() === currentFile) {
      console.log("Current page link found:", currentFile);
      link.classList.add("current-page-link");
    }
  });

  const pagelinkFooter = document.querySelectorAll(".page-links li a");
  pagelinkFooter.forEach((link) => {
    if (link.href.split("/").pop() === currentFile) {
      console.log("Current page link found:", currentFile);
      link.classList.add("current-page-footer");
    }
  });

}

// Load header and footer when the page loads
document.addEventListener("DOMContentLoaded", async function () {
  await loadHeaderFooter();
  setupToggleMenu();
  highlightCurrentPageLink();
});

function setupToggleMenu() {
  const toggleMenu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggleMenu && navLinks) {
    toggleMenu.addEventListener("click", function () {
      console.log("Toggle menu clicked");
      navLinks.classList.toggle("show");
      toggleMenu.classList.toggle("active");
      if(toggleMenu.name==="close-outline"){
        toggleMenu.name="reorder-three-outline";
      }else{
        toggleMenu.name="close-outline";
      }
    });
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  const nameWarning = document.querySelector(".name-warning");
  const phoneWarning = document.querySelector(".phone-warning");
  const emailWarning = document.querySelector(".email-warning");
  const messageWarning = document.querySelector(".message-warning");

  if (!name) {
    nameWarning.innerHTML = "Please fill in the name field.";
    nameWarning.hidden = false;
  } else if (!phone) {
    phoneWarning.innerHTML = "Please fill in the phone field.";
    phoneWarning.hidden = false;
    nameWarning.hidden = true;
  } else if (phone.length < 10) {
    phoneWarning.innerHTML = "Please enter a valid phone number.";
    phoneWarning.hidden = false;
    nameWarning.hidden = true;
  } else if (!email) {
    emailWarning.innerHTML = "Please fill in the email field.";
    emailWarning.hidden = false;
    nameWarning.hidden = true;
    phoneWarning.hidden = true;
  } else if (email && !email.includes("@")) {
    emailWarning.innerHTML = "Please enter a valid email address.";
    emailWarning.hidden = false;
    nameWarning.hidden = true;
    phoneWarning.hidden = true;
  } else if (!message) {
    messageWarning.innerHTML = "Please fill in the message field.";
    messageWarning.hidden = false;
    emailWarning.hidden = true;
    phoneWarning.hidden = true;
  } else {
    messageWarning.hidden = true;
    emailWarning.hidden = true;
    nameWarning.hidden = true;
    phoneWarning.hidden = true;
  }

  // fetch("https://script.google.com/macros/s/AKfycbx12345abcdef/exec", {
  //   method: "POST",
  //   body: new URLSearchParams({
  //     name: name,
  //     phone: phone,
  //     email: email,
  //     message: message
  //   })
  // })
  // .then(response => response.text())
  // .then(data => {
  //   console.log("Server response:", data);
  //   alert("Thank you! Your response has been recorded.");
  // })
  // .catch(error => {
  //   console.error("Error!", error.message);
  // });
});
