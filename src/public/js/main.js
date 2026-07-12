//hämta API

const url = "http://localhost:1200/api";

//importera från authManager.js
import { login, auth } from "./authManager.js";

//skicka anvädnaren till login om användaren är oinloggad på en adminsida
if(window.location.pathname.includes("adminindex.html" || "menumanager.html")){
    auth();
}

//logga in
const loginFormEl = document.getElementById("login-form");

loginFormEl.addEventListener("submit", login);