//UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');


loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', loadTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', removeAll);

    filter.addEventListener('keyup', filterTasks);
}

function loadTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const deleteIcon = document.createElement('a');
        deleteIcon.className = 'delete-task secondary-content';
        deleteIcon.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(deleteIcon);

        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
        return;
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const deleteIcon = document.createElement('a');
    deleteIcon.className = 'delete-task secondary-content';
    deleteIcon.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(deleteIcon);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-task')){
        if(confirm('You sure you want to delete task?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
        }
    }
}

function removeTaskFromLocalStorage(taskName){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskName === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeAll(e){
    if(confirm('you sure you want delete all tasks?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

        clearTasksFromLocalStorage();
    }
}

function clearTasksFromLocalStorage(){
    localStorage.removeItem('tasks');
}

function filterTasks(e){
    const filterText = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const taskText = task.firstChild.textContent.toLocaleLowerCase();
        if(taskText.indexOf(filterText) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    })
}

