let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let bgContainerEle = document.getElementById("bgContainer");

let noteIconConEle = document.getElementById("noteIconCon");
let noteIconEle = document.getElementById("noteIcon");
let noteIconTitleEle = document.getElementById("noteIconTitle");

let trashIconConEle = document.getElementById("trashIconCon");
let trashIconEle = document.getElementById("trashIcon");
let trashIconTilteEle = document.getElementById("trashIconTitle");

let starsIconConEle = document.getElementById("starsIconCon");
let starsIconEle = document.getElementById("starsIcon");
let starsIconTitleEle = document.getElementById("starsIconTitle");

let reminderIconConEle = document.getElementById("reminderIconCon");
let reminderIconEle = document.getElementById("reminderIcon");
let reminderIconTitleEle = document.getElementById("reminderIconTitle");

let darkModeIconConEle = document.getElementById("darkModeIconCon");
let darkModeIconEle = document.getElementById("darkModeIcon");
let darkModeIconTitleEle = document.getElementById("darkModeTitle");

let taskBgContainer = document.getElementById("taskBgContainer");
let todosHeadingContainerEle = document.getElementById("todosHeadingContainer");
let verticalMenuContainerEle = document.getElementById("verticalMenuContainer");

let trashContainerEle = document.getElementById("trashContainer");

let borderColorArr = ["border-green", "border-dark-green", "border-dark-yellow", "border-orange", "border-blue", "border-violet", "border-pink", "border-red", "border-red", "border-gray", "border-unknown"];
let verticalMenuItemEle = document.getElementById("verticalMenuItem");
let todosHeadingEle = document.getElementById("todosHeading");
let todoItemsHeadingEle = document.getElementById("todoItemsHeading");
let todoItemsHeadingSubpartEle = document.getElementById("todoItemsHeadingSubpart");
let createTaskHeadingEle = document.getElementById("createTaskHeading");
let createTaskHeadingSubpartEle = document.getElementById("createTaskHeadingSubpart");
let userInputElement = document.getElementById("todoUserInput");

let hambargerMenuEle = document.getElementById("hambargerMenu");
let noteContainerEle = document.getElementById("noteContainer");
let SearchContainerEle = document.getElementById("SearchContainer");
let searchResult = true;
let ErrorMessage = document.createElement("p");
ErrorMessage.textContent = "No results found!";
let errorImage = document.createElement("img");
errorImage.src = "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=1380&t=st=1668450281~exp=1668450881~hmac=f2044eee9d2c601ff33403fa694e74703ded35d0d9e0f3a0d2f1ff764e207d18";
ErrorMessage.classList.add("error-message");
errorImage.classList.add("error-image");

let searchBarEle = document.getElementById("searchBar");

let isDarkmodeOn = false;

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

function updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

saveTodoButton.addEventListener("click", updateLocalStorage);

function onTodoStatusChange(checkboxId, labelId, todoId) {

    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];

    // if (todoObject.isChecked === true) {
    //     todoObject.isChecked = false;
    // } else {
    //     todoObject.isChecked = true;
    // }
}

function createAndAppendTodo(todo) {

    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo; //
    let labelId = "label" + todo.uniqueNo; //
    let randomIndex = Math.ceil((Math.random() * 10));

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "font-style");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-element");
    inputElement.checked = todo.isChecked;

    let checkboxIconspanEle = document.createElement("div");
    checkboxIconspanEle.innerHTML = "Mark as Completed";
    checkboxIconspanEle.classList.add("delete-icon-tooltiptext", "hover-text");
    inputElement.appendChild(checkboxIconspanEle);

    inputElement.classList.add("checkbox-input");
    // todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-column", "m-1", "card");
    // labelContainer.classList.add(borderColorArr[randomIndex]);
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    if (isDarkmodeOn) {
        // isDarkmodeOn = false;
        labelElement.classList.add("checkbox-label-darkmode");
    } else {
        labelElement.classList.add("checkbox-label");
    }
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    labelElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);

    };

    let isReminderAdded = true;

    function addReminder() {

        let reminderContainerEle = document.createElement("div");
        reminderContainerEle.classList.add("reminder-container");
        let reminderInputEle = document.createElement("input");
        reminderInputEle.classList.add("todo-reminder");
        reminderInputEle.type = "datetime-local";

        let setTimeinputEle = document.createElement("input");
        setTimeinputEle.classList.add("set-time-input");
        setTimeinputEle.type = "submit";
        reminderInputEle.appendChild(setTimeinputEle);

        function getUserReminderInput() {
            // console.log(todoList)
            let Todoindex = todoList.indexOf(todo);
            todoList[Todoindex].reminder = reminderInputEle.value;
            updateLocalStorage();
            // let todoList = getTodoListFromLocalStorage();
            // let todosCount = todoList.length;
            let ReminderTime = todoList[Todoindex].reminder

            if (reminderInputEle.value !== "") {

                // console.log(reminderInputEle.value)
                let reminderText = "Reminder For: "
                let standardedTime = new Date(reminderInputEle.value);
                let IntervalId = null;
                let isExecuted = false;

                if (standardedTime > new Date()) {
                    setInterval(() => {
                        let currentDateandTime = new Date();
                        if (standardedTime.toString() === currentDateandTime.toString()) {
                            IntervalId = setTimeout(() => {
                                alert(reminderText + todo.text)
                                isExecuted = true;

                            }, 1000);
                            if (isExecuted) {
                                clearTimeout(IntervalId)
                            }
                        }
                    }, 1000);
                } else {
                    alert("Please enter a valid input")
                }
            } else if (reminderInputEle.value === "") {
                reminderContainerEle.removeChild(reminderInputEle);
                isReminderAdded = true;
            }
        }

        // getUserReminderInput call
        reminderInputEle.addEventListener("blur", getUserReminderInput)
        reminderInputEle.onclick = function() {
            reminderInputEle.appendChild(setTimeinputEle);

        }
        reminderContainerEle.appendChild(reminderInputEle);


        if (isReminderAdded) {
            isReminderAdded = false
            labelContainer.appendChild(reminderContainerEle);
        }

    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let reminderIconEle = document.createElement("i");
    reminderIconEle.classList.add("fa-solid", "fa-bell", "icon", "reminder-icon");
    reminderIconEle.id = new Date().valueOf();

    let reminderIconspanEle = document.createElement("div");
    reminderIconspanEle.innerHTML = "Set Reminder";
    reminderIconspanEle.classList.add("delete-icon-tooltiptext", "hover-text");
    reminderIconEle.appendChild(reminderIconspanEle);
    deleteIconContainer.appendChild(reminderIconEle);

    reminderIconEle.addEventListener("click", addReminder);

    let starIcon = document.createElement("i");
    starIcon.classList.add("fa-sharp", "fa-solid", "fa-star", "icon", "star-icon");

    let starIconspanEle = document.createElement("div");
    starIconspanEle.innerHTML = "Add Importants";
    starIconspanEle.classList.add("delete-icon-tooltiptext", "hover-text");
    starIcon.appendChild(starIconspanEle);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-alt", "delete-icon", "icon");

    let deleteIconspanEle = document.createElement("div");
    deleteIconspanEle.innerHTML = "Move to Trash";
    deleteIconspanEle.classList.add("delete-icon-tooltiptext", "hover-text");
    deleteIcon.appendChild(deleteIconspanEle);

    let restoreIcon = document.createElement("i");
    restoreIcon.classList.add("fa-sharp", "fa-solid", "fa-trash-arrow-up", "restore-icon", "icon");

    let restoreIconHover = document.createElement("div");
    restoreIconHover.innerHTML = "Restore";
    restoreIconHover.classList.add("delete-icon-tooltiptext", "hover-text");
    restoreIcon.appendChild(restoreIconHover);
    // todoElement.appendChild(restoreIcon);

    let deleteForeverIcon = document.createElement("i");
    deleteForeverIcon.classList.add("fa-solid", "fa-trash", "delete-icon", "icon");

    let deleteForeverIconHover = document.createElement("div");
    deleteForeverIconHover.innerHTML = "Delete Forever";
    deleteForeverIconHover.classList.add("delete-icon-tooltiptext", "hover-text");
    deleteForeverIcon.appendChild(deleteForeverIconHover);

    function onDeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);
        trashContainerEle.appendChild(todoElement);

        deleteIconContainer.appendChild(deleteForeverIcon)

        function restoretodo() {
            deleteIconContainer.appendChild(starIcon);
            deleteIconspanEle.innerHTML = "Move to Trash";
            deleteIconContainer.removeChild(restoreIcon);
            deleteIconContainer.removeChild(deleteForeverIcon);
            trashContainerEle.removeChild(todoElement);

            todoItemsContainer.appendChild(todoElement);
            deleteIconContainer.appendChild(reminderIconEle)
            deleteIconContainer.appendChild(starIcon);
            deleteIconContainer.appendChild(deleteIcon);

        }

        restoreIcon.addEventListener("click", restoretodo)
        let deleteElementIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        function deleteForeverfun() {
            trashContainerEle.removeChild(todoElement);
            todoList.splice(deleteElementIndex, 1);
            updateLocalStorage();

        }

        deleteForeverIcon.addEventListener("click", deleteForeverfun)

    }
    starIcon.onclick = function() {
        starIcon.classList.toggle("star-icon-color");
        labelElement.classList.toggle("checkbox-label-important");

    };
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
        deleteIconContainer.removeChild(deleteIcon);
        deleteIconContainer.removeChild(starIcon);
        deleteIconContainer.appendChild(restoreIcon);
        deleteIconContainer.removeChild(reminderIconEle)
    };

    function labelDarkMode() {
        labelElement.classList.toggle("light-font-color");
        deleteIcon.classList.toggle("light-font-color");
        deleteIcon.classList.toggle("icons-darkmode-hover")
        starIcon.classList.toggle("light-font-color");
        starIcon.classList.toggle("icons-darkmode-hover")
        deleteForeverIcon.classList.toggle("light-font-color")
        deleteForeverIcon.classList.toggle("icons-darkmode-hover")
        restoreIcon.classList.toggle("light-font-color");
        restoreIcon.classList.toggle("icons-darkmode-hover")
        reminderIconEle.classList.toggle("light-font-color")
        reminderIconEle.classList.toggle("icons-darkmode-hover")
    }

    darkModeIconConEle.addEventListener("click", labelDarkMode);

    //end
    deleteIconContainer.appendChild(starIcon);
    deleteIconContainer.appendChild(deleteIcon);

    let searchBarValue = false;

    function searchAndAppend(searchWord) {
        // if ( searchResult== false) {

        //     }
        if (labelElement.textContent.toLowerCase().includes(searchWord)) {
            SearchContainerEle.removeChild(ErrorMessage)
            SearchContainerEle.removeChild(errorImage)

            SearchContainerEle.appendChild(todoElement)
            // searchResult = false;

        }
    }

    function searchFunction(event) {
        if (event.key === "Enter" && searchBarEle.value !== "") {
            searchBarValue = true;
            let searchWord = searchBarEle.value;
            searchAndAppend(searchWord);
            SearchContainerEle.classList.add("d-block")
            taskBgContainer.classList.remove("d-block");
            taskBgContainer.classList.add("d-none");
            trashContainerEle.classList.add("d-none");
            trashContainerEle.classList.remove("d-block");
        }

    }

    searchBarEle.addEventListener("keydown", searchFunction)

    function removeSearch() {
        if (searchBarValue && searchBarEle.value === "") {
            SearchContainerEle.removeChild(todoElement)
            // SearchContainerEle.removeChild(ErrorMessage)
            // SearchContainerEle.removeChild(errorImage)
        }
        searchBarEle.value = null;
    }
    searchBarEle.addEventListener("blur", removeSearch)
};

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function searchErrorFunction(event) {
    if (event.key === "Enter") {
        if (searchResult) {
            SearchContainerEle.appendChild(errorImage)
            SearchContainerEle.appendChild(ErrorMessage)
            // searchResult = false
            // SearchContainerEle.classList.toggle("d-flex","justify-content-center")
        }
    }
}
searchBarEle.addEventListener("keydown", searchErrorFunction)



function onAddTodo() {

    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: new Date().valueOf(),
        isChecked: false,
        reminder: ""
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};

function darkModeFun() {
    if (isDarkmodeOn) {
        isDarkmodeOn = false;
    } else {
        isDarkmodeOn = true;
    }
    searchBarEle.classList.toggle("todo-user-input-dark-bg")
    userInputElement.classList.toggle("todo-user-input-dark-bg")

    noteIconEle.classList.toggle("light-font-color");
    trashIconEle.classList.toggle("light-font-color");
    darkModeIconEle.classList.toggle("light-font-color");
    reminderIconEle.classList.toggle("light-font-color");
    starsIconEle.classList.toggle("light-font-color");

    noteIconTitleEle.classList.toggle("light-font-color");
    trashIconTilteEle.classList.toggle("light-font-color");
    darkModeIconTitleEle.classList.toggle("light-font-color");
    reminderIconTitleEle.classList.toggle("light-font-color");
    starsIconTitleEle.classList.toggle("light-font-color");
    saveTodoButton.classList.toggle("light-font-color");
    addTodoButton.classList.toggle("light-font-color");

    darkModeIconConEle.classList.add("button-active")
    noteIconConEle.classList.remove("button-active")
    trashIconConEle.classList.remove("button-active")
    starsIconConEle.classList.remove("button-active")
    reminderIconConEle.classList.remove("button-active")

    bgContainerEle.classList.toggle("dark-mode-bg");
    todosHeadingContainerEle.classList.toggle("todos-heading-container-dark-mode");
    todosHeadingEle.classList.toggle("todos-heading-dark-mode");
    todoItemsHeadingEle.classList.toggle("todos-heading-dark-mode");
    todoItemsHeadingSubpartEle.classList.toggle("todos-heading-dark-mode");
    createTaskHeadingEle.classList.toggle("todos-heading-dark-mode");
    createTaskHeadingSubpartEle.classList.toggle("todos-heading-dark-mode");

    let elementText = darkModeIconTitleEle.textContent;

    if (elementText === "Dark Mode") {
        darkModeIconTitleEle.innerHTML = "Light Mode";
    } else {
        darkModeIconTitleEle.innerHTML = "Dark Mode";
    }
    verticalMenuContainerEle.classList.toggle("dark-mode-bg");

}

darkModeIconConEle.addEventListener("click", darkModeFun);

function trashItems() {
    SearchContainerEle.classList.remove("d-block")
    trashIconConEle.classList.add("button-active")
    darkModeIconConEle.classList.remove("button-active")
    noteIconConEle.classList.remove("button-active")
    starsIconConEle.classList.remove("button-active")
    reminderIconConEle.classList.remove("button-active")

    taskBgContainer.classList.remove("d-block");
    taskBgContainer.classList.add("d-none");
    trashContainerEle.classList.remove("d-none")
    trashContainerEle.classList.add("d-block");
}

trashIconConEle.addEventListener("click", trashItems);
noteIconConEle.classList.add("button-active")

function noteItems() {
    SearchContainerEle.classList.remove("d-block")
    noteIconConEle.classList.add("button-active")
    trashIconConEle.classList.remove("button-active")
    darkModeIconConEle.classList.remove("button-active")
    starsIconConEle.classList.remove("button-active")
    reminderIconConEle.classList.remove("button-active")

    taskBgContainer.classList.remove("d-none");
    taskBgContainer.classList.add("d-block");
    trashContainerEle.classList.remove("d-block");
    trashContainerEle.classList.add("d-none")
    // starsIconConEle.classList.add("d-none")
    // trashContainerEle.classList.add("d-none")
    //  trashContainerEle.classList.remove("d-none");
}

noteIconConEle.addEventListener("click", noteItems)

function starsIcon() {
    starsIconConEle.classList.add("button-active")
    trashIconConEle.classList.remove("button-active")
    darkModeIconConEle.classList.remove("button-active")
    noteIconConEle.classList.remove("button-active")
    reminderIconConEle.classList.remove("button-active")
    // taskBgContainer.classList.toggle("d-block");
    // starsIconConEle.classList.add("d-block");
    taskBgContainer.classList.add("d-none");
    trashContainerEle.classList.add("d-none");
    // trashContainerEle.classList.add("d-block")

}

starsIconConEle.addEventListener("click", starsIcon)

function hambugerMenu() {
    // verticalMenuContainerEle.classList.toggle("vertical-menu-container")
    verticalMenuContainerEle.classList.toggle("hamberger-width")
    noteIconTitleEle.classList.toggle("d-none")
    noteIconEle.classList.remove("icon-and-name-container")
    noteIconConEle.classList.toggle("icon-and-name-container-hambargerActive")
    trashIconTilteEle.classList.toggle("d-none")
    starsIconTitleEle.classList.toggle("d-none")
    reminderIconTitleEle.classList.toggle("d-none")
    darkModeIconTitleEle.classList.toggle("d-none")
}

hambargerMenuEle.addEventListener("click", hambugerMenu)

// function todoItems() {
//     noteIconConEle.classList.add("button-active")
//     trashIconConEle.classList.remove("button-active")
//     darkModeIconConEle.classList.remove("button-active")
//     starsIconConEle.classList.remove("button-active")
//     reminderIconConEle.classList.remove("button-active")

//     taskBgContainer.classList.toggle("d-none");
//     taskBgContainer.classList.add("d-block");
//     trashContainerEle.classList.add("d-none")
//     // starsIconConEle.classList.add("d-none")
//     trashContainerEle.classList.add("d-none")
// }

// noteIconConEle.addEventListener("click", todoItems)

// reminderIconConEle.addEventListener("click", reminderIcon)
// bgContainerEle.classList.toggle("light-mode-bg", "vertical-menu-container-dark-mode");