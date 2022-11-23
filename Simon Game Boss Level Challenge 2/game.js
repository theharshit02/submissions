var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userChosenColor=[];
$(".container").hide();
var level = 0;
started = false;

function nextsequence(){

  $(".data").hide();
  $(".container").show();
  level++;
  $("#level-title").html("Level "+level);

  userChosenColor=[];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
}

$(".btn").on("click", function(){
  animatePress($(this).attr("id"));
  playSound($(this).attr("id"));
  $("#"+$(this).attr("id")).fadeOut(100).fadeIn(100);
  userChosenColor.push($(this).attr("id"));
  var index = userChosenColor.length-1;
  checkAnswer(index);
});




function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userChosenColor[currentLevel]) {
    if (userChosenColor.length === gamePattern.length){
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").html("Game Over, Press any key to restart");
    startover();
  }

}

function startover(){
  level=0;
  gamePattern=[];
  started = false;
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}



function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}


$(document).keypress(function(){
  if(!started){
    nextsequence();
    started = true;
  }
});

/*
$("button").on("click", function(){
  if(!started){
    nextsequence();
    started = true;
  }
});
*/
