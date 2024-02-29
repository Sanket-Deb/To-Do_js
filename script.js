
const addButton = document.getElementById('addTasks');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let todoList=[];

loadTasks();

function addTask(){
    let todo;
    const task = taskInput.value.trim()
    if (task){
        todo = {
            name: task,
            status: false,
        }
        taskInput.value ='';
        createTodo(todo);
    }
}

addButton.addEventListener("click", addTask);


function createTodo(todo){

    const listItem = document.createElement('li');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'check';
    checkBox.checked = todo.status;
    listItem.appendChild(checkBox);

    const todoName = document.createElement('span');
    todoName.innerHTML = todo.name;
    listItem.appendChild(todoName);
    if(todo.status){
        todoName.setAttribute("status", todo.status);
    }
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML =  "Delete";
    deleteButton.className ='deleteTask';
    listItem.appendChild(deleteButton);
    
    deleteButton.addEventListener('click',()=>{
        taskList.removeChild(listItem);
        todoList= todoList.filter(item => item.name !==listItem.childNodes[1].textContent);
        saveTasks();
    } );
    
    taskList.appendChild(listItem);
    todoList = [...todoList, todo ];
    saveTasks()

    checkBox.addEventListener('change',(event)=>{
        if(event.target.checked){
            todo.status = true;
            todoName.setAttribute("status", todo.status);
        }
        else{
            todo.status = false;
            todoName.removeAttribute("status", todo.status);
        }
        saveTasks()
    })
}

function saveTasks(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('todoList')) || [];
    tasks.forEach(createTodo);
}
