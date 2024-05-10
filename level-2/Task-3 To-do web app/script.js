function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
  
    if (taskInput.value.trim() !== "") {
      var li = document.createElement("li");
      li.textContent = taskInput.value;
      taskList.appendChild(li);
      taskInput.value = "";
  
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = function() {
        taskList.removeChild(li);
      };
  
      li.appendChild(removeButton);
    } else {
      alert("Please enter a task!");
    }
  }
