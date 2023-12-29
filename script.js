const readline = require('readline');

let task_id = 0;

class Task {
    constructor(description, priority, deadline) {
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
        this.completed = false;
        this._id = task_id++;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    displayTasks(showCompleted = false) {
        console.log();
        console.log(`[?] Total tasks len: ${this.tasks.length}`);
        console.log();
        for (const task of this.tasks) {
            if (!showCompleted && task.completed) {
                continue;
            }
            console.log(`Description: ${task.description}`);
            console.log(`Priority: ${task.priority}`);
            console.log(`Deadline: ${task.deadline}`);
            console.log(`Completed: ${task.completed ? 'Yes' : 'No'}`);
            console.log(`Id: ${task._id}`);
            console.log();
        }
    }

    completeTask(taskId) {
        const task = this.tasks.find(task => task._id == taskId);
        if (task) {
            task.completed = true;
            console.log('Task marked as completed!');
        } else {
            console.log('Task not found.');
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const taskManager = new TaskManager();

    while (true) {
        console.log('\nTask Manager Menu:');
        console.log('1. Add Task');
        console.log('2. Display Tasks');
        console.log('3. Mark Task as Completed');
        console.log('4. Exit');

        const choice = await askQuestion('Enter your choice: ');

        if (choice === '1') {
            const description = await askQuestion('Enter task description: ');
            const priority = await askQuestion('Enter task priority: ');
            const deadline = await askQuestion('Enter task deadline (YYYY-MM-DD HH:MM): ');

            const task = new Task(description, priority, new Date(deadline));
            taskManager.addTask(task);
            console.log('Task added successfully!');
        } else if (choice === '2') {
            const showCompleted = await askQuestion('Do you want to display completed tasks? (yes/no): ');
            taskManager.displayTasks(showCompleted.toLowerCase() === 'yes');
        } else if (choice === '3') {
            const taskId = await askQuestion('Enter the ID of the task to mark as completed: ');
            taskManager.completeTask(taskId);
        } else if (choice === '4') {
            console.log('Exiting Task Manager.');
            break;
        } else {
            console.log('Invalid choice. Please try again.');
        }
    }

    rl.close();
}

function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

main();
