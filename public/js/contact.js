(function() {
"use strict";

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
