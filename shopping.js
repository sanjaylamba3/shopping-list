const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

const checkUI = () => {
    const items = itemList.querySelectorAll("li");
    if (items.length === 0) {
        clearBtn.classList.add("hidden");
        filter.classList.add("hidden");
    } else {
        clearBtn.classList.remove("hidden");
        filter.classList.remove("hidden");
    }
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
    checkUI();
    itemInput.value = "";
};

const removeItem = (e) => {
    if (e.target.parentElement.classList.contains("remove-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
};

const clearItem = () => {
    // const arr = Array.from(itemList.children);
    // arr.forEach((item) => item.remove());
    while (itemList.firstChild) {
        itemList.firstChild.remove();
    }
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
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItem);
filter.addEventListener("input", filterItems);

checkUI();
