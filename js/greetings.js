const loginForm = document.querySelector("#LoginForm")
const loginInput = document.querySelector("#LoginForm input")
const greeting = document.querySelector("#greeting")

const HIDDEN_CLASSNAME = "hidden"
const USERNAME = "username"

function OnLoginSubmit(event){
    event.preventDefault()
    localStorage.setItem("username", loginInput.value)
    paintGreeting()
}

const saveUserName = localStorage.getItem(USERNAME)

if(saveUserName === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME)
    loginForm.addEventListener("submit", OnLoginSubmit)
}else{
    paintGreeting()
}

function paintGreeting(){
    const username = localStorage.getItem(USERNAME)
    
    greeting.innerText = `Hello ${username}`
    greeting.classList.remove(HIDDEN_CLASSNAME)

    loginForm.classList.add(HIDDEN_CLASSNAME)
}
