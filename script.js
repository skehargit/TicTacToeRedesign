
let boxes=document.querySelectorAll('.box');
let xWinCnt=document.getElementById('xpc');
let oWinCnt=document.getElementById('opc');
let drawCnt=document.getElementById('dpc');
let player1=document.getElementById('player1');
let player2=document.getElementById('player2');
let slidBox=document.querySelector('.slideingdiv');
let playAgain=document.getElementById('playagain');
let newMatch=document.getElementById('newMatch');
let winPop=document.querySelector('.popup');
let winDisplay=document.querySelector('.winnerDisplay');

//winning logic for the game 
const winlgoic=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

// current player x/o and name
let curPlayer='x';
let xPlayerName='xplayer';
let oPlayerName='oplayer';

//starting player name
player2.style.display='none';
slidBox.style.left=0;

// game starting function
function newStart(){
    // string values of x,o and draw,
    xWinCnt.textContent=0;
    oWinCnt.textContent=0;
    drawCnt.textContent=0;
    winPop.classList.remove('active'); // if popup is visible make hidden
}
newStart();

// play again function 
function playAgainGame(){
    boxes.forEach(box=>{
        box.classList.remove('win'); // remove the winning green background from boxes if bg is visible
        box.textContent=""; // make all boxes empty
        box.style.pointerEvents = "all"; //to make pointer event working 
    });
}

// adding event listener to all boxes
boxes.forEach(box=>{
    box.addEventListener('click',()=>{
        if(box.textContent==''){
            box.textContent=curPlayer; // current player
            playerChange(); // player change
            checkWinner(); // checking winner in each click on box
        }
    })
});

// player change function 
function playerChange(){
    if(curPlayer=='x'){
        curPlayer='o';
        slidBox.style.left='50%';
        player1.style.display='none';
        player2.style.display='flex';
    }else{
        curPlayer='x';
        slidBox.style.left=0;
        player1.style.display='flex';
        player2.style.display='none';
    }
}

//popup function for  visible
function popupFun(draw){
    winPop.classList.add('active');
    if(draw)winDisplay.innerHTML=`<span>Draw</span>`;
    playAgain.addEventListener('click',()=>{
        playAgainGame();
        winPop.classList.remove('active');
    });
    newMatch.addEventListener('click',()=>location.reload()); // it will reload the game to make start match
}

//winner checking function
function checkWinner(){
    let winner=false; 
    // for each time we are checking is all 3 boxes are eual to the winning logic
    winlgoic.forEach((logic)=>{
        if(boxes[logic[0]].textContent!=''&&(boxes[logic[0]].textContent==boxes[logic[1]].textContent)&&(boxes[logic[2]].textContent==boxes[logic[0]].textContent)){

            if(boxes[logic[0]].textContent=='x'){// updateing value of x
                xWinCnt.textContent=Number(xWinCnt.textContent)+1; 
                winDisplay.innerHTML=`<span>'X' Winner name ${xPlayerName}</span>`;
                winner=true;
            }else{// updateing value of o
                oWinCnt.textContent=Number(oWinCnt.textContent)+1;
                winDisplay.innerHTML=`<span>'O' Winner name ${oPlayerName}</span>`;
                winner=true;
            }

            boxes.forEach(box=>box.style.pointerEvents = "none");
            boxes[logic[0]].classList.add('win');
            boxes[logic[1]].classList.add('win');
            boxes[logic[2]].classList.add('win');
            popupFun();
        }
        
    })
    
    let cnt=0;
    boxes.forEach(box=>{ // checking if all box are full  
        if(box.textContent!=''){
            cnt++;
        }
    })
    //if all boxes are full and  still no one wins
    if(cnt===9 && !winner){ // updateing value of draw
        drawCnt.textContent=Number(drawCnt.textContent)+1;
        popupFun('Draw');
    }
}

