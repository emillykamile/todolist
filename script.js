
/* Essa é a lógica Javascript que tentei implementar, assisti um vídeo no youtube de 58 minutos, e fui acompanhando
passo a passo dele, mas fiquei travada nessa lógica. Sugiram algumas dúvidas ao decorrer do desenvolvimento,
que foram retiradas com o José Mauro. No CSS, tinha conseguido implementar a parte das tarefas, mas depois tentei 
passar pro JS */


/* Explicando a lógica em sí
 Criei uma constante que vai pegar o input texto, que é o elemento de entrada que vamos receber com as atividades,
 e outra constante que vai pegar o botão de adicionar, e fazer a adição na lista de tarefas, a partir das funções 
 criadas logo em seguida. A primeira arrow fuction, valida os dados que pegamos de entrada. 
 
 A segunda valida novamente o input, e caso não seja válido ele retorna um error, que basicamente vai deixar uma 
 borda vermelha no input, informando para o usuário que ele deve digitar uma tarefa válida.

 Em seguida, temos a criação de elementos pelo javascript, uma div, que contém um paragráfo, que por sua vez, 
 vai armazenar o valor digitado no input, valor definido pelo usuário. 
 
 Em seguida tentei impletar a parte referente ao "Apagar" que fica do lado de cada item da lista.
 
 E por fim, tem também as atualizações do localStorage. */


const inputElement = document.querySelector(".input-text");
const addTaskButton = document.querySelector(".botao-salvar");

const cardAtividades = document.querySelector('.card-atividades');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAndTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
       return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add('.atividade-item');

    const taskContent = document.createElement('p');
        taskContent.innerText = inputElement.value;

    const deleteItem = document.createElement("i");
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};


  const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
  
    const localStorageTasks = [...tasks].map((task) => {
      const content = task.firstChild;
      const isCompleted = content.classList.contains("completed");
  
      return { description: content.innerText, isCompleted };
    });
  
    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
  };  

  const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
  
    if (!tasksFromLocalStorage) return;
  
    for (const task of tasksFromLocalStorage) {
      const taskItemContainer = document.createElement("div");
      taskItemContainer.classList.add("task-item");
  
      const taskContent = document.createElement("p");
      taskContent.innerText = task.description;
  
      if (task.isCompleted) {
        taskContent.classList.add("completed");
      }
  
      taskContent.addEventListener("click", () => handleClick(taskContent));
  
      const deleteItem = document.createElement("i");
      deleteItem.classList.add("far");
      deleteItem.classList.add("fa-trash-alt");
  
      deleteItem.addEventListener("click", () =>
        handleDeleteClick(taskItemContainer, taskContent)
      );
  
      taskItemContainer.appendChild(taskContent);
      taskItemContainer.appendChild(deleteItem);
  
      tasksContainer.appendChild(taskItemContainer);
    }
  };
  
  refreshTasksUsingLocalStorage();
  
  addTaskButton.addEventListener("click", () => handleAddTask());
  
  inputElement.addEventListener("change", () => handleInputChange());