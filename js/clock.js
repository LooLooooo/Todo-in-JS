const clock = document.querySelector("h2#clock")

function Clock(){
    const date = new Date()
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const sec = String(date.getSeconds()).padStart(2,"0")
    clock.innerText = `${hours} : ${minutes} : ${sec}`
}


Clock()
setInterval(Clock, 1000);
console.dir()