// const WINNING_CONDITIONS = [
//     ["00" , "01" , "02"],
//     ["10" , "11" , "12"],
//     ["20" , "21" , "22"],
//     ["00" , "10" , "20"],
//     ["01" , "11" , "21"],
//     ["02" , "12" , "22"],
//     ["00" , "11" , "22"],
//     ["02" , "11" , "20"],
//  ];

// const PLAYER_TURNS = {
//     PLAYER_1 : "X",
//     PLAYER_2 : "O"
// }


// function checkGameResult(gameState, WINNING_CONDITIONS){
//     const [X_position, Y_positon] = gameState.reduce
// }

// const gameState = {
//     board : [
//         ["" , "" , ""],
//         ["" , "" , ""],
//         ["" , "" , ""],
//     ],
//     turn : null,
//     changeTurn(){
//         this.turn = this.turn === PLAYER_TURNS.PLAYER_1 ? PLAYER_TURNS.PLAYER_2 : PLAYER_TURNS.PLAYER_1
//     },
//     makeStep(position){//12
//         const [x , y] = position;
//         this.board[x][y] = this.turn;
//         console.log(this.board[x][y])
//     },
//     selectPlayer(player){
//         this.turn = player
//     }
// }

// const x_button = document.getElementById(PLAYER_TURNS.PLAYER_1);
// const o_button = document.getElementById(PLAYER_TURNS.PLAYER_2);

// function drawBoard(board){
//     const boardContainer = document.getElementById("board");
//     boardContainer.innerHTML  = null;
//     for(let i = 0 ; i < board.length ; i++){
//         for(let j = 0 ; j < board[i].length ; j++){
//             const field = document.createElement("div");
//             field.classList.add("field");
//             field.innerText = board[i][j];
//             field.dataset.position = `${i}${j}`;
//             boardContainer.append(field); 
//         }
//     }
// }

// function selectPlayerAndDrawBoard(selectedPlayer){
//     gameState.selectPlayer(selectedPlayer);
//     const container = document.querySelector(".select-player-container");
//     container.remove();
//     const boardContainer = document.createElement("div");
//     boardContainer.classList.add("board");
//     boardContainer.id = "board";
//     boardContainer.addEventListener("click" , handleBoardClick);
//     for(let i = 0 ; i < 3 ; i++){
//         for(let j = 0 ; j < 3 ; j++){
//             const field = document.createElement("div");
//             field.classList.add("field");
//             field.dataset.position =`${i}${j}`
//             boardContainer.append(field);
//         }
//     }
//     document.body.append(boardContainer)
// }

// // function isWin(){
// //     if(gameState.board[x][y]){
// //         return
// //     } else {
// //         console.log(gameState.board[x][y]);
// //     }
// // }

// // console.log(gameState.board[i])


// function handleBoardClick(event){
//     // debugger
//     const [x , y] = event.target.dataset.position;
//     if(gameState.board[x][y]){
//         return;
//     }
//     // gameState.makeStep()
//     gameState.board[x][y] = gameState.turn;
//     // isWin();
//     gameState.changeTurn();
//     drawBoard(gameState.board);
// }

// x_button.addEventListener("click" , () => selectPlayerAndDrawBoard(PLAYER_TURNS.PLAYER_1));
// o_button.addEventListener("click" , () => selectPlayerAndDrawBoard(PLAYER_TURNS.PLAYER_2));


// https://todomvc.com/examples/vanillajs/#/


const selectPlayerContainer = document.querySelector(".select-player-container");

const WINNING_CONDITIONS = [
    ["00" , "01" , "02"],
    ["10" , "11" , "12"],
    ["20" , "21" , "22"],
    ["00" , "10" , "20"],
    ["01" , "11" , "21"],
    ["02" , "12" , "22"],
    ["00" , "11" , "22"],
    ["02" , "11" , "20"],
 ];

const PLAYER_TURNS = {
    PLAYER_1 : "X",
    PLAYER_2 : "O"
}

function checkGameResult(gameState , winningConditions){
    // debugger
    const x_positions = [];
    const o_positions = [];
    gameState.forEach((row , rowIndex) => {
        row.forEach((column , columnIndex) => {
            if(column === PLAYER_TURNS.PLAYER_1){
                x_positions.push(`${rowIndex}${columnIndex}`)
            }
            if(column === PLAYER_TURNS.PLAYER_2){
                o_positions.push(`${rowIndex}${columnIndex}`)
            }
        })
    }) 
    const filledColumnsCount = x_positions.length + o_positions.length;
    for (let i = 0 ; i < winningConditions.length ; i++){
        let matchedXElementsCount = 0;
        let matchedOElementsCount = 0 ;
        for(let j = 0 ; j < winningConditions[i].length ; j++){
            if(x_positions.includes(winningConditions[i][j])){
                matchedXElementsCount++
            }
            if(o_positions.includes(winningConditions[i][j])){
                matchedOElementsCount++
            }
        }
        if(matchedXElementsCount === 3){
             alert("x wins");
            restartGame();
            return;
        }
        if(matchedOElementsCount === 3){
            alert("o wins")
            restartGame()
            return ;
        }
    }
    if(filledColumnsCount === 9){
        alert("Drow");
        restartGame();
        return;
    }
}

function resetGameState(){
    gameState.board = [
        ['' , '' , ''],
        ['' , '' , ''],
        ['' , '' , ''],
    ]
}

function restartGame(){
    resetGameState();
    document.body.innerHTML = null;
    document.body.append(selectPlayerContainer);
    gameState.turn = null;
}

function getInitialBoard(){
//     // debugger
//     if(localStorage.getItem("board")){
//         const board = JSON.parse(localStorage.getItem("board"));
//         return board;
//     }
    return [
        ["" , "" , ""],
        ["" , "" , ""],
        ["" , "" , ""],
    ]
}

const gameState = {
    board : getInitialBoard(),
    turn : null,
    changeTurn(){
        this.turn = this.turn === PLAYER_TURNS.PLAYER_1 ? PLAYER_TURNS.PLAYER_2 : PLAYER_TURNS.PLAYER_1
    },
    makeStep(position){
        const [x , y] = position;
        this.board[x][y] = this.turn;
    },
    selectPlayer(player){
        this.turn = player
    }
}

const x_button = document.getElementById(PLAYER_TURNS.PLAYER_1);
const o_button = document.getElementById(PLAYER_TURNS.PLAYER_2);

function drawBoard(board){
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML  = null;
    for(let i = 0 ; i < board.length ; i++){
        for(let j = 0 ; j < board[i].length ; j++){
            const field = document.createElement("div");
            field.classList.add("field");
            field.innerText = board[i][j];
            field.dataset.position = `${i}${j}`
            boardContainer.append(field); 
        }
    }
}

function selectPlayerAndDrawBoard(selectedPlayer){
    gameState.selectPlayer(selectedPlayer);
    selectPlayerContainer.remove();
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board");
    boardContainer.id = "board";
    boardContainer.addEventListener("click" , handleBoardClick);
    for(let i = 0 ; i < 3 ; i++){
        for(let j = 0 ; j < 3 ; j++){
            const field = document.createElement("div");
            field.classList.add("field");
            field.dataset.position = `${i}${j}`;
            field.innerText = gameState.board[i][j];
            boardContainer.append(field);
        }
    }
    document.body.append(boardContainer)
}

function handleBoardClick(event){
    debugger
    const [x , y] = event.target.dataset.position;
    if(gameState.board[x][y]){
        return;
    }
    gameState.board[x][y] = gameState.turn;
    gameState.changeTurn();
    drawBoard(gameState.board);
    // localStorage.setItem("board" , JSON.stringify(gameState.board))
    checkGameResult(gameState.board , WINNING_CONDITIONS);
}

x_button.addEventListener("click" , () => selectPlayerAndDrawBoard(PLAYER_TURNS.PLAYER_1));
o_button.addEventListener("click" , () => selectPlayerAndDrawBoard(PLAYER_TURNS.PLAYER_2));

