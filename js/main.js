"use strict"
//select all divs
const divBoxSingin = document.querySelector(".boxSingin")
const divBoxOfLogin = document.querySelector(".boxOfLogin")
const divBoxWelcom = document.querySelector(".boxWelcom")
const formInputs = document.querySelector("form")

//select inputs of sign up page
const inputUserName = document.querySelector("#inputUserName")
const inputUserEmail = document.querySelector("#inputUserEmail")
const inputUserPassword = document.querySelector("#inputUserPassword")

//select inputs of log in page
const signinEmail = document.querySelector("#signinEmail")
const signinPassword = document.querySelector("#signinPassword")

//select button os sign in , up and out
const signInToBag = document.querySelector(".signInToBag")
const lognInToBag = document.querySelector(".btnForLogIn")
const logOutBtn = document.querySelector(".nav-item")


//message for User
const messageforUser = document.querySelector(".messageforUser")
const incorrect = document.querySelector("#incorrect")
console.log(incorrect)
//select a to move in and out
const singUp = lognInToBag.nextElementSibling.lastElementChild
const singIn = messageforUser.nextElementSibling.lastElementChild

//move to sing up 
singUp.addEventListener("click", function (e) {
    divBoxSingin.classList.replace("d-block", "d-none")
    divBoxOfLogin.classList.replace("d-none", "d-block")
})
//for back
singIn.addEventListener("click", function (e) {
    divBoxSingin.classList.replace("d-none", "d-block")
    divBoxOfLogin.classList.replace("d-block", "d-none")
})

//Array for save data
const userInformation = JSON.parse(localStorage.getItem("userInformation")) || [];

// for add new user
function signUpUsers() {
    // make obj for user info
    const userInfo = {
        userName: inputUserName.value,
        userEmail: inputUserEmail.value,
        userPassword: inputUserPassword.value
    };
    // check if Inputs isEmpty
    if (checkInputsEmpty()) {
        alertMessage('All Inputs Required', 'red');
        return;
    }

    //اcheck if regex email and password are right
    else if (checkInfoRegex()) {
        alertMessage('Invalid email or password', 'red');

    }

    //اcheck if email is existed
    else if (emailExisting()) {
        alertMessage('Email Already Exist', 'red');

    }

    else {


        alertMessage('Success', 'green');
        userInformation.push(userInfo);
        localStorage.setItem("userInformation", JSON.stringify(userInformation));
        resetAllInpus();
    }
}
// check if Inputs isEmpty
function checkInputsEmpty() {
    return   inputUserEmail.value == "" || inputUserName.value == "" || inputUserPassword.value == ""
         
}
// reser inputs
function resetAllInpus() {
    inputUserName.value = "";
    inputUserEmail.value = "";
    inputUserPassword.value = "";
}

//regex 
const useRegex = {
    userEmailRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    userPasswordRegex: /^.{3,}$/
};
//اcheck if regex email and password are right
function checkInfoRegex() {
    if (!useRegex.userEmailRegex.test(inputUserEmail.value)) {
        return true;
    }
    if (!useRegex.userPasswordRegex.test(inputUserPassword.value)) {
        return true;
    }

    return false;
}
// message for user
function alertMessage(content, color) {
    messageforUser.classList.replace("d-none", "d-block");
    messageforUser.innerHTML = content;
    messageforUser.style.color = color;
}
//check if email exiting
function emailExisting() {
    for (let i = 0; i < userInformation.length; i++) {
        if (userInformation[i].userEmail.toLowerCase() == inputUserEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

signInToBag.addEventListener("click", signUpUsers);

//for loge in to welcome page

const myDive = document.querySelector(".test")
const heading= document.createElement("h2")
myDive.append(heading)
console.log(myDive)
function logInToWelcomHome() {
    if (chackOfValues() == true) {
        alertMassageForUser('All Inputs Required', "red")

    }
    else {
        if (checkEmailAndPassword() == true) {
            divBoxWelcom.classList.replace("d-none", "d-block")
            divBoxSingin.classList.replace("d-block", "d-none")
            heading.textContent = `welcom ${localStorage.getItem("userName")}`
            reset()
        }
        else {
            alertMassageForUser("email dose not existing", "red")
            reset()
        }
    }
}
//reset input 
function reset() {
    signinEmail.value = null
    signinPassword.value = null
}
//check for value if user sing up or not
function chackOfValues() {
    if (signinEmail.value == "" && signinPassword.value == "") {
        return true
    }
    else
        return false

}
//check   if that email Existing
function checkEmailAndPassword() {
    for (let i = 0; i < userInformation.length; i++) {
        if (userInformation[i].userEmail == signinEmail.value && userInformation[i].userPassword == signinPassword.value) {
            localStorage.setItem('userName', userInformation[i].userName);
            return true;
        }
    }
}
function alertMassageForUser(content, color) {
    incorrect.classList.replace("d-none", "d-block")
    incorrect.innerHTML = content
    incorrect.style.color = color
}
lognInToBag.addEventListener("click", logInToWelcomHome)

// welcome home to user 
logOutBtn.addEventListener("click", function (e) {
    divBoxWelcom.classList.replace("d-block", "d-none")
    divBoxSingin.classList.replace("d-none", "d-block")
})
function logout() {
    localStorage.removeItem("userName")
    divBoxWelcom.classList.replace("d-block", "d-none")
    divBoxSingin.classList.replace("d-none", "d-block")
}
logOutBtn.addEventListener("click", logout)
