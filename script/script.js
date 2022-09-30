"use strict";

(() => {

    let numId = 0;
    const dataStorage = [];

    const todoInput = document.querySelector(".todo_input");
    const taskList = document.querySelector(".todo_tasks-wrapper");
    const addNewTask = document.querySelector(".todo_submit");
    const checkBox = document.querySelector(".check");

    addNewTask.addEventListener("click", event => {
        event.preventDefault();
        const getTask = todoInput.value.trim();
        if(getTask.length !== 0) {
            const html = `<label class="form-control">
                <input class="remove check" type="checkbox" name="checkbox"/>
                <span>${getTask}</span>
            </label>`
            taskList.innerHTML += html;
            numId += 1;
            const newTask = {
                id: +`${numId}`,
                task: `${getTask}`,
            };
            dataStorage.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(dataStorage));
        }
    });






})();