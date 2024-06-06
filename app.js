const inputText = document.querySelector ('#textInput');
const formButton = document.querySelector ('#formButton');
const noResultsContainer = document.querySelector ('#noResults');
const resultsList = document.querySelector ('#resultsList');


const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];

// <li> 
//   <input type = "chackbox"/> 
//   Task 1 
// </li>
function createTaskElement(taskElement) {
    const liElement = document.createElement ('li');
    const inputElement = document.createElement ('input');
    inputElement.type = 'checkbox';
    inputElement.setAttribute('data-id', taskElement.id);
    liElement.id = taskElement.id;
    inputElement.checked = taskElement.selected;

    inputElement.addEventListener('click', markElementAsDone);

    liElement.appendChild(inputElement);
    const textElement = document.createTextNode(taskElement.text);
    liElement.appendChild(textElement);

    if(taskElement.selected){
        liElement.classList.add('selected');
    }
    return liElement;
};

function markElementAsDone(event){
    const taskId = event.target.getAttribute('data-id');
    const liElement = document.getElementById(`${taskId}`);
    taskArray.forEach(item => {
        if(item.id == taskId) {
            item.selected = !item.selected;
        };
    });

    liElement.classList.toggle('selected'); //toggle crea la clase si no existe y la borra si existes.
    

    localStorage.setItem('tasks', JSON.stringify(taskArray));
};


if(taskArray.length > 0){
    hideNoResultsContainer();
    drawList();
};

formButton.addEventListener("click", () => {
    saveTask();
});

function drawList() {
    resultsList.innerHTML = '';
    taskArray.forEach( (task) => {
        const taskElement = createTaskElement(task);
        resultsList.appendChild(taskElement);
    });
}

function hideNoResultsContainer() {
    noResultsContainer.classList.remove('visible');
    noResultsContainer.classList.add('hide');
};

function showNoResultsContainer() {
    noResultsContainer.classList.remove('hide');
        noResultsContainer.classList.add('visible');
};

const saveTask = () => {
    const idValue = Math.floor(Math.random() * 1000);
    const taskName = {text: inputText.value, selected: false, id: idValue};

    if(!inputText.value.length > 0){  
        const textMenssage = noResultsContainer.getElementsByTagName('span')[0];
        textMenssage.innerText = 'Task cannot be empty!';
        showNoResultsContainer();
        return;
    };

    taskArray.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(taskArray));

    if(taskArray.length > 0){
        inputText.value = '';
        hideNoResultsContainer();
        drawList();
    };
}