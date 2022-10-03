"use strict";

(() => {

  const el = (sel, par) => (par || document).querySelector(sel);
  const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

  const elList = el("#tasks-list");
  const elText = el("#tasks-text");
  const elAdd = el("#tasks-add");

  const tasks = JSON.parse(localStorage.tasks ?? "[]");

  const taskRemove = (taskObj, elTask) => {
    const idx = tasks.indexOf(taskObj);
    tasks.splice(idx, 1);
    localStorage.tasks = JSON.stringify(tasks);
    elTask && elTask.remove();
  };

  const taskAdd = (text) => {
    const taskObj = { task: text };
    tasks.push(taskObj);
    localStorage.tasks = JSON.stringify(tasks);
    taskInsert(taskObj);
  };

  const taskInsert = (taskObj) => {
    const elTask = elNew("li", {
      className: "item-task",
      innerHTML: `<span>${taskObj.task}</span>`
    });
    const elRemove = elNew("button", {
      type: "button",
      innerHTML: "&times;",
      onclick() {
      taskRemove(taskObj, elTask);
    }
    });
    elTask.append(elRemove);
    elList.append(elTask);
  };

  elAdd.addEventListener("click", () => {
    const info = elText.value.trim();
    if (!info.length) return;
    taskAdd(info);
    elText.value = "";
    elText.focus();
  });

  tasks.forEach(taskInsert);
    
})();