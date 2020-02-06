var gamePattern = [];
var gameColors = ["red", "yellow", "green", "blue"];
var gameAudio = ["sounds/red.mp3", "sounds/yellow.mp3", "sounds/green.mp3", "sounds/blue.mp3", "sounds/wrong.mp3"]
var gamePlayAudio = [];
var chosenOne;
var userClickedPattern = [];
var level=0;
var disp;

var index=0;
var bool;

for (var i = 0; i < 5; i++) {
  gamePlayAudio[i] = new Audio(gameAudio[i]);
}

function nxt_seq() {


  level=level+1;
  $("h1").text("level "+level);
  var randomNumber;
  randomNumber = Math.floor(Math.random() * 4);
  chosenOne = gameColors[randomNumber];
  gamePattern.push(chosenOne);
  $("#" + chosenOne).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // var my = new Audio("sounds/"+chosenOne +".mp3");
  // my.play();
  gamePlayAudio[randomNumber].play();
}

var temp;
var clickAudio = new Audio("sounds/red.mp3");
$(".btn").on("click", function() {

  userClickedPattern.push(this.id);
  $(this).addClass("pressed");
  temp =this.id;
  setTimeout(function() {
      $("#"+temp).removeClass("pressed");
  }, 250);


  clickAudio.src = "sounds/" + this.id + ".mp3";
  clickAudio.play();
  index=index+1;
  if(index ===level)
  {
    bool=comparator()
    if(bool)
    {
      index=0;
      userClickedPattern=[];
      setTimeout(function(){nxt_seq();},1000);

    }
    else
    {
      gamePlayAudio[4].play();
      $("body").addClass("game-over");
      disp = level-1;
      $("h1").text("Wrong Answer!  Your score:"+disp);
      setTimeout(function() {
          $("body").removeClass("game-over");
          $("h1").text("Press Any Key To Play");
      }, 5000);
      level=0;
      index=0;
      userClickedPattern=[];
      gamePattern=[];

    }

  }


});
$("*").on("keydown",function(){
  if(level===0)
  {
    userClickedPattern=[];
    index=0;
      nxt_seq();
  }

});







function comparator()
{
  for (var i = 0; i < gamePattern.length; ++i) {
    if (gamePattern[i] !== userClickedPattern[i]) return false;
  }
  return true;
  }
