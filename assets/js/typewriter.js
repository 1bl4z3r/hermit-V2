document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById("home-subtitle");
    if (!el) return;
  
    const fullText = el.dataset.fulltext || el.textContent.trim(); // fallback if not using data attr
    const speed = 75; // typing speed in ms
    let index = 0;
  
    el.textContent = ""; // Clear any existing text
  
    // Create and style the blinking caret
    const caret = document.createElement("span");
    caret.textContent = "|";
    caret.style.animation = "blink 0.7s step-end infinite";
    el.appendChild(caret);
  
    function typeWriter() {
      if (index < fullText.length) {
        el.insertBefore(document.createTextNode(fullText.charAt(index)), caret);
        index++;
        setTimeout(typeWriter, speed);
      } else {
        // Optionally remove the caret at the end
        // caret.remove();
      }
    }
  
    typeWriter();
  });