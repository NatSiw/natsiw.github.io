class Todo {
  constructor() {
    let localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      this.tasks = JSON.parse(localStorageTasks);
    } else {
      this.tasks = [];
    }
    //claude ai helped with idea how to implement editing (with editIndex, index of task i want to edit)
    this.editIndex = null;
    this.term = "";
  }

  toLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getFilteredTasks() {
    if (this.term.length >=2 ) {
      return this.tasks.filter((task) => task.text.toLowerCase().includes(this.term.toLowerCase()));
    } else {
      return this.tasks;
    }
  }


  //claude ai helped with imlementing highlighting of searched term
  highlight(element, text) {
    let start = text.toLowerCase().indexOf(this.term.toLowerCase());
    let end = start + this.term.length;

    if (this.term.length < 2 || start == -1) {
      element.textContent = text;
      return;
    }


    let beforeNotHighlighted = text.slice(0, start);
    let highlighted  = text.slice(start, end);
    let afterNotHighlighted = text.slice(end);

    let mark = document.createElement("mark");
    mark.textContent = highlighted;

    element.append(beforeNotHighlighted, mark, afterNotHighlighted);
  }


  draw() {
    let taskUl = document.getElementsByClassName("task-ul")[0];
    taskUl.innerHTML = "";
    this.getFilteredTasks().forEach((task) => {
      let taskLi = document.createElement("li");
      let taskLiText = document.createElement("div");
      let taskLiDate = document.createElement("div");
      let delButton = document.createElement("button");
      let index = this.tasks.indexOf(task);

      taskLi.className = "task-li";
      taskLiText.className = "task-li-text";
      taskLiDate.className = "task-li-date";
      delButton.className = "task-li-del-button";

      if (index == this.editIndex) {
        let taskLiEditText = document.createElement("input");
        taskLiEditText.type = "text";
        taskLiEditText.value = task.text;
        taskLiEditText.className = "task-li-edit-text";

        let taskLiEditDate = document.createElement("input");
        taskLiEditDate.type = "datetime-local";
        taskLiEditDate.value = task.date;
        taskLiEditDate.className = "task-li-edit-date";

        taskLi.append(taskLiEditText);
        taskLi.append(taskLiEditDate);
      } else {
        taskLi.append(taskLiText);
        taskLi.append(taskLiDate);
      }
      taskLi.append(delButton);

      this.highlight(taskLiText, task.text);
      taskLiDate.textContent = task.date;
      delButton.textContent = "Usuń";

      delButton.addEventListener("click", (event) => {
        event.stopPropagation();
        this.saveChanges();
        this.remove(index);
      });

      taskLi.addEventListener("click", () => {
        if (this.editIndex == index) {
          return;
        }
        this.saveChanges();
        this.editIndex = index;
        this.draw();
      });
      taskUl.append(taskLi);

    });

  }

  add(text, date) {
    if (!(text.length >= 3 && text.length <= 255)) {
      alert("Wpisz minimum 3 i maksymalnie 255 znaków");
      return;
    }

    if (date != "" && new Date(date) <= new Date()) {
      alert("Podaj datę w przyszłości");
      return;
    }

    this.tasks.push({text: text, date: date});
    this.toLocalStorage();
    this.draw();
  }

  remove(index) {
    this.tasks.splice(index, 1);
    this.toLocalStorage();
    this.draw();
  }

  edit(index, text, date) {
    this.tasks[index].text = text;
    this.tasks[index].date = date;
    this.toLocalStorage();
    this.draw();
  }

  saveChanges() {
    if (this.editIndex == null) {
      return;
    }
    let taskLiEditText = document.getElementsByClassName("task-li-edit-text")[0].value;
    let taskLiEditDate = document.getElementsByClassName("task-li-edit-date")[0].value;
    let index = this.editIndex;
    this.editIndex = null;
    this.edit(index, taskLiEditText, taskLiEditDate);
  }

}

document.todo = new Todo();
document.todo.draw();

let addTaskButton = document.getElementsByClassName("add-task-button")[0];

addTaskButton.addEventListener("click", () => {
  let addTaskText = document.getElementsByClassName("add-task-text")[0].value;
  let addTaskDate = document.getElementsByClassName("add-task-datetime")[0].value;
  document.todo.add(addTaskText, addTaskDate);
});

document.addEventListener("click", (event) => {
  //claude ai helped with idea how to implement saving changes properly (when clicking outside li) with "closest()" method
  if (!event.target.closest(".task-li")) {
    document.todo.saveChanges();
  }
});



let searchInput = document.getElementsByClassName("search-tasks-text")[0];

searchInput.addEventListener("input", () => {
  document.todo.term = searchInput.value;
  document.todo.draw();
});


