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

function sendEmail() {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#mail").value;
    let inquiryType = document.querySelector("#inquiry-type").value;
    let message = document.querySelector("#msg").value;

    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Inquiry Type: " + inquiryType);
    console.log("Message: " + message);
}

} ());
