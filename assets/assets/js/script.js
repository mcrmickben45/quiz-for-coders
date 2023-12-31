document.addEventListener('DOMContentLoaded', function () {

const questions = [{
        q: 'Commonly used data types DO NOT include:',
        a: '1. Strings',
        b: '2. Booleans',
        c: '3. Alerts',
        d: '4. Numbers',
        answer: '3. Alerts',
    },
    {
        q: 'The condition in an if / else statement is enclosed with ____',
        a: '1. Quotes',
        b: '2. Curly Brackets',
        c: '3. Parenthesis',
        d: '4. Square Brackets',
        answer: '3. Parenthesis',
    },
    {
        q: 'Arrays in JavaScript can be used to store ____.',
        a: '1. Numbers and Strings',
        b: '2. Other Arrays',
        c: '3. Booleans',
        d: '4. All of the Above',
        answer: '4. All of the Above',
    },    
    {
        q: 'String values must be enclosed within ____ when being assigned to variables',
        a: '1. Commas',
        b: '2. Curly Brackets',
        c: '3. Quotes',
        d: '4. Parenthesis',
        answer: '3. Quotes',
    },
    {
        q: 'A very useful tool used during development and debugging for prionting content to the debugger is:',
        a: '1. JavaScript',
        b: '2. Terminal/Bash',
        c: '3. For Loops',
        d: '4. console.log',
        answer: '4. console.log',
    },
];


var clickStart = document.getElementById("start");
var timerEl = document.getElementById("timer");
var timeRemaining = 60;
var questionContainer = document.querySelector("#quiz-container");

function timer () {
    timerEl.textContent = ' ' + timeRemaining + 's';
    quizDuration = setInterval(function() {
        if (timeRemaining > 0) { 
            adjustTime(-1);
        } else {
            endQuiz();
        }
    }, 1000);
}

function adjustTime(amount) {
    timeRemaining += amount;
    if (timeRemaining < 0) {
        timeRemaining = 0;
    }
    timerEl.textContent = ' ' + timeRemaining + 's';
}

clickStart.onclick = timer;
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    var answerE = document.createElement("button");
    answerE.textContent = question.e;
    answerE.addEventListener("click", answerClick);

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

var answerClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    // determine if answer is wrong or right
    var answerDetermination = document.querySelector("#answer-determination");
    if (userAnswer !== correctAnswer) {
        adjustTime(-10);
        answerDetermination.textContent = "Wrong!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
    questionContainer.innerHTML=" ";
    document.querySelector("#homepage").style.display = "none";
}
function highScores() {
    var data = localStorage.getItem('object');
    var getData = JSON.parse(data);
    var name = getData.name;
    var score = getData.score;
    questionContainer.innerHTML = '';
    questionContainer.innerHTML = name + ' ' + score;
};

function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = " ";
    questionContainer.innerHTML = name + " " + score;
}
clickHighScores.addEventListener('click', () =>
    { highScores ();
})

var initials = ''; 
function endQuizPage () {
    resetDisplay();
    timerEl.textContent = '';
    clearInterval(quizDuration);
    var endPage = document.createElement ('h2');
    questionContainer.appendChild(endPage);

    var blank = document.querySelector('answer-determination');
    blank.innerHTML = '';

    endPage.innerHTML = 'All done! Your final score is ' + 'userScore + .' + 'Enter your initials to save (max 3)';

    var initialBox = document.createElement('input');
    blank.appendChild(initialBox);

    var submitInitialBtn= document.createElement('button');
    submitInitialBtn.textContent= 'Submit';
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener('click', () =>
    { if (initialBox.value.length === 0) return false;
        var storeInitials = (input) =>
        {
            var data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem('object', data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement('button');
        playAgain.textContent = 'Play Again!'; 
        blank.appendChild(playAgain);

        playAgain.addEventListener('click', () =>
       {location.reload()
    })
    })

    document.querySelector('input').value = '';
    initialBox.addEventListener('submit', change);
};

clickStart.addEventListener('click', quiz); 
});

