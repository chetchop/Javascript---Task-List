// UI Variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const filterColor = 'rgb(162, 229, 215)';

// Load all event listeners
loadEventListeners();




// Load all event listeners
function loadEventListeners() {
    // DOM loaded event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Load tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create Text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    })
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task.');
    } else {
        // Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create Text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
        // Store task in local storage
        storeTaskInLocalStorage(taskInput.value);
        // Clear Input
        taskInput.value = '';

    }
    e.preventDefault();
}

// Add task to local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (task === taskItem.textContent) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks
function clearTasks(e) {
    if (confirm("Are you sure?")) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        // Clear all tasks from local storage
        clearTasksFromLocalStorage();
    }
}

// Clear all tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.removeItem('tasks');
}

// Filter Tasks
function filterTasks(e) {
    const input = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        if (task.textContent.toLowerCase().indexOf(input) != -1) {
            task.style.display = 'block';
            task.innerHTML = task.innerHTML.replace('<span class=\"filtered-text\" style=\"background: ' + filterColor + ';\">', '');
            task.innerHTML = task.innerHTML.replace('</span>', '');
            const taskText = task.textContent.toLowerCase();
            const innerHTML = task.innerHTML;
            const index = task.textContent.toLowerCase().indexOf(input);

            task.innerHTML = innerHTML.substring(0, index) + '<span class=\'filtered-text\'>' + 
            innerHTML.substring(index, index + input.length) + "</span>" +
            innerHTML.substring(index + input.length);

            document.querySelectorAll('.filtered-text').forEach(function(span){
                span.style.background = filterColor;
            });
        } else {
            task.style.display = 'none';
        }
    });
}





