const displayPara = document.querySelector(".displayPara");
const loginForm = document.querySelector(".loginForm");
const signUpForm = document.querySelector(".signUpForm");
const loginPageLink = document.querySelector(".loginPageLink");
const signUpPageLink = document.querySelector(".signUpPageLink");


loginPageLink.addEventListener("click" ,(e) => {
    console.log(e);
    displayPara.style.display = "none";
    signUpForm.style.display = "none";
    loginForm.style.display = "block";
})

signUpPageLink.addEventListener("click", (e) => {
    console.log(e);
    displayPara.style.display = "none";
    signUpForm.style.display = "none";
    loginForm.style.display = "block";
})

