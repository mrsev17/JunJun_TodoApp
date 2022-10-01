"use strict";

(() => {

    const taskList = document.querySelector(".todo_tasks-wrapper");
    const formTodo = document.querySelector(".control");
    const inputTask = document.querySelector(".todo_input");

    const taskKeeper = [];
    let taskIdCounter = -1;

    const data = JSON.parse(localStorage.getItem("tasks"));

    const updateHtml = (taskObj) => {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<li id="${taskObj.id}" class="item-task">
            <span>${taskObj.task}</span>
            <button class="cancel-task">
                <img src="assets/todo-cancel.png" alt="Cancel">
            </button>
        </li>`;
        taskList.append(newLi);
    }

    const newTask = (info) => {
        taskIdCounter += 1;
        const taskObj = {
            task: info,
            id: taskIdCounter,
        };
        taskKeeper.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(taskKeeper));
        updateHtml(taskObj);
    };

    formTodo.addEventListener("submit", event => {
        event.preventDefault();
        const info = inputTask.value.trim();
        if(info.length !== 0) {
            newTask(info);
            inputTask.value = "";
            inputTask.focus();
        }
    });

    if(data !== null) {
        for (let item of data) {
            updateHtml(item);
        }
    }

    taskList.addEventListener("click", (event) => {
        for (let el of event.composedPath()) {
            if (el.matches && el.matches("button.cancel-task")) {
                let uniqueId = +(el.parentNode.getAttribute("id"));
                for (let itemId of data) {
                    if(itemId.id === uniqueId) {
                        let getIndex = data.indexOf(itemId);
                        data.splice(getIndex, 1);
                        localStorage.setItem("tasks", JSON.stringify(data));
                    }
                }
                el.parentNode.remove();
            }
        }
    });



})();