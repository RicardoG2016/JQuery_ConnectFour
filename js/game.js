$(document).ready(function(){
  var turnCount = 0;
  var button = [];
  for (var i = 1; i < 43; i++) button[i] = $('canvas') + (i);
  
  var ctx = [];
  for (var i = 1; i < 10; i++) ctx[i] = button[i].getContext('2d');

  var bDisabled = false;
  for (var i = 1; i < 43; i++) bDisabled[i] = false; 

  var gameResult = false;
  var content = [];

  function loop(x){
    if(bDisabled == false){
      bDisabled == true;
      button[x].style.opacity = 0.7;

      content[x] = 'x';
      turnCount ++;

    button[x].style.webkitTransform = "rotateY(180deg)"; 
    button[x].style.msTransform = "rotateY(180deg)"; 
    button[x].style.mozTransform = "rotateY(180deg)"; 
    button[x].style.oTransform = "rotateY(180deg)"; 

    setTimeout(fucntion(){

      ctx[x].beginPath();
      ctx[x].lineWidth = 2;
      ctx[x].arc(25,25,17,0,Math.PI*2,false);
      ctx[x]
    //   if (turnCount < 43 && gameResult == false) computerTurn();
    //     checkWinner();
    })
    // , 300};
  }





});

