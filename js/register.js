const registerForm = document.querySelector(".signup");
const registerMessage = document.querySelector("#register-message");


registerForm.onsubmit = (event) => {
    event.preventDefault();
    registerMessage.innerHTML = "";
    if (validateForm(registerForm.children[0].children)) {
        registerMessage.innerHTML = createSuccessMessage();
        setTimeout( () => {
            window.location.href = `./index.html?user=${registerForm.children[0].children[0].value}`;
        }, 1000);
    }
}

function validateForm(form) {
    let valid = true;
    let password = "";
    for (let entry of form) {
       if (!isValid(entry)) {
            entry.classList.add("invalid");
            valid = false
       } else {
           entry.classList.remove("invalid");
       }
    }

    if (!document.querySelector("#terms").checked) {
        valid = false;
        document.querySelector("#terms").classList.add("invalid");
    } else {
        document.querySelector("#terms").classList.remove("invalid");
    }

    return valid;

    function isValid(entry) {
        switch (entry.name) {
            case "full-name" : 
                return validateName(entry.value);
                break;
            case "email" :
                return validateEmail(entry.value);
                break;
            case "password" : 
                password = entry.value;
                return validatePassword(entry.value);
                break;
            case "password-confirm" : 
                return confirmPassword(entry.value, password);
                break;
        }
        return false;
    }

    function validateName(name) {
        return (name.trim());
    }

    function validateEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }

    function validatePassword(passwordEntry) {
        return (passwordEntry);
    }

    function confirmPassword(confirmation, pass) {
        return (confirmation === pass && pass !== "");
    }
}

function createSuccessMessage() {
    return `Success!`;
}

