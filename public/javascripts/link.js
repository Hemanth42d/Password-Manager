const login = document.querySelector(".loginBtn");
const signUp = document.querySelector(".signUpBtn");

const loginForm = document.querySelector(".loginForm");
const signUpForm = document.querySelector(".signUpForm");

signUpForm.style.visibility = "hidden";

login.addEventListener("click", (e) => {
    console.log("working")
    loginForm.style.visibility = "visible";
    signUpForm.style.visibility = "hidden";
})

signUp.addEventListener("click", (e) => {
    console.log("working")
    loginForm.style.visibility = "hidden";
    signUpForm.style.visibility = "visible";
})

loginForm.addEventListener("click", (e) => {
    e.preventDefault();
});

signUpForm.addEventListener("click", (e) => {
    e.preventDefault();
});