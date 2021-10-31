const CONTACT_FORM = document.querySelector("#contact-form");
console.log(CONTACT_FORM);

CONTACT_FORM.addEventListener(`submit`, (event) => {
    console.log("submitted");
    event.preventDefault();

    if (validateFormInputs()) {

    } else {

    }
});

function validateFormInputs() {
    let check = true;
    const submitInfo = document.querySelector(".submit-info-display");

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const subjectInput = document.querySelector("#subject");
    const messageText = document.querySelector("#message-text");

    submitInfo.innerHTML = "";

    if (!validateName(nameInput.value)) {
        nameInput.classList.add("invalid");
        submitInfo.innerHTML += `<p class="error-message">Invalid name</p>`;
        check = false;
    } else {
        nameInput.classList.remove("invalid");
    }
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add("invalid");
        submitInfo.innerHTML += `<p class="error-message">Invalid email</p>`;
        check = false;
    } else {
        emailInput.classList.remove("invalid");
    }
    if (!validateSubject(subjectInput.value)) {
        subjectInput.classList.add("invalid");
        submitInfo.innerHTML += `<p class="error-message">Invalid subject</p>`;
        check = false;
    } else {
        subjectInput.classList.add("invalid");
    }
    if (!validateMessage(messageText.value)) {
        messageText.classList.add("invalid");
        submitInfo.innerHTML += `<p class="error-message">Invalid message</p>`;
        check = false;
    } else {
        subjectInput.classList.remove("invalid");
    }

    function validateName(name) {
        return (name.trim());
    }

    function validateEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }

    function validateSubject(subject) {
        return (subject.trim());
    }

    function validateMessage(message) {
        return (message.trim());
    }
    
}