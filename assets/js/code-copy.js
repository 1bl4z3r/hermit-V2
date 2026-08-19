// Utils
// Code-copy buttons using progressive enhancement, originally by Tom Spencer
// Original code : https://www.tomspencer.dev/blog/2018/09/14/click-to-copy-code/
// Below is enhanced version of above. Hooking into Clipboard API
(() => {
  "use strict";
  // Define constants
  const HIGHLIGHT_SELECTOR = ".highlight";
  const COPY_BTN_CLASS = "highlight-copy-btn";
  const COPY_BTN_TEXT = "Copy";
  const COPIED_TEXT = "Copied!";
  const COPY_FAILED_TEXT = "Failed :(";

  // Progressive enhancement: Only proceed if copying is supported
  if (!navigator.clipboard && !document.queryCommandSupported("copy")) {
    return;
  }

  // Helper: temporarily show a status message on the button
  const flashCopyMessage = (button, msg) => {
    const originalText = button.textContent;
    button.textContent = msg;
    setTimeout(() => {
      button.textContent = originalText;
    }, 1000);
  };

  // Find all code blocks
  const codeBlocks = document.querySelectorAll(HIGHLIGHT_SELECTOR);
  codeBlocks.forEach((container) => {
    // Create the Copy button
    const copyBtn = document.createElement("button");
    copyBtn.className = COPY_BTN_CLASS;
    copyBtn.textContent = COPY_BTN_TEXT;
    container.appendChild(copyBtn);

    // On click, copy the code text
    copyBtn.addEventListener("click", async () => {
      
      const codeNode = 
        container.querySelector("td:last-child code") || 
        container.querySelector("td:last-child pre") || 
        container.querySelector("code") || 
        container.querySelector("pre");

      if (!codeNode) {
        return;
      }

      // Use textContent instead of innerText
      let codeText = codeNode.textContent;

      // Normalise line endings
      codeText = codeText.replace(/\r\n/g, "\n");

      // Try using the modern Clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(codeText);
          flashCopyMessage(copyBtn, COPIED_TEXT);
        } catch (err) {
          console.error("Copy failed", err);
          flashCopyMessage(copyBtn, COPY_FAILED_TEXT);
        }
      }
      // Fallback to execCommand if Clipboard API is not supported
      else if (document.queryCommandSupported("copy")) {
        const textArea = document.createElement("textarea");
        textArea.value = codeText;
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          flashCopyMessage(copyBtn, COPIED_TEXT);
        } catch (err) {
          console.error("Copy failed", err);
          flashCopyMessage(copyBtn, COPY_FAILED_TEXT);
        }
        document.body.removeChild(textArea);
      } else {
        console.warn("Copy operation is not supported in this browser.");
      }
    });
  });
})();