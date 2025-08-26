class TypewriterEffect {

    constructor(elementId) {
        // Locate the target text element by its ID in the DOM
        this.element = document.getElementById(elementId);
        this.container = this.element.parentElement;

        // Preserve the initial text content for restoration and measurement
        this.originalText = this.element.textContent;

        // Initialize control variables for typing effect
        this.typingText = '';
        this.currentIndex = 0;
        this.timeouts = []; // Keep track of active timers
        this.measurer = null; // Element used for text width measurement

        // Retrieve typing effect settings from CSS custom properties
        this.settings = {
            preBlinkDuration: this.getCSSVar('--pbd'),
            typingSpeed: this.getCSSVar('--ts')
        };

        // Initialize the typewriter effect components
        this.init();
    }

    // Utility function to parse CSS variable values
    getCSSVar(name) {
        const value = getComputedStyle(document.documentElement).getPropertyValue(name);
        return parseInt(value) || parseInt(value.replace('ms', ''));
    }

    // Initialize the typewriter effect sequence
    init() {
        // Create hidden element to measure text width accurately
        this.createMeasurer();
        // Calculate required container dimensions for text wrapping
        this.calculateContainerSize();
        // Begin the typing animation sequence
        this.startSequence();
    }

    // Create a hidden element for precise text width measurement
    createMeasurer() {
        this.measurer = document.createElement('div');
        this.measurer.className = 'measure-element';

        // Copy only the dynamic styles from the target element
        const styles = getComputedStyle(this.element);

        // Essential text-related styles that need to match exactly
        this.measurer.style.font = styles.font;
        this.measurer.style.fontSize = styles.fontSize;
        this.measurer.style.fontFamily = styles.fontFamily;
        this.measurer.style.fontWeight = styles.fontWeight;
        this.measurer.style.letterSpacing = styles.letterSpacing;
        this.measurer.style.fontStyle = styles.fontStyle;
        this.measurer.style.textAlign = styles.textAlign;
        this.measurer.style.padding = styles.padding;
        this.measurer.style.boxSizing = styles.boxSizing;

        // Attach measurer to document for layout calculation
        document.body.appendChild(this.measurer);
    }


    // Calculate container height based on wrapped text lines
    calculateContainerSize() {
        // Generate text string with line breaks according to container width
        this.typingText = this.calculateWrappedText();

        // Determine the number of lines for the wrapped text
        const lines = this.typingText.split('\n').length;

        // Get the computed line height of the text
        const computedLineHeight = parseFloat(getComputedStyle(this.element).lineHeight);

        // Compute total height, adding padding for aesthetics
        const totalHeight = (lines + 0.5) * computedLineHeight;

        // Set container height to avoid layout shifting during typing
        this.container.style.height = `${totalHeight}px`;
    }

    // Determine text wrapping points based on container width
    calculateWrappedText() {
        // Get the actual content width (excluding padding)
        const elementStyles = getComputedStyle(this.element);
        const paddingLeft = parseFloat(elementStyles.paddingLeft);
        const paddingRight = parseFloat(elementStyles.paddingRight);
        const containerWidth = this.element.clientWidth - paddingLeft - paddingRight;

        const words = this.originalText.split(' ');
        let result = '';
        let currentLine = '';

        // Iterate over words to build lines
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine === '' ? word : currentLine + ' ' + word;

            // Measure width of candidate line
            this.measurer.textContent = testLine;

            if (this.measurer.clientWidth > containerWidth && currentLine !== '') {
                // Current line full, append and start new line
                result += currentLine;
                if (i < words.length - 1) { // Only add newline if not the last word
                    result += '\n';
                }
                currentLine = word;
            } else {
                // Word fits, append to current line
                currentLine = testLine;
            }
        }

        // Append the last line after loop
        if (currentLine !== '') {
            result += currentLine;
        }

        return result;
    }

    // Display text with typing effect one character at a time
    type() {
        if (this.currentIndex < this.typingText.length) {
            // Update displayed text incrementally
            this.element.textContent = this.typingText.slice(0, this.currentIndex + 1);
            this.currentIndex++;

            // Schedule next character display
            const timeout = setTimeout(() => this.type(), this.settings.typingSpeed);
            this.timeouts.push(timeout);
        } else {
            // Typing complete, trigger cursor blinking effect
            this.element.className = 'done';
        }
    }

    // Start typing animation sequence after preparing
    startSequence() {
        // Clear text and reset index
        this.element.textContent = '';
        this.currentIndex = 0;

        // Set cursor blink animation before typing AND make element visible
        this.element.className = 'ready';

        // Delay before starting typing effect
        const blinkTimeout = setTimeout(() => {
            // Set typing class to keep element visible during animation
            this.element.className = 'typing';
            this.type();
        }, this.settings.preBlinkDuration);
        this.timeouts.push(blinkTimeout);
    }

    // Display text with typing effect one character at a time
    type() {
        if (this.currentIndex < this.typingText.length) {
            // Update displayed text incrementally
            this.element.textContent = this.typingText.slice(0, this.currentIndex + 1);
            this.currentIndex++;

            // Schedule next character display
            const timeout = setTimeout(() => this.type(), this.settings.typingSpeed);
            this.timeouts.push(timeout);
        } else {
            // Typing complete, trigger cursor blinking effect
            this.element.className = 'done';
        }
    }

    // Clean up resources and restore original text
    destroy() {
        // Cancel all active typing timers
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];

        // Remove the hidden measurer element from DOM
        if (this.measurer && this.measurer.parentNode) {
            this.measurer.parentNode.removeChild(this.measurer);
            this.measurer = null;
        }

        // Restore original text content and reset styling
        if (this.element) {
            this.element.textContent = this.originalText;
            this.element.className = '';
        }
    }
}

// Initialize typewriter effect on page load and cleanup on unload
let typewriter = null;

function initTypewriter() {
    typewriter = new TypewriterEffect('home-subtitle');
}

function cleanup() {
    if (typewriter) {
        typewriter.destroy();
        typewriter = null;
    }
}

// Register event listeners for initialization and cleanup
addEventListener('load', initTypewriter);
addEventListener('beforeunload', cleanup);
addEventListener('pagehide', cleanup);