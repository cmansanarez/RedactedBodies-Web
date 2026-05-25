(function() {
"use strict";

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Glitch text effect — contact heading
const glitchEl = document.querySelector('.glitch-text');
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

const form = document.querySelector("#contact-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    let formValid = true;

    if (!form.checkValidity()) {
        formValid = false;
    }

    form.classList.add("was-validated");

    if (formValid) {
        sendEmail();
    }
});

async function sendEmail() {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#mail").value;
    let inquiryType = document.querySelector("#inquiry-type").value;
    let message = document.querySelector("#msg").value;

    const object = {
        subject: 'Someone submitted a contact form',
        text: `${name} sent you a message regarding ${inquiryType}.

Their message reads: ${message}

Their email address is: ${email}`
    };

    const responseEl = document.querySelector('#contact-button-response');

    const response = await fetch('/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
    });

    const result = await response.json();

    if (result.success) {
        responseEl.textContent = 'Message sent successfully.';
        responseEl.className = 'response-success';
    } else {
        responseEl.textContent = 'Something went wrong. Please try again.';
        responseEl.className = 'response-failure';
    }

    setTimeout(() => {
        responseEl.textContent = '';
        responseEl.className = '';
    }, 5000);
}

} ());
