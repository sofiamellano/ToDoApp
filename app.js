const inputText = document.querySelector ('#textInput');
const formButton = document.querySelector ('#formButton');
const noResultsContainer = document.querySelector ('#noResults');
const containerTask = document.querySelector ('#resultsList');

const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];

if(taskArray.length > 0){
    noResultsContainer.classList.remove('visible');
    noResultsContainer.classList.add('hide');
}

formButton.addEventListener("click", () => {
    saveTask();
});

const saveTask = () => {
    const taskName = inputText.value;

    if(!inputText.value.length > 0){  
        const textMenssage = noResultsContainer.getElementsByTagName('span')[0];
        textMenssage.innerText = 'Task cannot be empty!';
        noResultsContainer.classList.remove('hide');
        noResultsContainer.classList.add('visible');
        return;
    };

    taskArray.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(taskArray));

    if(taskArray.length > 0){
        noResultsContainer.classList.remove('visible');
        noResultsContainer.classList.add('hide');
    }
}