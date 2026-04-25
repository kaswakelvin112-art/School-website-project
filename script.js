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

// Load header and footer when the page loads
document.addEventListener("DOMContentLoaded", loadHeaderFooter);
