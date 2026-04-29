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
    pageLinks.forEach((link) => {

      if (window.location.pathname === new URL(link.href).pathname) {
        link.classList.add(".current-page-link");
      }
    });
}

// Load header and footer when the page loads
document.addEventListener("DOMContentLoaded", function() {
  loadHeaderFooter();
  highlightCurrentPageLink();
});

window.onload = function() {
  highlightCurrentPageLink();
};


const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  const nameWarning = document.querySelector(".name-warning");
  const phoneWarning = document.querySelector(".phone-warning");
  const emailWarning = document.querySelector(".email-warning");  
  const messageWarning = document.querySelector(".message-warning");

  // Send the form data to the server
  fetch("contact.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name,
      email,
      message,
    }),
  })

  if(!name){
    nameWarning.innerHTML = "Please fill in the name field.";
    nameWarning.hidden = false;
  }else if(!phone){
    phoneWarning.innerHTML = "Please fill in the phone field.";
    phoneWarning.hidden = false;
    nameWarning.hidden = true;
  }else if(phone.length < 10){
    phoneWarning.innerHTML = "Please enter a valid phone number.";
    phoneWarning.hidden = false;
    nameWarning.hidden = true;
  }else if(!email){
    emailWarning.innerHTML = "Please fill in the email field.";
    emailWarning.hidden = false;
    nameWarning.hidden = true;
    phoneWarning.hidden = true;
  }else if(email && !email.includes("@")){
    emailWarning.innerHTML = "Please enter a valid email address.";
    emailWarning.hidden = false;
    nameWarning.hidden = true;
    phoneWarning.hidden = true;
  }else if(!message){
    messageWarning.innerHTML = "Please fill in the message field.";
    messageWarning.hidden = false;
    emailWarning.hidden = true;
    phoneWarning.hidden = true;
  }else{
    messageWarning.hidden = true;
    emailWarning.hidden = true; 
    nameWarning.hidden = true;  
    phoneWarning.hidden = true;
    alert("Thank you for your message!");
    form.reset();
  }
  
});
