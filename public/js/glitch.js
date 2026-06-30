(function () {
    'use strict';
    const glitchEl = document.querySelector('.glitch-text');
    if (!glitchEl) return;

    const originalText = glitchEl.textContent;
    const GLITCH_CHARS = ['#', '%', '█', '░', '▓', '/', '\\', '_', 'x', '*'];
    const CHAR_FLIP_PROB = 0.05;
    const COLOR_FLASH_PROB = 0.15;
    let glitchInterval = null;

    glitchEl.addEventListener('mouseenter', () => {
        glitchEl.classList.add('glitch-active');
        glitchInterval = setInterval(() => {
            let result = '';
            for (let i = 0; i < originalText.length; i++) {
                const char = originalText[i];
                if (char === ' ') {
                    result += char;
                } else if (Math.random() < CHAR_FLIP_PROB) {
                    const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    if (Math.random() < COLOR_FLASH_PROB) {
                        const color = Math.random() < 0.5 ? 'var(--sunbeam-yellow)' : 'var(--chartreuse)';
                        result += `<span style="color:${color}">${glitchChar}</span>`;
                    } else {
                        result += glitchChar;
                    }
                } else {
                    result += char;
                }
            }
            glitchEl.innerHTML = result;
        }, 50);
    });

    glitchEl.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
        glitchEl.classList.remove('glitch-active');
        glitchEl.innerHTML = originalText;
    });
}());
