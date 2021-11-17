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
  const content = document.createElement("span");
  const check = document.createElement("input")
  const remove = document.createElement("button")


  check.addEventListener("change", checkTodo)
  remove.addEventListener("click", removeTodo)


  if(newTodo.check !== ""){
    check.checked = "true"
  }

  check.type = "checkbox"
  li.appendChild(check)
  
  if(newTodo.font !== ""){
    content.style.textDecoration = "line-through"
  }

  li.id = newTodo.id
  li.appendChild(content);

  remove.innerText = "💥"
  li.appendChild(remove)


  content.innerText = newTodo.text;

  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();

    const newTodo = toDoInput.value;

    const newTodoObj = {
        text : newTodo,
        id : Date.now(),
        font : "",
        check : ""
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

function checkTodo(event){
      const li = event.target.parentElement
      const text = li.children[1].style.textDecoration

      if(text !== "line-through"){
        li.children[1].style.textDecoration = "line-through"

        toDos = toDos.filter( (todo) => todo.id !== li.id)
        localStorage.clear()
        
        toDos.push( {
          text : li.children[1].innerText,
          id : li.id,
          font : li.children[1].style.textDecoration,
          check : li.children[0].checked
        })

        saveToDos()

      }else {
        li.children[1].style.textDecoration = ""
      }

      console.log()
}
toDoForm.addEventListener("submit", handleToDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos !== null){

    const parsedToDos = JSON.parse(savedToDos)
    toDos = parsedToDos

    parsedToDos.forEach(paintToDo)
}

