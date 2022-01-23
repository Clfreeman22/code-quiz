var question0 = {
    question: 'In the state of Georgia, its illegal to eat what with a fork?',
    answer0: '1. Ice Cream',
    answer1: '2. Fried Chicken',
    answer2: '3. Birthday Cake',
    answer3: '4. Potato Soup',
    correct: 1,
};
var question1 = {
    question: 'In public places in the state of Florida, what is illegal to do when wearing a swimsuit?',
    answer0: '1. Run',
    answer1: '2. Swim',
    answer2: '3. Sing',
    answer3: '4. all of the above',
    correct: 2, 
};
var question2 = {
    question: 'How long is New Zealands Ninety Mile Beach?',
    answer0: '1. 90 miles',
    answer1: '2. 55 miles',
    answer2: '3. 1 mile (during the 90s)',
    answer3: '4. 99 miles',
    correct: 1, 
};
var question3 = {
    question: 'What is measured in Mickeys',
    answer0: '1. Computer mouse speed',
    answer1: '2. Normal mouse speed',
    answer2: '3. Disney loyality points',
    answer3: '4. Trips to Disney World',
    correct: 0,
};
var question4 = {
    question: 'The correct answer to this question is false',
    answer0: '1. True',
    answer1: '2. False',
    answer2: '3. false',
    answer3: '4. There are 2 correct answers',
    correct: 2,
};

var allQuestions = [
    question0,
    question1,
    question2,
    question3,
    question4
];

var interval = null;
var questionNumber = 0;
var time = 0;
var maxTime = 60;
var score;
var initials = '';

function setDisplay(id, value) {
    var element = document.getElementById(id);
    element.style.display = value;
}

function setInnerHTML(id, value) {
    var element = document.getElementById(id);
    element.innerHTML = value;
}
  
function setOnClick(id, func) {
    var element = document.getElementById(id);
    element.onclick = func;
}

function setTime() {
    var text = `Time: ${time}`;
    setInnerHTML('timer', text);
  }
 
function countDown() {
    time = time - 1;
    if (time <= 0) {
      window.clearInterval(interval);
      time = 0;
      setTime();
      done();
    } else {
      setTime();
    }
}

function checkAnswer(answer) {
    var question = allQuestions[questionNumber];
    if (answer === question.correct) {
      gotItRight();
    } else {
      gotItWrong();
    }
}

function done() {
    score = time;
    setDisplay('quiz', 'none');
    setDisplay('done', 'block');
    window.clearInterval(interval);
}

function gotItRight() {
    setInnerHTML('quiz-response', 'Correct!');
    questionNumber += 1;
    if (questionNumber === allQuestions.length) {
      done();
    } else {
      nextQuestion();
    }
}
  
function gotItWrong() {
    time = time - 10;
    if (time < 0) {
      time = 0;
    }
    setInnerHTML('quiz-response', 'Wrong!');
}

function answer0() {
    checkAnswer(0);
}

function answer1() {
    checkAnswer(1);
}

function answer2() {
    checkAnswer(2);
}

function answer3() {
    checkAnswer(3);
}

function nextQuestion() {
    var question = allQuestions[questionNumber];

    setInnerHTML("quiz-question", question.question);
    setInnerHTML("answer-0", question.answer0);
    setInnerHTML("answer-1", question.answer1);
    setInnerHTML("answer-2", question.answer2);
    setInnerHTML("answer-3", question.answer3);
    setInnerHTML("quiz-response", "");

    setOnClick("answer-0", answer0);
    setOnClick("answer-1", answer1);
    setOnClick("answer-2", answer2);
    setOnClick("answer-3", answer3);
}

var startButtonClicked = function() {
    setDisplay('quiz', 'block');
    setDisplay('welcome-page', 'none');
    nextQuestion();
    time = maxTime;
    interval = window.setInterval(countDown, 1000);
};

function clearHighScore() {
    setAllScores([]);
    showHighScores();
}

function showWelcome() {
    setDisplay('welcome-page', 'block');
    setDisplay('quiz', 'none');
    setDisplay('done', 'none');
    setDisplay('scores', 'none');
}

function showHighScores() {
    setDisplay('welcome-page', 'none');
    setDisplay('quiz', 'none');
    setDisplay('done', 'none');
    setDisplay('scores', 'block');
    setOnClick('scores-back', showWelcome);
    setInnerHTML('scores-0', '&nbsp;');
    setInnerHTML('scores-1', '&nbsp;');
    setInnerHTML('scores-2', '&nbsp;');

    var scores = getAllScores();
    if (scores.length > 0) {
      var score0 = scores[0];
      var text0 = `1. ${score0.initials} - ${score0.score}`;
      setInnerHTML('scores-0', text0);
    }
    if (scores.length > 1) {
      var score1 = scores[1];
      var text1 = `2. ${score1.initials} - ${score1.score}`;
      setInnerHTML('scores-1', text1);
    }
    if (scores.length > 2) {
      var score2 = scores[2];
      var text2 = `3. ${score2.initials} - ${score2.score}`;
      setInnerHTML('scores-2', text2);
    }
}

function getAllScores() {
    var scores = window.localStorage.getItem('scores');
    if (scores === null) {
      scores = [];
    } else {
      scores = JSON.parse(scores);
    }
    return scores;
}

function setAllScores(scores) {
    var scoresString = JSON.stringify(scores);
    window.localStorage.setItem('scores', scoresString);
}

function getInitials() {
    var inputDiv = document.getElementById('done-input');
    initials = inputDiv.value;
    initials = initials.toUpperCase();
}

function updateHighScore() {
    var scores = getAllScores();
  
    var newScore = {
      initials: initials, 
      score: score,
    };

    scores.push(newScore);
  
    scores.sort((a, b) => (a.score < b.score) ? 1 : -1)
  
    while (scores.length > 3) {
      scores.pop();
    }
  
    setAllScores(scores);
    showHighScores();
}

function doneSubmit() {
    getInitials();
    if (initials.length === 0) {
      alert('Please enter your initials');
    } else {
      updateHighScore();
    }
}

setDisplay('welcome-page', 'block');
setDisplay('quiz', 'none');
setDisplay('done', 'none');
setDisplay('scores', 'none');

setOnClick('start-quiz', startButtonClicked);
setOnClick('high-scores', showHighScores);
setOnClick('submit-initials', doneSubmit);
setOnClick('scores-clear', clearHighScore);
