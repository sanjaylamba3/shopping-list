const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");
const fromBtn = itemForm.querySelector("button");
isEditMode = false;

const displayItems = () => {
    const itemFromStorage = getItemsFromStorage();
    itemFromStorage.forEach((item) => addItemToDom(item));
    checkUI();
};

const checkUI = () => {
    itemInput.value = "";
    const items = itemList.querySelectorAll("li");
    if (items.length === 0) {
        clearBtn.classList.add("hidden");
        filter.classList.add("hidden");
    } else {
        clearBtn.classList.remove("hidden");
        filter.classList.remove("hidden");
    }

    fromBtn.innerHTML = ` <i class="fa-solid fa-plus"></i> Add Item`;
    fromBtn.style.backgroundColor = "#333";
    isEditMode = false;
};

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

const addItemToDom = (item) => {
    const li = document.createElement("li");
    const txt = document.createTextNode(item);
    li.appendChild(txt);
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);
};

const onAddItemSubmit = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    // Validate Input
    if (newItem === "") {
        alert("Please add an item!");
        return;
    }

    if (isEditMode) {
        const itemToEdit = itemList.querySelector(".edit-mode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.remove();
        isEditMode = false;
    } else if (checkIfItemExists(newItem)) {
        alert("Item already exists!");
        return;
    }

    addItemToDom(newItem);
    addItemToStorage(newItem);
    checkUI();
    itemInput.value = "";
};

const addItemToStorage = (item) => {
    const itemFromStorage = getItemsFromStorage();

    itemFromStorage.push(item);

    localStorage.setItem("items", JSON.stringify(itemFromStorage));
};

const getItemsFromStorage = () => {
    // let itemFromStorage;
    // if (localStorage.getItem("items") === null) {
    //     itemFromStorage = [];
    // } else {
    //     itemFromStorage = JSON.parse(localStorage.getItem("items"));
    // }
    const itemFromStorage = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    return itemFromStorage;
};

const onClickItem = (e) => {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement);
    } else if (e.target.tagName === "LI") {
        setItemToEdit(e.target);
    }
};

const checkIfItemExists = (item) => {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
    isEditMode = true;
    const items = itemList.querySelectorAll("li");
    items.forEach((i) => i.classList.remove("edit-mode"));
    item.classList.add("edit-mode");
    fromBtn.innerHTML = `<i class = "fa-solid fa-pen"></i> Update Item`;
    fromBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent;
};

const removeItem = (item) => {
    if (confirm("Are you sure?")) {
        // Remove item from DOM
        item.remove();

        // Remove item from storage
        removeItemFromStorage(item.textContent);
    }
    checkUI();
};

const removeItemFromStorage = (item) => {
    let itemFromStorage = getItemsFromStorage();
    itemFromStorage = itemFromStorage.filter((i) => i !== item);
    localStorage.setItem("items", JSON.stringify(itemFromStorage));
};

const clearItem = () => {
    // const arr = Array.from(itemList.children);
    // arr.forEach((item) => item.remove());
    while (itemList.firstChild) {
        itemList.firstChild.remove();
    }
    localStorage.removeItem("items");
    checkUI();
};

const filterItems = (e) => {
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.innerText.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            console.log(true);
            item.style.display = "flex";
        } else {
            console.log(false);
            item.style.display = "none";
        }
    });
};

// Event Listeners
const init = () => {
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItem);
    filter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);
    checkUI();
};

init();

console.log(itemInput.tagName);
