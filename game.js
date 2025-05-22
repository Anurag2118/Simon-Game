var userClickedPattern=[];
var gamePattern=[];

var buttonColours=["red","blue","green","yellow"];

var level=0;
var started=false;

$(document).keypress(function(){
    if (!started){
        nextSequence();
        started=true;
    }
    
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);
    var randomNumber = Math.floor((Math.random()*3)) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    } 
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}