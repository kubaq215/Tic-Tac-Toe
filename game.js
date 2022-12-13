let tiles = document.querySelectorAll(".tile");
let restartBtn = document.getElementById('restart')

let xTurn = true;
let count = 0;

const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];

const disableButtons = () => {
    tiles.forEach((element) => {
        element.disabled = true;
        element.style.cursor = "default";
    });
}

const enableButtons = () => {
    tiles.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
        element.style.backgroundColor = "#ffffff";
        element.style.cursor = "pointer";
    })
}

const startBouncing = () => {
    restartBtn.classList.add("bounce");
}

const winFun = (combination) => {
    disableButtons();
    for(let i=0; i<3; i++) {
        tiles[combination[i]].style.backgroundColor = 'green';
    }  
    startBouncing(); 
}
const drawFun = () => {
    disableButtons();
    for(let i=0; i<9; i++) {
        tiles[i].style.backgroundColor = '#c90000';
    }   
    startBouncing();
}


restartBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
    restartBtn.classList.remove("bounce");
})

const winChecker = () => {
    for(let pattern of winningPattern) {
        let [el1, el2, el3] = [
            tiles[pattern[0]].innerText,
            tiles[pattern[1]].innerText,
            tiles[pattern[2]].innerText
        ];
        if(el1 != '' && el2 != '' && el3 != '') {
            if(el1 == el2 && el2 == el3) {
                winFun(pattern);
                return true;
            }
        }
    }
    return false;
}

tiles.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn) {
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
        }
        element.style.cursor = "default";
        count += 1;
        if(!winChecker() && count == 9) {
            drawFun();
        }
    })
})

window.onload = enableButtons();
