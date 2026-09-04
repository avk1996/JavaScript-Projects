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
        let randSelect = Math.floor(Math.random() * 9);
        let box = divs[randSelect]; 
        if(box.textContent === ''){
            box.textContent = mark;
            box.style.color = mark === 'X' ? 'green' : 'orange';
            box.textContent = mark
            box.style.fontSize = "4rem"
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
        let isWin = checkWin();
        if(isWin){
            setTimeout(() => {
                    resetBoard();
            }, 5000);
        }
    })
})

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';          // Clear the text out
        cell.style.color = '';            // Clear any hardcoded win or player colors
        cell.style.backgroundColor = ''; // Clear the winning background color
        cell.style.transform = '';       // Clear the scale pop-out effect
        cell.style.boxShadow = '';       // Clear the glowing shadow effects
        cell.style.borderColor = '';     // Clear custom winning border 
    });
    
    // Optional: Reset starting player back to 'X' for the next round
    currentPlayer = 'X'; 
}

function checkWin() {
    const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    for(let conditions of winConditions){
        let [a,b,c] = conditions;
        
        let valA = divs[a].textContent;
        let valB = divs[b].textContent;
        let valC = divs[c].textContent;

        if(valA !== '' && valA === valB && valB === valC){
            let wins = [a,b,c];
            for(let win of wins){
                divs[win].style.color = '#00f0ff';           // Pick your text color
                divs[win].style.backgroundColor = '#1e293b'; // Pick your background color

                // This lifts the winning cells slightly and smoothly animates them
                divs[win].style.transform = 'scale(1.05)';
                divs[win].style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                divs[win].style.zIndex = '10'; // Ensures the lifted box sits above borders
            }
            return true;
        }

    }
}