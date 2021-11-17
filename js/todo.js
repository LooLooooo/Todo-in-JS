const toDoForm = document.querySelector("#todo-form")
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

let toDos = []
const TODOS_KEY = "todos"

function saveToDos(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button")

  button.addEventListener("click", deleteTodo)

  li.appendChild(span);
  li.id = newTodo.id

  button.innerText = "💥"
  li.appendChild(button)
  
  span.innerText = newTodo.text;

  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();

    const newTodo = toDoInput.value;
    
    const newTodoObj = {
        text : newTodo,
        id : Date.now()
    }
    
    toDos.push(newTodoObj)

    saveToDos()
    
    toDoInput.value = "";


    paintToDo(newTodoObj);
}

function deleteTodo(event){
      const li = event.target.parentElement
      li.remove()

      toDos = toDos.filter( (toDo) => toDo.id !== parseInt(li.id))
      
      saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos !== null){

    const parsedToDos = JSON.parse(savedToDos)
    toDos = parsedToDos

    parsedToDos.forEach(paintToDo)
}

