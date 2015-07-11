//problem: user interaction doesn't provide desired results
//solution: add interactivity so the user can manage their to-do list
"use strict";

var taskInput = document.getElementById("new-task");	//new task textbox
var addButton = document.getElementById("add-button");	//add button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");	//list of incomplete tasks
var completedTaskHolder = document.getElementById("completed-tasks"); //list of completed tasks

//new task list item
var createNewTaskElement = function(taskString) {
	var listItem = document.createElement("li");		//create list item li element
	var checkBox = document.createElement("input");		//input (checkbox)
	var label = document.createElement("label");		//label
	var editInput = document.createElement("input");	//input (text)
	var editButton = document.createElement("button");	//button.edit
	var deleteButton = document.createElement("button");//button.delete
	//modify elements
	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.textContent = "Edit";	//innerHTML, innerText, textContent are only slightly different
	editButton.className = "edit";
	deleteButton.textContent = "Delete";	//in this case it makes no difference
	deleteButton.className = "delete";

	label.textContent = taskString;			//set label text to argument that's passed in

	//append all elements to listItem li parent element
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//add a new task
var addTask = function() {
	console.log("add task");		//for debugging purposes
	if (taskInput.value !== "") {
		//create a new list item with text from #new-task textbox
		var listItem = createNewTaskElement(taskInput.value);
		//append listItem to incompleteTasksHolder
		incompleteTaskHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);
		//clear input field after adding task
		taskInput.value = "";
	}
}

//edit existing task
var editTask = function() {
	console.log("edit task");
	//clicking edit button triggers this function, therefore parent is an li element
	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	//if class of parent is .editmode
	if (listItem.classList.contains("editmode")) {	//if in editmode
		label.textContent = editInput.value;	//label text become the input's value
		listItem.querySelector("button.edit").textContent = "Edit";
	}
	else {										//if not in editmode
		editInput.value = label.textContent;	//input value becomes label's text
		listItem.querySelector("button.edit").textContent = "Save";

	}
	listItem.classList.toggle("editmode");		//toggle .editmode class on list item
}

//delete an existing task
var deleteTask = function() {
	console.log("delete task");
	var listItem = this.parentNode;	//store parent li element
	var ul = listItem.parentNode;	//parent of li element
	ul.removeChild(listItem);		//remove listItem from list
}

//mark a task complete
//this function is called when checkbox is checked
var taskCompleted = function() {
	console.log("task complete");
	//this refers to checked checkbox, so parentNode refers to parent li element
	var listItem = this.parentNode;
	completedTaskHolder.appendChild(listItem);	//append task list item to #completed-tasks
	bindTaskEvents(listItem, taskIncomplete);
	//remove editmode class from li element
}

//mark a task as incomplete, uncheck item in completed list
var taskIncomplete = function() {
	console.log("task incomplete");
	//this refers to checked checkbox, so parentNode refers to parent li element
	var listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);	//append task list item to #incomplete-tasks
	bindTaskEvents(listItem, taskCompleted);
}

//create function to avoid repeating code
var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
	console.log("bind list items");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	//bind editTask to edit button
	editButton.onclick = editTask;
	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;
	//bind checboxEventHandler to checkbox
	checkBox.onchange = checkboxEventHandler;
}

taskInput.addEventListener("focus", function() {
	this.value = "";
});

addButton.onclick = addTask;


//cycle over incompleteTaskHolder ul list items
for(var i = 0; i < incompleteTaskHolder.children.length; i++) {
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completeTaskHolder ul list items
for(var i = 0; i < completedTaskHolder.children.length; i++) {
	bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}
