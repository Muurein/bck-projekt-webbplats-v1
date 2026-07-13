//hämta API

const url = "http://localhost:1200/api";

//importera från authManager.js
import { login, auth } from "./authManager.js";

//skicka anvädnaren till login om användaren är oinloggad på en adminsida
if(window.location.pathname.includes("adminindex.html") || 
    window.location.pathname.includes("menumanager.html")
) {

    auth();
}

//logga in
const loginFormEl = document.getElementById("login-form");

if(loginFormEl) {

    loginFormEl.addEventListener("submit", login);
}



//importera från menuManager.js
import { fetchItems, createItem, deleteItem, menuFormValues, render } from "./menuManager.js";

const menuFormEl = document.getElementById("menu-form");

//skicka formulär
if(menuFormEl) {

    menuFormEl.addEventListener("submit", menuFormValues);
    fetchItems().then(render);
}