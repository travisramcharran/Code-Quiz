var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions
var questionanswers = document.getElementById("question-answers");
var currentIndex =  0;
var alert = document.getElementById("alert");
var score = 0;
var count = 75;
var info = document.getElementById("info");
var addScore = document.getElementById("add-score");
var submitResult = document.getElementById("sumbit-result")
var allScores = [];
var storageScore = JSON.parse(localStorage.getItem("userData"));
var questions = [
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal", "alerts", "console.log"],
        answer : "console.log"
    },
    {
        title: "The condition in an if/else statement is enclosed within:",
        choices: ["quotes", "curly brackets", "parentheses", "sqaure brackets"],
        answer: "parentheses"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Arrays in Javascript can be used to store:",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within --- when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
]
btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions = questions[currentIndex]
    console.log(nextQuestions.title)

        displayQuestion(nextQuestions)

        gametime()
}    
submitResult.addEventListener("click", function (){
    console.log("hey it worked!")
});
// set time


function gametime () {
    
    var timeinterval = setInterval(function(){
        timer.innerText = count
        count--
    }, 1000);
}


function scorePage(a, b){
    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "highscores.html";
}

function displayQuestion(question){
    titleitem.innerText = question.title
    question.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-primary btn-block text-left"
        button.innerText = element
        questionanswers.appendChild(button)
        button.addEventListener("click", displaynextQuestion)
    });
}

function displaynextQuestion(e){
    currentIndex++
    if(currentIndex < questions.length){
    correction(e.target.innerText == nextQuestions.answer)
    questionanswers.innerHTML=""
    if(currentIndex < questions.length){
        nextQuestions = questions[currentIndex]
        displayQuestion(nextQuestions)
    } else {
        currentIndex = 0
        displayQuestion(nextQuestions)
    }
    }else{
        console.log("endgame")
        endgame()
    }
}

function correction(response){

    if(response){
        alert.innerText = "Correct!!!"
        console.log("correct");
    } else {
        alert.innerText = "WRONG!!"
        count = count -5
        timer.innerHTML = count
        console.log("wrong");
    }
    setTimeout(function(){
        alert.innerText=""
    }, 1000)
}

function endgame (){
    btnStart.classList.add("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addScore.classList.remove("d-none")
}