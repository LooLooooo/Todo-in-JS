const toDoForm = document.querySelector("#todo-form")
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

toDoInput.maxLength="15"

let toDos = []

const TODOS_KEY = "todos"

function saveToDos(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const content = document.createElement("span");
  const remove = document.createElement("button")
  const hidden = document.createElement("input")

  content.addEventListener("click", handleToDoClick)
  remove.addEventListener("click", removeTodo)
  
  if(newTodo.result !== ""){
    content.style.color = "darkgray"
  }

  hidden.type = "hidden"
  hidden.value = ""

  li.appendChild(hidden)

  li.id = newTodo.id
  li.appendChild(content);

  remove.innerText = "🗑"
  li.appendChild(remove)

  content.innerText = newTodo.text;

  toDoList.appendChild(li);
}

function handleToDoClick(event){
  const li = event.target.parentElement
  const span = event.target
  const hidden = event.target.parentElement.children[0]

  const INDEX = toDos.findIndex( value => 
    value.id === parseInt(li.id)
  )
  
  if(hidden.value !== "complete"){
    hidden.value = "complete"
    span.style.color = "darkgray"
  }else{
    hidden.value = ""
    span.style.color = "black"
  }

  toDos[INDEX].result = hidden.value
  saveToDos()
}

function handleMouseEnter(event){
  const button = event.target.children[2]
  console.dir(event)
  button.style.visibility = "visible"
}

function handleMouseOut(event){
  const button = event.currentTarget.children[2]
  button.style.visibility = "hidden"
}

function handleToDoSubmit(event) {
    event.preventDefault();

    const newTodo = toDoInput.value;

    const newTodoObj = {
        text : newTodo,
        id : Date.now(),
        result : "",
    }
    
    toDos.push(newTodoObj)

    saveToDos()
    
    toDoInput.value = "";


    paintToDo(newTodoObj);
}

function removeTodo(event){
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

