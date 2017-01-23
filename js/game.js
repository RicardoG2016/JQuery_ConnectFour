$(document).ready(function(){  
  var turnCount = 0;
  var gameResult = false;

  var button = [];
  for (var i = 1; i < 43; i++) {
    button[i] = document.getElementById('canvas'+i);
    button[i].bDisabled = false;
  }

  var ctx = [];
  for (var i = 1; i < 43; i++) ctx[i] = button[i].getContext("2d");

// player turn and initial start to game
  $( "canvas" ).on( "click", function(){
    var cell = (this);
    if( gameResult == false && cell.bDisabled == false && turnCount < 42){
      var num = cell.id.match(/\d/g).join("");
      var color = '#27ae61';
        button[num].player = 'x';
        cell.style.webkitTransform = "rotateY(180deg)";
        floatDown(button, num, color);    
      };
      checkWinner();
      if (gameResult == false && turnCount < 42){
        setTimeout(function(){
          computerTurn(button);  
        }, 500);
      };
  });

// draws the circle function
  function dCircle(button, num, color){
    if(button[num].bDisabled == false){
      button[num].bDisabled = true;
      $(button[num]).addClass('bDisabled');
      button[num].style.opacity = 0.7;
// delays drawing of circle below
    setTimeout(function(){
      ctx[num].beginPath();
      ctx[num].lineWidth = 5;
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

// Computer basic logic below
function computerTurn(button){
  var cpu = Math.floor(Math.random()*42);
  var color = '#c1392b';
  if(button[cpu].bDisabled == false){
    dCircle(button, cpu, color);
    button[cpu].player = 'y';
  } else if (button[cpu].bDisabled == false){
    dCircle(button, cpu, color);
    button[cpu].player = 'y';
  }
  else computerTurn(button);
};


function floatDown(button, num, color){
  var nextCell = num;

  while ( button[nextCell].bDisabled == false ){
    if(button[+nextCell + 7] != undefined){
       if(button[+nextCell + 7].bDisabled == true){
          dCircle(button, nextCell, color);
       } else (nextCell = +nextCell + 7);
    }
    else(dCircle(button, nextCell, color));
  };

};



// Winner function below will review possible solutions and check for a winner.
function checkWinner(){
  setTimeout(function(){
    if (gameResult == false){
      if(turnCount == 42) alert("Draw!!");
      if(button[1].player == 'x' && button[2].player == 'x' && button[3].player == 'x' && button[4].player == 'x'){
        gameResult = true;
        alert("You Win!");
      };  
    };
  }, 350);
};

});

