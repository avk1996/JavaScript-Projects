const cells = document.querySelectorAll(".pos");

const divs = [
    document.querySelector(".pos1"),
    document.querySelector(".pos2"),
    document.querySelector(".pos3"),
    document.querySelector(".pos4"),
    document.querySelector(".pos5"),
    document.querySelector(".pos6"),
    document.querySelector(".pos7"),
    document.querySelector(".pos8"),
    document.querySelector(".pos9"),
];

function divsTask(mark) {
    for(let i=0;i<9;i++){
        console.log("Trial: "+i);
        let randSelect = Math.floor(Math.random() * 9);
        console.log("Random: "+randSelect)
        let htmlElement = divs[randSelect]; 
        if(htmlElement.textContent === ''){
            htmlElement.textContent = mark;
            htmlElement.style.color = mark === 'X' ? 'green' : 'orange';
            htmlElement.textContent = mark
            htmlElement.style.fontSize = "4rem"
            break;
        }
    }
}

let currentPlayer = 'X';

cells.forEach(cell => {
        cell.addEventListener('click', function () {
            if(this.textContent === ''){
                this.currentPlayer = currentPlayer
                let nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
                divsTask(nextPlayer)
                this.style.color = currentPlayer === 'X' ? 'green' : 'orange';
                this.textContent = currentPlayer
                this.style.fontSize = "4rem"
            }
        })
    }
)