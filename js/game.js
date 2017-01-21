$(document).ready(function(){  
  var turnCount = 0;

  // var bDisabled = false;
  // for (var i = 1; i < 43; i++) bDisabled[i] = false;

  var gameResult = false;
  var content = [];
  var num

  var button = [];
  for (var i = 1; i < 43; i++) button[i] = document.getElementById('canvas'+i);

  var ctx = [];
  for (var i = 1; i < 43; i++) ctx[i] = button[i].getContext("2d");

  $( "canvas" ).on( "click", function(){
    var cell = (this);
    var num = cell.id.match(/\d/g).join("");
    var color = 'green';
    Dcircle(cell, num, color);
    console.log(num);
  });

// draws the circle
  function Dcircle(cell, num, color){
    console.log(num);
    ctx[num] = cell.getContext('2d');
    ctx[num].beginPath();
    ctx[num].lineWidth = 5;
    ctx[num].arc(25,25,17,0,Math.PI*2,false);
    ctx[num].fillStyle = color;
    ctx[num].fill();
    ctx[num].strokeStyle = color;
    ctx[num].stroke();
    ctx[num].closePath();
    cell.style.opacity = 0.7;
  };





    // function loop(x){
    // if(bDisabled == false){
    //   console.log('works');
    //   bDisabled == true;
    //   button[x].style.opacity = 0.7;

    //   content[x] = 'x';
    //   turnCount ++;

    // button[x].style.webkitTransform = "rotateY(180deg)"; 
    // button[x].style.msTransform = "rotateY(180deg)"; 
    // button[x].style.mozTransform = "rotateY(180deg)"; 
    // button[x].style.oTransform = "rotateY(180deg)"; 

    //   ctx[x].beginPath();
    //   ctx[x].lineWidth = 2;
    //   ctx[x].arc(25,25,17,0,Math.PI*2,false);
    //   ctx[x].stroke();
    //   ctx[x].closePath();
  //   };
  // };
});

