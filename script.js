var startBtn = document.getElementById("startBtn");
var timerElement = document.getElementById("timer");
var submitBtn = document.querySelector("button.submitBtn");
var userScore = document.getElementById("user-score");
var timeRemaining = (questions.length * 15 + 1)
var userNameInput;
var questionText = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var submitScore = document.getElementById("submit")

var questionNumber = 0;
var answer;
document.getElementById("submit").classList.add("d-none");
function startTimer(){
    // change from main page to questions
    document.getElementById("home").classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");
    
    

    setTimer();

    makeQuestion();
}

startBtn.addEventListener("click", startTimer);

function setTimer(){
    var countdown = setInterval(function(){
        timeRemaining--;
        timerElement.textContent = "Time: " + timeRemaining;

        if (timeRemaining === 0 || questionNumber === questions.length){
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestion(){
    questionNumber++;
    answer = questions[questionNumber].answer;

    questionText.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for(var i = 0; i < choices.length; i++){
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[i];
        answerBtn = answerChoices.appendChild(nextChoice);

        
    }
}

// create new scores 
function addScore(){
    userNameInput = document.getElementById("userName").value

    var newScore = {
        name: userNameInput,
        score: timeRemaining
    };
    // store scores in local storage 
        var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
        highScores.push(newScore)
        localStorage.setItem("highScores", JSON.stringify(highScores));
}

//show score
function displayScore(){
    document.getElementById("quiz").classList.add("d-none");
    document.getElementById("submit").classList.remove("d-none");
    userScore.textContent = "Final Score: " + timeRemaining + ".";
    
}


// save score to high scores page
submitBtn.addEventListener("click", function(event){
    event.stopPropagation();
    addScore();
    window.location.href = "./highscores.html"
});

// Display whether answer was correct or incorrect 
function hideResponse(){
    var parent = document.getElementsByClassName("response")[0]
    parent.style.display = "none";
}

function showResponse(){
    var parent = document.getElementsByClassName("response")[0]
    parent.removeAttribute("style");
}

// User chooses answer 
answerChoices.addEventListener("click", function (event){
    var parent = document.getElementsByClassName("response")[0]

    if (answer === event.target.textContent){
        parent.innerHTML = "Correct!";
        setTimeout(hideResponse, 1250);
        showResponse();

    } else {
        parent.innerHTML = "Incorrect!";
        setTimeout(hideResponse, 1250);
        timeRemaining = timeRemaining - 15;
        showResponse();
    }
    makeQuestion();
})









 