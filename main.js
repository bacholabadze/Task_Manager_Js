// main.js

const taskManager = new TaskManager();

function addTask() {
    const description = prompt('Enter task description: ');
    const priority = prompt('Enter task priority: ');
    const deadline = prompt('Enter task deadline (YYYY-MM-DD HH:MM): ');

    const task = new Task(description, priority, new Date(deadline));
    taskManager.addTask(task);
    displayMessage('Task added successfully!');
}

function displayTasks() {
    const showCompleted = confirm('Do you want to display completed tasks?');
    const tasks = taskManager.getTasks(showCompleted);
    displayMessage(`Total tasks len: ${tasks.length}`);

    for (const task of tasks) {
        const taskDetails = `
            Description: ${task.description}<br>
            Priority: ${task.priority}<br>
            Deadline: ${task.deadline}<br>
            Completed: ${task.completed ? 'Yes' : 'No'}<br>
            ID: ${task._id}<br><br>
        `;

        displayMessage(taskDetails);
    }
}

function markTaskCompleted() {
    const taskId = prompt('Enter the ID of the task to mark as completed: ');
    const result = taskManager.completeTask(taskId);
    displayMessage(result);
}

function displayMessage(message) {
    const messageParagraph = document.createElement('p');
    messageParagraph.innerHTML = message;
    document.getElementById('output').appendChild(messageParagraph);
}
