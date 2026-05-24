(function() {
"use strict";

document.querySelector("#contact-form-button").addEventListener("click", submitMail);

function submitMail() {
    event.preventDefault();
    console.log("You clicked the submit button");
}
    //contact-form-button
} ());

