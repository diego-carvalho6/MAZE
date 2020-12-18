const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];
let arr = []
let labirinto = document.getElementById("labirinto")
let boxTop = 0
let boxLeft = 0
let arrWalls = []

function Lose(){
    document.removeEventListener("keydown", move)
    let object = document.getElementById("start")
    object.classList.add("lose")
    let winLose = document.getElementById("winLose")
    winLose.innerText = "você colidiu a aeronave"
    setInterval(function(){window.location.replace(window.location.pathname + window.location.search + window.location.hash);window.reset()}, 3000)
}
function Loser(){
    document.removeEventListener("keydown", move)
    let winLose = document.getElementById("winLose")
    winLose.innerText = "não fuja do combate soldado"
    setInterval(function(){window.location.replace(window.location.pathname + window.location.search + window.location.hash);window.reset()}, 1500)
}
function victory(){
    document.removeEventListener("keydown", move)
    let winLose = document.getElementById("winLose")
    let object = document.getElementById("start")
    object.classList.add("lose")
    winLose.innerText = "você concluiu sua missão e saiu do labirinto, porem sua nave foi abatida na saida, tragico.... olhe só, um novo piloto está se dirigindo ao labirinto, será que ele terá mais sorte?"
    setInterval(function(){window.location.replace(window.location.pathname + window.location.search + window.location.hash);window.reset()}, 8000)
}
function createLab(){
    for(let linha = 0; linha < map.length; linha++){
        let line = document.createElement("div")
        line.className = "linha"
        // line.style.position = "relative"
        arr = map[linha].split("")
        
        for(let unidade = 0; unidade < arr.length; unidade++){
            
            if(arr[unidade] === "W"){
                let parede = document.createElement("div")
                parede.className = "parede"
                parede.id = "parede"
                parede.style.position = "relative"
                line.appendChild(parede)
            }else if(arr[unidade] === " "){
                let vazio = document.createElement("div")
                vazio.className = "vazio"
                vazio.id = "vazio"
                line.appendChild(vazio)
            }else if(arr[unidade] === "F"){
                let end = document.createElement("div")
                end.className = "end"
                end.id = "end"
                end.style.position = "relative"
                line.appendChild(end)
            }else if(arr[unidade] === "S"){
                let start = document.createElement("div")
                start.className = "start"
                start.id = "start"
                start.classList.add("rigth")
                start.style.position = "relative"
                line.appendChild(start)
            } 
        }
        labirinto.appendChild(line)
        
    }
}
createLab()

function move(value){
    let object = document.getElementById("start")
    switch(value.keyCode) {
        case 37:
          boxTop += -object.offsetWidth
          object.classList.remove("top")
          object.classList.remove("rigth")
          object.classList.remove("bottom")
          object.classList.add("left")
          break;
        case 38:
          boxLeft += object.offsetWidth
          object.classList.remove("bottom")
          object.classList.remove("rigth")
          object.classList.remove("left")
          object.classList.add("top")
          break;
        case 39:
          boxTop += object.offsetWidth
          object.classList.remove("top")
          object.classList.remove("bottom")
          object.classList.remove("left")
          object.classList.add("rigth")
          break;
        case 40:
          boxLeft += -object.offsetWidth
          object.classList.remove("top")
          object.classList.remove("rigth")
          object.classList.remove("left")
          object.classList.add("bottom")
          break;
        default:
          console.log('not an arrow');
          break;
      }

    collide (boxTop, boxLeft)
    object.style.top =  boxTop + "px" 
    object.style.left =  boxLeft + "px" 
}
function collide(boxTop, boxLeft){
    let labirinto = document.querySelector(".labirinto")
    let walls = document.querySelectorAll(".parede")
    boxLeft += 225
    if(labirinto.offsetWidth === 480){
        boxLeft += 63
    }
    if(labirinto.offsetWidth === 750){
        boxLeft += 225
    }

    for (let i = 0; i < walls.length; i++){
        let wallTop = walls[i].offsetTop
        let wallLeft = walls[i].offsetLeft
        let wallWidth = walls[i].offsetWidth
        if (boxTop < wallTop + wallWidth &&
            (boxTop) + wallWidth > wallTop &&
            boxLeft < wallLeft + wallWidth &&
            wallWidth + boxLeft > wallLeft) {
                Lose()
        }else if(boxTop < 0){
            Loser()
        }else if(boxTop === 500 && boxLeft === 200 || boxTop === 640 && boxLeft === 256 || boxTop >= 1000){
            victory()
        }
    }    
}

document.addEventListener("keydown", move)



