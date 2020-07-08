var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList =document.getElementById("score-list");

// sort scores highest to lowest and show on high scores screen
    highScores.sort(function (a, b){
        return b.value - a.value
    })

for(var i = 0; i < highScores.length; i++){
    var newLi = document.createElement('li');
    newLi.textContent = highScores[i].name + " - " + highScores[i].score;
    scoreList.appendChild(newLi);
}

//clear scoreboard
clearBtn.addEventListener("click", function(){
    localStorage.clear();
    history.back()
});

// restart quiz
restartBtn.addEventListener("click", function(){
    history.back()
})
