$(document).ready(function(){  
// game setup
  var turnCount = 0;
  var gameResult = false;
  var humanColor = '#27ae61';
  var computerColor = '#c1392b';
  var user = 'player';
  var playerScore = 0;
  var cpuScore = 0;
  var previous = 0;

// board arrays, content is used to decide winner, button provides data canvases and ctx gets 2d to draw.
  var content = [];
  for (var i = 0; i < 42; i++) content[i] = 'z';

  var button = [];
  for (var i = 1; i < 43; i++) {
    button[i] = document.getElementById('canvas'+i);
    button[i].bDisabled = false;
  }

  var ctx = [];
  for (var i = 1; i < 43; i++) ctx[i] = button[i].getContext("2d");

// helper functions
  function buttonId(cell) {return cell.id.match(/\d/g).join("")};

  function checkScore(playerScore, cpuScore){
    if(playerScore == 3){
      gameResult = true;
      alert("You Win!");
    }else if(cpuScore == 3){
      gameResult = true;
      alert("You Lose!");
    };
  };

// player turn and initial start to game
  $( "canvas" ).on( "click", function(){
  var cell = (this);
  if(gameResult == false && cell.bDisabled == false){
    var num = buttonId(cell);
    var color = humanColor;
    floatDown(button, num, color, user); 
    checkWinner();
  };

  if(gameResult == false && turnCount < 42){
    setTimeout(function(){
      computerTurn(button, computerColor);  
    }, 820);
  };
  checkWinner();
});

// Computer turn basic logic below
function computerTurn(button, computerColor){
  var activeButtons = $('canvas').not('.bDisabled');
  var ranIndex = Math.floor(Math.random()*activeButtons.length)
  var selection = activeButtons[ranIndex];
  var cpu = buttonId(selection);
  var color = computerColor;
  if(button[cpu].bDisabled == false) floatDown(button, cpu, color);
  else(computerTurn(computerColor));
};

// draws the circle function
function dCircle(button, num, color, user){
  if(button[num].bDisabled == false){
    button[num].bDisabled = true;
    $(button[num]).addClass('bDisabled');
    if(user == 'player'){
      $(button[num]).addClass('player'); 
      content[num-1] = 'x';
    }
    else{
      $(button[num]).addClass('cpu'); 
      content[num-1] = 'y'; 
    };

    button[num].style.webkitTransform = "rotateY(180deg)";
    button[num].style.opacity = 0.7;

// delays drawing of circle below
  setTimeout(function(){
    ctx[num].beginPath();
    ctx[num].lineWidth = 1;
    ctx[num].arc(25,25,17,0,Math.PI*2,false);
    ctx[num].fillStyle = color;
    ctx[num].fill();
    ctx[num].strokeStyle = color;
    ctx[num].stroke();
    ctx[num].closePath();  
    },300);
    turnCount ++; 
  };
};

// function placed dot on the lowest part of the board.
function floatDown(button, num, color, user){
  var currentBlock = num;
  while (button[currentBlock].bDisabled == false){
    var nextDown = +currentBlock + 7;  
    if(typeof button[nextDown] == "object"){
      if(button[nextDown].bDisabled == true) dCircle(button, currentBlock, color, user); 
       else (currentBlock = nextDown);
    }else(dCircle(button, currentBlock, color, user));
  };
};

// Winner function below will review possible solutions and check for a winner.
function checkWinner(){
  setTimeout(function(){
    if(gameResult == false){
      if(turnCount == 42){
        gameResult = true; 
        alert("Draw!!");
      };
    hTest(content);
    vTest(content);
    };
  }, 820);
};

//---------------------------- Tests------------------------
// vertical check
function vTest(content, playerScore, cpuScore, previous){
  for(col = 0; col < 7; col++){
    for(row = 0; row < 6; row++){
      index = col + (row * 7)

  function position(content, index, col) {
    this.col = col;
    this.val = content[index];  
  };

  var current = new position(content, index, col);
    if(current.val != 'z' && previous.val == 'x' && current.val == previous.val && current.col == previous.col){
      playerScore++;
    }else if(current.val != 'z' && previous.val == 'y' && current.val == previous.val && current.col == previous.col){
      cpuScore++;
    }else{
      var previous = new position(content, index, col);
      playerScore = 0;
      cpuScore = 0;
    };
  checkScore(playerScore, cpuScore);
  };
 };
}

// horizontal test
function hTest(content, playerScore, cpuScore, previous){
  for(p = 0; p < 42; p++){
    var current = content[p];
    if(current != 'z' && previous == 'x' && current == previous && row == Math.floor(p / 7)){
      playerScore++;
    }else if(current != 'z' && previous =='y' && current == previous && row == Math.floor(p / 7)){
      cpuScore++;
    }else{
      previous = current;
      row = Math.floor(p / 7);
      playerScore = 0;
      cpuScore = 0;
    };
    checkScore(playerScore, cpuScore);
  };
 };
});