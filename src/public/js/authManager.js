//authorization-relaterade functioner: logga in, logga ut, JWT
const url = "http://localhost:1200/api";

//logga in
export function login(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    //är båda fälten ifyllda?
    if(!username || !password) {

        document.getElementById("fillInAllLogin").textContent = "Bägge fälten behöver fyllas i.";

        return;
    }

    //logga in användaren
    fetch(url, + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if(!response.ok) {
            document.getElementById("incorrectInfoLogin").textContent = "Inloggningen misslyckades. Användarnamnet eller lösenordet är fel";

            throw new Error("Inloggningen misslyckades");
        }

        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token);
        
        window.location.href = "adminindex.html";
    })
    .catch(error => {
        console.error("Inloggningen misslyckades: ", error.message);
    });
}

//blocka adminindex om användaren inte har ett token
export function auth() {
    const token = localStorage.getItem("token");

    if(!token) {
        window.location.href = "login.html";
    }
}