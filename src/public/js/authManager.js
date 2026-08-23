//authorization-relaterade functioner: logga in, logga ut, JWT
const url = "http://localhost:1200/api";

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}


export function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

//logga in
export function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //är båda fälten ifyllda?
    if(!username || !password) {

        document.getElementById("fillInAllLogin").textContent = "Bägge fälten behöver fyllas i.";

        return;
    }

    //logga in användaren
    fetch(`${url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
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
export async function auth() {

    const token = localStorage.getItem("token");

    if(!token) {
        window.location.href = "login.html";
    }

    try {
        //är token giltligt?
        const response = await fetch(`${url}/admin`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        //om ogiltligt, skicka tillbaka användaren till "logga in"-sidan
        if(!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "login.html";

            return;
        }

    } catch(error) {
        
        localStorage.removeItem("token");

        window.location.href = "login.html";
    }
}