// task.js

class Task {
    constructor(description, priority, deadline) {
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
        this.completed = false;
        this._id = Task.generateId();
    }

    static generateId() {
        if (!Task.counter) {
            Task.counter = 0;
        }
        return Task.counter++;
    }
    static getId(){
        return this._id;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTasks(showCompleted = false) {
        return showCompleted ? this.tasks : this.tasks.filter(task => !task.completed);
    }

    completeTask(taskId) {
        const task = this.tasks.find(task => task.getId() == taskId);
        if (task) {
            task.completed = true;
            return 'Task marked as completed!';
        } else {
            return 'Task not found.';
        }
    }
}
