//Declare an array with several objects.....
var questionsPack = [
    {
        question: "My first question?",
        choices: ["choice  A", "choice B", "choice C", "choice D"],
        answer: "choice B",
    },
    {
        question: "My second question?",
        choices: ["choice  A", "choice B", "choice C", "choice D"],
        answer: "choice B",
    },
    {
        question: "My third question?",
        choices: ["choice  A", "choice B", "choice C", "choice D"],
        answer: "choice B",
    },
    {
        question: "My fourth question?",
        choices: ["choice  A", "choice B", "choice C", "choice D"],
        answer: "choice B",
    },
    {
        question: "My fifth question?",
        choices: ["choice  A", "choice B", "choice C", "choice D"],
        answer: "choice B",
    },

];

/*  
-start button
-timer starts counting down
-1st question and its choices appear
-choice selected, then check for the correct answer (appear before the second question)
-2nd question and its choices appear
-choice selected, then check for the correct answer (appear before the second question)
- so on until the last question or the timer ===0
-show total score
-ask for initials and submit
-initials and highscore will be displayed with 'Go back' and 'clear highscore' options
- when 'Go back' gets clicked, prompts user to click the start button

*/

//Declare and initialize variables
var givenTime = 15;
var totalScore = 0;
var thisQuestion = 0;
// var multipleChoices = 0;
var checkAnswer;
var timer = document.getElementById("timer");
var startButton = document.getElementById("startBtn");
var stopCommand = document.getElementById("stop");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var CorrectAnswer = document.querySelector(".correct-answer");
var submitButton = document.getElementById("submitFinal");
var scorePEl = document.getElementById("score-paragraph");
var userInitials = document.querySelector('input[name="user-initials"]');
var initialAndHighscore = document.getElementById("initialAndScore");
var goBackButton = document.getElementById("goBackBtn");
var clearButton = document.getElementById("clearHighscore");





startButton.addEventListener("click", startTimer)
startButton.addEventListener("click", displayQuestions);

// var summary = document.getElementById("summary");
// summary.classList.add("hidden-div");
//use remove()

//i do same for highscore and initials

function startTimer() {
    var timeInterval = setInterval(function () {
        givenTime--;
        timer.textContent = "Time:" + givenTime;
        if (givenTime <= 0 || thisQuestion >= questionsPack.length) {
            clearInterval(timeInterval);
           
            submit();
        }

    }, 1000)

    displayQuestions();
   
    //use setTimeOut();
};




function displayQuestions() {

    questionEl.textContent = questionsPack[thisQuestion].question;
    choicesEl.innerHTML = "";

    for (var i = 0; i < questionsPack[thisQuestion].choices.length; i++) {
        var listOfChoices = document.createElement("li")
        listOfChoices.innerHTML = questionsPack[thisQuestion].choices[i];
        choicesEl.appendChild(listOfChoices);



        listOfChoices.addEventListener("click", function () {

            choicesEl.textContent = "";
            questionEl.textContent = ""
            thisQuestion++;
            checkAnswer = this.textContent;
            if (checkAnswer === questionsPack[thisQuestion].answer) {
                CorrectAnswer.textContent = "Correct";
                totalScore++;
            } else {
                CorrectAnswer.textContent = "Wrong";
                givenTime -= 5;
            }
            // if (checkAnswer !== questionsPack[thisQuestion].answer){
            //     var timeOut = setTimeout(function(){
            //         givenTime;

            //     }, 2000)
            //     clearTimeout(timeOut);
            // }




        })
    }

    choicesEl.querySelectorAll("li").forEach(function (li) {
        li.addEventListener("click", function () {
            for (var i = 0; i < questionsPack[thisQuestion].choices[i].length; i++) {
                questionEl.textContent = questionsPack[thisQuestion].question.choices[i];
                // choicesEl.textContent= questionsPack[thisQuestion].choices[i];


            }
        })
    });

    submit();
}

function submit() {
    questionEl.innerHTML = "";
    choicesEl.innerHTML = "";
    timer.textContent = "" ;

    initials.value = "";
    var allDone = document.getElementById("allDone");
    allDone.textContent = "All Done!";
    scorePEl.textContent = "Your final score: " + totalScore;
    initialAndHighscore.appendChild(scorePEl);

    var labelEl = document.querySelector("label");
    labelEl.textContent = UserInitials;
    submitButton.addEventListener("click", function () {
        localStorage.setItem("userInitials", JSON.stringify(userInitials.value))
        localStorage.setItem("userScore", JSON.stringify(totalScore))                   //is there any way to concatenate?
        initials.value = "";
        displayHighscore();
    })
}

function displayHighscore() {
    initialAndHighscore.textContent += localStorage.getItem("userScore") + "-" + localStorage.getItem("userInitials");
    //is there any way to concatenate?

    clearButton.addEventListener("click", function () {
        initialAndHighscore.textContent = "";
    })
    goBackButton.addEventListener("click", function () {

        ////////???????? i need to get back to the home page
        location.reload();
    })
}








