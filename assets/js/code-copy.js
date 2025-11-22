// Utils
// Code-copy buttons using progressive enhancement, originally by Tom Spencer
// Original code : https://www.tomspencer.dev/blog/2018/09/14/click-to-copy-code/
// Below is enhanced version of above. Hooking into Clipboard API
(() => {
  "use strict";
  // Define constants (matching original script’s classes/text)
  const HIGHLIGHT_SELECTOR = ".highlight";
  const COPY_BTN_CLASS = "highlight-copy-btn";
  const COPY_BTN_TEXT = "Copy";
  const COPIED_TEXT = "Copied!";
  const COPY_FAILED_TEXT = "Failed :(";

  // Progressive enhancement: Only proceed if copying is supported
  if (!navigator.clipboard && !document.queryCommandSupported("copy")) {
    // Neither new Clipboard API nor legacy execCommand is available
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

  // Find all code blocks (`.highlight` containers)
  const codeBlocks = document.querySelectorAll(HIGHLIGHT_SELECTOR);
  codeBlocks.forEach((container) => {
    // Create the Copy button
    const copyBtn = document.createElement("button");
    copyBtn.className = COPY_BTN_CLASS;
    copyBtn.textContent = COPY_BTN_TEXT;
    // Append the button to the code block container
    container.appendChild(copyBtn);

    // On click, copy the code text
    copyBtn.addEventListener("click", async () => {
      // Get the inner text of the code.
      // Hugo’s HTML typically wraps code in <div class="highlight"><pre><code>...</code></pre></div>
      const codeEl =
        container.querySelector("pre") || container.firstElementChild;
      if (!codeEl) {
        return;
      }
      const codeText = codeEl.innerText;

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
        // Create a temporary textarea to hold the text
        const textArea = document.createElement("textarea");
        textArea.value = codeText;
        // Avoid scrolling to bottom on large pages
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
        // Should not reach here if initial check passed
        console.warn("Copy operation is not supported in this browser.");
      }
    });
  });
})();
