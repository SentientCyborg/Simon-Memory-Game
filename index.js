var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;

//Main Game Code
$(document).on("keydown", function () {
    if (startGame == false) {
        startGame = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//Functions
function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function animateBlock(color) {
    $("#" + color)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
}

function animatePress(color) {
    var userColor = $("#" + color);
    userColor.addClass("pressed");
    setTimeout(function () {
        userColor.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            console.log("next");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("fail");
        gameOver();
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateBlock(randomChosenColor);
    playSound(randomChosenColor);
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press any key to restart.");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    startGame = false;
}
