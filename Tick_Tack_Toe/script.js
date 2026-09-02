const cells = document.querySelectorAll(".pos");

let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', function () {
        if(this.textContent === ''){
            this.currentPlayer = currentPlayer
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            this.style.color = currentPlayer === 'X' ? 'green' : 'orange';
            this.textContent = currentPlayer
            this.style.fontSize = "3.5rem"
        }
    })
})