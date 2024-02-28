
const addButton = document.getElementById('addTasks');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


loadTasks();

function addTask(){
    
    const task = taskInput.value.trim()

    if (task){

        createTaskElement(task);

        taskInput.value ='';

        saveTasks();
    }
}

addButton.addEventListener("click", addTask);


function createTaskElement(task){

    const listItem = document.createElement('li');
    listItem.innerHTML = task.split(" ").filter((item)=>item !=="true" && item !=="false").join(" ");
    listItem.setAttribute("name",listItem.textContent.replace('Delete','').trim());

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML =  "Delete";
    deleteButton.className ='deleteTask';
    console.log(deleteButton.textContent);
    
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    deleteButton.addEventListener('click',()=>{
        taskList.removeChild(listItem);
        saveTasks();
    } );

    const checkBox = document.createElement('input');
    checkBox.checked = task.split(" ")[1]==="true"?true:false;
    checkBox.type = 'checkbox';
    checkBox.className = 'check';

    listItem.appendChild(checkBox);
    taskList.appendChild(listItem);
    checkBox.addEventListener('change',(event)=>{
        if(event.target.checked){
            listItem.style.opacity = 0.4;
            listItem.setAttribute("status",checkBox.checked);
            listItem.setAttribute("name",listItem.textContent.replace('Delete','').trim().split(" ")[0]);
            todoStatus.innerHTML = " " +checkBox.checked;
            listItem.replaceChild(todoStatus, listItem.childNodes[3]);
        }
        else{
            listItem.style.opacity = 1;
            listItem.setAttribute("status",checkBox.checked);
            listItem.setAttribute("name",listItem.textContent.replace('Delete','').trim().split(" ")[0]);
            todoStatus.innerHTML = " " +checkBox.checked;
            listItem.replaceChild(todoStatus, listItem.childNodes[3]);
        }
        let childNodes = taskList.childNodes;
        const liArray = Array.from(childNodes).map((item)=> item.attributes.name.value);
        taskList.replaceChild(listItem, taskList.childNodes[liArray.indexOf(event.target.parentElement.attributes.name.value)]);
        saveTasks()
    })

    const todoStatus = document.createElement('p');
    todoStatus.innerHTML = " " +checkBox.checked;
    todoStatus.style.display = 'none';
    listItem.appendChild(todoStatus);
    taskList.appendChild(listItem);
    if(listItem.textContent.split(" ")[1].replace('Delete','').trim()==="true"){
        listItem.style.opacity = 0.4;
    }

}
function saveTasks(){

    let tasks =[]
    taskList.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.replace('Delete','').trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(createTaskElement);
}
