//hämta API

const url = "http://localhost:1200/api";

//importera från authManager.js
import { login, auth, logout } from "./authManager.js";

//skicka anvädnaren till login om användaren är oinloggad på en adminsida
async function checkAuthentication() {

    if(window.location.pathname.includes("adminindex.html") || 
    window.location.pathname.includes("menumanager.html")) {

        await auth();
    }
}

checkAuthentication();

//logga in
const loginFormEl = document.getElementById("login-form");

if(loginFormEl) {

    loginFormEl.addEventListener("submit", login);
}


//logga ut
const logoutButtonEl = document.getElementById("logout-button");

if (logoutButtonEl) {

    logoutButtonEl.addEventListener("click", logout);
}



//importera från menuManager.js
import { fetchItems, createItem, deleteItem, menuFormValues, render } from "./menuManager.js";

const menuFormEl = document.getElementById("menu-form");

//skicka formulär
if(menuFormEl) {

    menuFormEl.addEventListener("submit", menuFormValues);
}

//hämta och visa meny endast om sidan har en meny
const menuContainerEl = document.getElementById("sandwiches-container") || document.getElementById("sandwiches-container-public");

if (menuContainerEl) {

    fetchItems()
        .then(render)
        .catch(error => {
            console.error("Menyn kunde inte hämtas:", error);
        });
}
