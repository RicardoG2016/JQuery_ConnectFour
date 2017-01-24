$(document).ready(function(){  
  // game setup
  var turnCount = 0;
  var gameResult = false;
  var humanColor = '#27ae61';
  var computerColor = '#c1392b';
  var user = 'player';

// game tools
  var button = [];
  for (var i = 1; i < 43; i++) {
    button[i] = document.getElementById('canvas'+i);
    button[i].bDisabled = false;
  }

  var ctx = [];
  for (var i = 1; i < 43; i++) ctx[i] = button[i].getContext("2d");

// helper functions
  function buttonId(cell){
    return cell.id.match(/\d/g).join("");
  }

// player turn and initial start to game
  $( "canvas" ).on( "click", function(){
  var cell = (this);
  if( gameResult == false && cell.bDisabled == false){
    var num = buttonId(cell);
    var color = humanColor;
    floatDown(button, num, color, user);    
  };

  if (gameResult == false && turnCount < 42){
    setTimeout(function(){
      computerTurn(button, computerColor);  
    }, 370);
  };
});

// draws the circle function
function dCircle(button, num, color, user){
  if(button[num].bDisabled == false){
    button[num].bDisabled = true;
    $(button[num]).addClass('bDisabled');
    if(user == 'player') $(button[num]).addClass('player'); 
    else($(button[num]).addClass('cpu'));

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
    },350);
    turnCount ++; 
  };
};

// Computer turn basic logic below
function computerTurn(button, computerColor){
  var activeButtons = $('canvas').not('.bDisabled');
  var ranIndex = Math.floor(Math.random()*activeButtons.length)
  var selection = activeButtons[ranIndex];
  var cpu = buttonId(selection);
  
  var color = computerColor;
  if(button[cpu].bDisabled == false){
    floatDown(button, cpu, color);
  }else(computerTurn(computerColor));
};

// function placed dot on the lowest part of the board.
function floatDown(button, num, color, user){
  var nextCell = num;
  while ( button[nextCell].bDisabled == false ){
    if(typeof button[+nextCell + 7] == "object"){
      if(button[+nextCell + 7].bDisabled == true) dCircle(button, nextCell, color, user); 
       else (nextCell = +nextCell + 7);
    }else(dCircle(button, nextCell, color, user));
  };
  if(turnCount >6) checkWinner();
};


// Winner function below will review possible solutions and check for a winner.
function checkWinner(){

  setTimeout(function(){
    if(gameResult == false){
      if(turnCount == 42){
        gameResult = true; 
        alert("Draw!!");
      };
        
    var player = $('canvas').filter('.player');
    var cpu = $('canvas').filter('.cpu');

// horizontal check
  for(p = 0; p < player.length; p++){
    var pass = 0;
    for(r = 1; r < 4 ; r++)

    if($(player[p]).hasClass('edge') || $(player[p + 1]).hasClass('edge') || $(player[p + 2]).hasClass('edge')){
      pass = 0; 
    } 
    else if(player[p].id.match(/\d/g).join("") - player[r].id.match(/\d/g).join("") == -r){
       pass ++;
       if(pass == 3){
        alert('You Won!!');
        gameResult = true;
       };
    }
    else{ 
       pass = 0;
    };
  };

  var container = [];
  var vertPass = 0


// vertical check

    //   for(p = 0; p < player.length; p++)
    //   {
    //     container[p] = player[p].id.match(/\d/g).join("")
    //   };


    // for(vertNum = 0; vertNum < player.length; vertNum++){
    //   var number = 1;
    //   var column = number;
    //   var nextR = -column * 7
    //   console.log(container)
    //   console.log("---------------")
    //   console.log(container[vertNum]);
    //   console.log(container[column]);
    //   console.log(nextR);
    // if(container[vertNum] - container[column] == nextR){
    //   number++
    //   console.log('passed');
    //   vertPass++
    //   console.log("vert:" + vertPass)
    // };
    //   if(vertPass == 3){
    //     alert("You Win!!")
    //   };

    // }
    };
  }, 500);
};






});

