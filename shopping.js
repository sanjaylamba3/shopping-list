const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

const createIcon = (classes) => {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
};

const createButton = (classes) => {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
};

const addItem = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    // Validate Input
    if (newItem === "") {
        alert("Please add an item!");
        return;
    }
    const li = document.createElement("li");
    const txt = document.createTextNode(newItem);
    li.appendChild(txt);
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = "";
};

// Event Listeners
itemForm.addEventListener("submit", addItem);
