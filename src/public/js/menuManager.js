//funktioner relaterade tll meny: CRUD, visa från api
const url = "http://localhost:1200/api/menu";

const currentItemId = null;


//hämta meny
export async function fetchItems() {

    try {
        const response = await fetch(`${url}/getItem`);

        if(!response.ok) {

            throw new Error("Ett HTTP-fel har inträffat: " + response.status);
        }

        const result = await response.json();
        return result;

    } catch(error) {
        console.log("Ett fel har inträffat när menyn skulle hämtas: ", error);
        return [];
    }
}


//skapa nytt meny-item
export async function createItem(category, name, description, price) {

    try {

        let items = {
            category,
            name,
            description,
            price
        }

        const response = await fetch(`${url}/addItem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(items),
        });

        const data = await response.json();

        //felmeddelande utifall något gick fel
        if(!response.ok) {
            document.getElementById("error-message").textContent = "data.message";
        }

        //updatera listan med items
        fetchItems().then(render);

    } catch(error) {

        console.log("Ett fel har inträffat när en ny artikel skulle läggas till i menyn");
    }
}


  
//uppdatera meny-item
export async function updateItem(id, category, name, description, price) {

    const item = {
        category,
        name,
        description,
        price
    };

    const response = (`${url}/updateItem/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    });

    return await response.json();
}



//ta bort meny-item
export async function deleteItem(id) {

    try {

        const response = await fetch(`${url}/deleteItem/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.ok;

    } catch(error) {
        console.log("Ett fel har uppstått när en artikel skulle tas bort: ", error);
    }
}


//hämta information som angivits i formuläret
export function menuFormValues(event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    
    if(!category || !name || !description || !price) {

        document.getElementById("fillInAllMenu").textContent = "Alla fält behöver fyllas i";

        return;
    }

    if(currentItemId) {

        updateItem(currentItemId, category, name, description, price);

        currentItemId = null;

        document.getElementById("post-menu-button").value = "Lägg till";

    } else {
        createItem(category, name, description, price);
    }
    

    //återställer formuläret
    document.getElementById("menu-form").reset();
}


//skriv ut items
export function render(items) {

    const sandwichesContainerEl = document.getElementById("sandwiches-container");
    sandwichesContainerEl.innerHTML = "";
    
    const piesContainerEl = document.getElementById("pies-container");
    piesContainerEl.innerHTML = "";

    const dessertsContainerEl = document.getElementById("desserts-container");
    dessertsContainerEl.innerHTML = "";

    const drinksContainerEl = document.getElementById("drinks-container");
    drinksContainerEl.innerHTML = "";

    //gå igenom listan med items //article, h3 (namn), p (description, kursiv), 
    items.forEach(item => {
        //article
        const articleEl = document.createElement("article");

        //h3 (name)
        const nameEl = document.createElement("h3");
        nameEl.textContent = item.name;
        nameEl.classList.add("name-h3"); 


        // p (description i kursiv)
        const descriptionEl = document.createElement("p");
        descriptionEl.textContent = item.description;
        descriptionEl.classList.add("description-p");

        //pris
        const priceEl = document.createElement("p");
        priceEl.textContent = item.price + " kr";
        priceEl.classList.add("price-p");

        //uppdatera-knapp
        const updateButtonEl = document.createElement("button");
        updateButtonEl.textContent = "Ändra";

        updateButtonEl.onclick = () => {

            currentItemId = item._id;

            document.getElementById("category").value = item.category;
            document.getElementById("name").value = item.name;
            document.getElementById("description").value = item.description;
            document.getElementById("price").value = item.price;

            document.getElementById("post-menu-button").value = "Spara ändringar";

        }

        //ta bort-knapp
        const deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Ta bort";

        deleteButtonEl.onclick = () => {
            deleteItem(item._id).then(() => {
                fetchItems().then(render);
            });
        }

        //lägg till allt i rätt kategori
        articleEl.appendChild(nameEl);
        articleEl.appendChild(descriptionEl);
        articleEl.appendChild(priceEl);
        articleEl.appendChild(updateButtonEl);
        articleEl.appendChild(deleteButtonEl);

        switch(item.category) {
            case "sandwich":
                sandwichesContainerEl.appendChild(articleEl);
                break;
            case "pie":
                piesContainerEl.appendChild(articleEl);
                break;
            case "dessert":
                dessertsContainerEl.appendChild(articleEl);
                break;
            case "drink":
                drinksContainerEl.appendChild(articleEl);
                break;
        };
    });
}

