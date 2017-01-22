$(document).ready(function(){  
  var turnCount = 0;
  var gameResult = false;
  var content = [];

  var button = [];
  for (var i = 1; i < 43; i++) button[i] = document.getElementById('canvas'+i);

  var ctx = [];
  for (var i = 1; i < 43; i++) ctx[i] = button[i].getContext("2d");

// player turn and initial start to game
  $( "canvas" ).on( "click", function(){
    var cell = (this);
    var num = cell.id.match(/\d/g).join("");
    var color = 'green';
    if ($(cell).not('.bDisabled')){
      // ($(cell).addClass('bDisabled'))
      content[num] = 'x';
      cell.style.webkitTransform = "rotateY(180deg)";
      dCircle(button, num, color);    
    }
    // checkWinner();
    if (gameResult == false && turnCount < 42){
      computerTurn(button);
    };
  });

// draws the circle function
  function dCircle(button, num, color){
    turnCount ++;
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
    },300); 
  };

// Computer basic logic below
function computerTurn(button){
  content[cpu] = 'y';
  var cpu = Math.floor(Math.random()*42);
  var color = 'red';
  if ($('button[cpu]').not('.bDisabled')){
    dCircle(button, cpu, color);
  }
  else computerTurn(button);
};

// function checkWinner(){
//   console.log( ($('canvas').filter('.bDisabled')) );
// };


// closes doc ready below
});

