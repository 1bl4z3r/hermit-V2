class TypewriterEffect {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.container = this.element.parentElement;
        this.originalText = this.element.textContent.trim();
        this.tokens = []; 
        this.currentIndex = 0;
        this.timeouts = [];
        this.isTyping = false;
        this.resizeTimer = null; // Store resize timer as instance property

        this.settings = {
            typingSpeed: this.getCSSVar('--ts') || 50,
            preBlinkDuration: this.getCSSVar('--pbd') || 1000
        };

        document.fonts.ready.then(() => {
            this.init();
        });

        // Use bound method for better performance and proper cleanup
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize, { passive: true });
    }

    getCSSVar(name) {
        const value = getComputedStyle(document.documentElement).getPropertyValue(name);
        return parseInt(value) || parseInt(value.replace('ms', ''));
    }

    handleResize() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.cleanup();
            this.init();
        }, 250);
    }

    init() {
        // Simply wrap each character in a span for animation
        const wrappedHtml = this.wrapCharacters(this.originalText);
        this.element.innerHTML = wrappedHtml;
        this.element.className = 'typewriter-content';
        
        // Cache tokens
        this.tokens = Array.from(this.element.querySelectorAll('.char'));
        
        // Start
        this.startSequence();
    }

    /**
     * Wrap each character in a span for animation
     * CSS text-wrap: balance handles the line breaking consistently
     * OPTIMIZED: Use array pre-allocation and single join operation
     */
    wrapCharacters(text) {
        const chars = text.split('');
        const result = new Array(chars.length);
        
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            // Preserve line breaks if present in original text
            result[i] = char === '\n' ? '<br>' : `<span class="char">${char}</span>`;
        }
        
        return result.join('');
    }

    // --- ANIMATION SEQUENCE ---

    startSequence() {
        // State 1: Ready
        // We add the class to the container to show the cursor at position 0
        this.element.classList.add('ready'); 
        
        const startTimeout = setTimeout(() => {
            this.element.classList.remove('ready');
            this.type();
        }, this.settings.preBlinkDuration);
        
        this.timeouts.push(startTimeout);
    }

    type() {
        this.isTyping = true;
        
        if (this.currentIndex < this.tokens.length) {
            const charSpan = this.tokens[this.currentIndex];
            
            // Clean up previous cursor
            if (this.currentIndex > 0) {
                this.tokens[this.currentIndex - 1].classList.remove('cursor-active');
            }

            // Reveal current character
            charSpan.style.opacity = '1';
            
            // State 2: Active
            // Add cursor to current character (positioned to the right by CSS)
            charSpan.classList.add('cursor-active');

            this.currentIndex++;
            
            const nextStep = setTimeout(() => this.type(), this.settings.typingSpeed);
            this.timeouts.push(nextStep);
        } else {
            // Finished Typing
            this.isTyping = false;
            
            if (this.tokens.length > 0) {
                const lastChar = this.tokens[this.tokens.length - 1];
                
                // Switch from solid Active cursor to blinking Idle cursor
                lastChar.classList.remove('cursor-active');
                lastChar.classList.add('cursor-idle');
            }
        }
    }

    cleanup() {
        // Clear all timeouts efficiently
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
        this.timeouts.length = 0; // Clear array efficiently
        
        this.currentIndex = 0;
        this.element.innerHTML = this.originalText;
        this.element.classList.remove('ready'); // Safety cleanup
    }
    
    destroy() {
        this.cleanup();
        
        // Remove event listener to prevent memory leaks
        window.removeEventListener('resize', this.handleResize);
        
        // Clear resize timer
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = null;
        }
    }
}

let typewriter = null;

function initTypewriter() {
    const element = document.getElementById('home-subtitle');
    if (element) {
        typewriter = new TypewriterEffect('home-subtitle');
    }
}

function cleanup() {
    if (typewriter) {
        typewriter.destroy();
        typewriter = null;
    }
}

// Use options for better performance
addEventListener('load', initTypewriter, { once: true });
addEventListener('beforeunload', cleanup, { once: true });
addEventListener('pagehide', cleanup, { once: true });