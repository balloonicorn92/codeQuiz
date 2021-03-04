
//variables that take care of time state
//variables that target divs ... a whole bunch 
//questions array
var questions = [
  {
    title: "Question #1: Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "Question #2: Which array method removes an item from an array?",
    choices: ["push()", "pop()", "last()", "remove()"],
    answer: "pop()"
  },
  {
    title: "Question #3: The ____ method creates a new array by merging existing arrays.",
    choices: ["concat()", "merge()", "join()", "splice()"],
    answer: "concat()"
  },
  {
    title: "Question #4: The ____ method can be used to add new items to an array.",
    choices: ["splice()", "split()", "concat()", "add()"],
    answer: "splice()"
  },
  {
    title: "Question #5: What is the difference between 'toString()' and 'join()' methods?",
    choices: ["'join()' let's you specify the seperator.", "They're the same.", "'toString()' let's you specify the seperator.", "They have no relation."],
    answer: "'join()' let's you specify the seperator."
  }
  ]
var questionIndex = 0;
var time = questions.length * 100;
var timerId;



var timerEl = document.querySelector(".timer");
var questionsEl = document.querySelector(".quiz-body");
var choicesEl = document.querySelector(".answers-body");
var StartBtnEl = document.querySelector(".start");
var endScreen = document.getElementById('end');
var nameInput = document.getElementById('name');

var timer = function() {
    time = time - 1;
    timerEl.textContent = time;
    if (time <= 0) {
        //alert('quiz is over');
        quizEndFunc();
    }
};
var startQuiz = function() {
    var startScreen = document.querySelector('.start-screen');
    startScreen.setAttribute("class","hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(timer, 1000);
    timerEl.textContent = time;
    questionsFunc();
};
var questionsFunc = function() {
    var currentQuestion = questions[questionIndex];
    var questionTitle = document.querySelector(".question-text")
    questionTitle.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";


    currentQuestion.choices.forEach(function(choice, index){
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class','choice');
        choiceBtn.setAttribute('value', choice);
        choiceBtn.textContent = index + 1 + '.' + ' ' + choice;
        //attach click event decides if question is right or wrong
        choiceBtn.onclick = answerCheckFunc;
        choicesEl.appendChild(choiceBtn);
    })

};
var answerCheckFunc = function() {
    if (this.value != questions[questionIndex].answer) {
        //time penalty - 5 seconds
        time = time - 5;
        timerEl.textContent = time; 
        this.classList.add("incorrect");
    } else {
      this.classList.add("correct");
    }
    questionIndex++; // this is the same as questionIdex++
    if (questionIndex === questions.length) {
      setTimeout(() => { quizEndFunc(); }, 1000);

    } else {
        setTimeout(() => { questionsFunc(); }, 1000);
    }
};
var quizEndFunc = function() {
    clearInterval(timerId);
    questionsEl.setAttribute("class","hide");
    endScreen.removeAttribute("class")
    nameInput.removeAttribute("class");
};
 var leaderboardFunc = function() {
    var name = nameInput.value.trim();
    if (name !== '') {
    var storedHighScores = JSON.parse(window.localStorage.getItem('highScoreArr'))||[];
    var score = {
      playerScore: time,
      playerName: name
    };
    storedHighScores.push(score);
    localStorage.setItem('highScoreArr', JSON.stringify(score));
    storedHighScores.forEach(function(score){
      var listItem = document.createElement('li');
      listItem.textContent = score.playerName + ": " + score.playerScore;
      var parentList = document.querySelector('.high-score');
      parentList.appendChild(listItem);
    })
  }
 };

var EnterFunc = function(event) {
    if (event.keyCode === 13){
      leaderboardFunc();
    }
}

StartBtnEl.onclick = startQuiz;
nameInput.onkeyup = EnterFunc;

//store time var inside locatstorage -- getitem to retrieve value and key into leaderboard
//link leaderboard href to end quiz function page somehow
//function to hide and unhide start screen .. starts timer .. shows 1st question
//function that creates question and button textcontent 
//figure out how to change variables when right or wrong answer is completed
//create eventlistener to check if answer is correct or incorrect
//quiz end function -- stops timer -- hide question screen and show end and -- out of 5 questions correct

