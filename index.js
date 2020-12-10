var gamePattern = [];
var userClicked = [];
var start = false;
var level = 0;
var arr = ["green", "red", "yellow", "blue"];
var over=0;
$(document).on("keydown", function() {
  if (start == false) {
    newSequence();
    start = true;
  }
  if(over==1)
  {
    gamePattern=[];
    userClicked=[];
    level=0;
    start=false;
    over=0;
  //  $("h1").text("Press any key");
  }
});

function newSequence() {
  userClicked=[];
  level++;
  $("#level-title").html("Level " + level);

  var randomVar = (Math.floor(4 * Math.random()));
  var randomColor = arr[randomVar];
  gamePattern.push(randomColor);

  $("#" + randomColor).animate({
    opacity: 0.3
  }, 50).animate({
    opacity: 1
  });

  playSound(randomColor);
}

$(".btn").on("click", function(event) {

  var btnPressed = (event.target.id);
  userClicked.push(btnPressed);

  playSound(btnPressed);
  animatePress(btnPressed);

    checkAnswer(userClicked.length-1);
});

function playSound(e) {
  (new Audio("sounds/" + e + ".mp3")).play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel)
{
  if(userClicked[currentLevel]==gamePattern[currentLevel])
  {
if(gamePattern.length==userClicked.length)
{
setTimeout(
  function(){
    newSequence();
  }, 1000);
}
}
else
{
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 1000);
  $("h1").text("Game Over! Press any key to restart");
  over = 1;
}
}
