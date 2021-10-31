const CONTACT_FORM = document.querySelector("#contact-form");
const submitInfo = document.querySelector(".submit-info-display");

CONTACT_FORM.addEventListener(`submit`, (event) => {
    console.log("submitted");
    event.preventDefault();

    if (validateFormInputs()) {
        submitInfo.innerHTML = `<span class="success">Message successfully sent!</span>`;
    }
});

function validateFormInputs() {
    let check = true;
    

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const subjectInput = document.querySelector("#subject");
    const messageText = document.querySelector("#message-text");

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
        subjectInput.classList.remove("invalid");
    }
    if (!validateMessage(messageText.value)) {
        messageText.classList.add("invalid");
        submitInfo.innerHTML += `<p class="error-message">Invalid message</p>`;
        check = false;
    } else {
        subjectInput.classList.remove("invalid");
    }

    return check;

}