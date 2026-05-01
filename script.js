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
  dynamicShowOfCards();
});

//image slider for home page
const slide = document.querySelectorAll(".slide");
let current=0;
console.log(slide.length)
function nextSlide() {
  slide[current].classList.remove("active");
  current = (current + 1) % slide.length;
  slide[current].classList.add("active");
  console.log(current)
}

setInterval(nextSlide, 4000);

function setupToggleMenu() {
  const toggleMenu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggleMenu && navLinks) {
    toggleMenu.addEventListener("click", function () {
      console.log("Toggle menu clicked");
      navLinks.classList.toggle("show");
      toggleMenu.classList.toggle("active");
      if (toggleMenu.name === "close-outline") {
        toggleMenu.name = "reorder-three-outline";
      } else {
        toggleMenu.name = "close-outline";
      }
    });
  }

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navLinks.contains(e.target);
    const isToggleBtn = toggleMenu.contains(e.target);

    if (!isClickInsideMenu && !isToggleBtn) {
      navLinks.classList.remove("show");
      toggleMenu.name = "reorder-three-outline";
    }
  });
}

function dynamicShowOfCards() {
  const mv_cards = document.querySelectorAll(".mv-card");
  const value_cards = document.querySelectorAll(".value-card");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.innerHeight * 0.85;
    mv_cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < scrollPosition) {
        card.classList.add("show");
      } else {
        card.classList.remove("show");
      }
    });

    value_cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      console.log(cardTop);
      if (cardTop < scrollPosition) {
        card.classList.add("show");
      } else {
        card.classList.remove("show");
      }
    });
  });
}


function enableAcademicsLinks() {
  const dropdownContainer = document.querySelector(".academic-dropdown");
  const innerLinks = document.querySelector(".innerAcademicsLink");
  const addIcon = document.querySelector(".add-icon");

  if (!dropdownContainer || !innerLinks) {
    console.warn("Dropdown elements not found");
    return;
  }

  if (addIcon) {
    addIcon.addEventListener("click", function (e) {
      innerLinks.classList.add("show");
      // Rotate icon
      if (innerLinks.classList.contains("show")) {
        addIcon.style.transform = "rotate(180deg)";
        innerLinks.classList.remove("show");
      } else {
        addIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  const academicsLink = document.querySelector(".academic-page");
  if (academicsLink) {
    academicsLink.addEventListener("click", function (e) {
      e.preventDefault();
      innerLinks.classList.toggle("show");
      if (addIcon) {
        if (innerLinks.classList.contains("show")) {
          addIcon.style.transform = "rotate(180deg)";
        } else {
          addIcon.style.transform = "rotate(0deg)";
        }
      }
    });
  }

  // Close dropdown when clicking outside (mobile)
  document.addEventListener("click", function (e) {
    if (!dropdownContainer.contains(e.target)) {
      innerLinks.classList.remove("show");
      if (addIcon) {
        addIcon.style.transform = "rotate(0deg)";
      }
    }
  });
}

// Also update your setupToggleMenu function to work with dropdown
function setupToggleMenu() {
  const toggleMenu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggleMenu && navLinks) {
    toggleMenu.addEventListener("click", function () {
      console.log("Toggle menu clicked");
      navLinks.classList.toggle("show");
      toggleMenu.classList.toggle("active");

      // Change icon
      const iconName = toggleMenu.getAttribute("name");
      if (iconName === "close-outline") {
        toggleMenu.setAttribute("name", "reorder-three-outline");
      } else {
        toggleMenu.setAttribute("name", "close-outline");
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const toggleBtn = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (
      nav &&
      toggleBtn &&
      !nav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      nav.classList.remove("show");
      if (toggleBtn) {
        toggleBtn.setAttribute("name", "reorder-three-outline");
      }
    }
  });
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
  } else if (name.length < 5) {
    nameWarning.innerHTML = "Name should be atleast 5 characters.";
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
