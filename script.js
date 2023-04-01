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
var quizDivEl = document.getElementById("quiz-div");
var instructionDivEl = document.getElementById("instruction-div")
var timer = document.getElementById("timer");
var startButton = document.getElementById("startBtn");
// var stopCommand = document.getElementById("stop");
var questionEl = document.getElementById("question");
var choicesOlEl = document.getElementById("choices");
var CorrectAnswer = document.querySelector("#correct-answer");
var summaryDivEl = document.getElementById("summary");
var scoreDivEl = document.getElementById("highscore");
var submitButton = document.getElementById("submitFinal");
var scorePEl = document.getElementById("score-paragraph");
var userInitials = document.querySelector('input[name="user-initials"]');
var initialAndHighscore = document.getElementById("initialAndScore");
var goBackButton = document.getElementById("goBackBtn");
var clearButton = document.getElementById("clearHighscore");





startButton.addEventListener("click", startTimer)
startButton.addEventListener("click", displayQuestions);

//create elements, rather than using the html, for the "#summary" and "#highscore" to appear only whenever get called one after the other 

//Create class and style the border of the div
quizDivEl.classList.add("hide-div");
quizDivEl.setAttribute("style", "border-bottom-style: solid");

//Create an anchor element for multiple choices and style them
var listOfChoices;
// var choiceWrapButton = document.createElement("button");
listOfChoices.setAttribute("style", "border:solid; background-color:purple")



function startTimer() {
    var timeInterval = setInterval(function () {
        givenTime--;
        timer.textContent = "Time:" + givenTime;
        // instructionDivEl.classList.add("newInstruction-div");
        // instructionDivEl.remove();


        if (givenTime <= 0 || thisQuestion >= questionsPack.length) {
            clearInterval(timeInterval);
            // timer.textContent ="";
            // questionEl.textContent = "";
            // choicesOlEl.innerHTML = "";
            // startButton.classList.add("hide-btn");

            quizDivEl.remove();
            timer.remove();
            // startButton.remove();

            submit();
        }

    }, 1000)

    displayQuestions();

    //use setTimeOut();
};




function displayQuestions() {

    questionEl.textContent = questionsPack[thisQuestion].question;
    choicesOlEl.innerHTML = "";

    for (var i = 0; i < questionsPack[thisQuestion].choices.length; i++) {
        listOfChoices = document.createElement("li")

        listOfChoices.innerHTML = questionsPack[thisQuestion].choices[i];
        choicesOlEl.appendChild(listOfChoices);
        // choicesOlEl.appendChild(choiceWrapButton);


        listOfChoices.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248);; width: fit-content; font-weight: bold; padding: 1%; margin: 1%; border-radius: 10%")
        listOfChoices.addEventListener("click", function () {

            choicesOlEl.textContent = "";
            questionEl.textContent = ""
            thisQuestion++;
            var checkAnswer = this.textContent;
            if (checkAnswer === questionsPack[thisQuestion].answer) {
                CorrectAnswer.textContent = "Correct";
                totalScore++;
            } else {
                CorrectAnswer.textContent = "Wrong";
                givenTime -= 5;
            }
            if (checkAnswer !== questionsPack[thisQuestion].answer && givenTime >=6) {
                var timeOut = setTimeout(function () {
                    givenTime;

                }, 2000)
                clearTimeout(timeOut);
            }




        })
    }


}




function submit() {
    // questionEl.innerHTML = "";
    // choicesOlEl.innerHTML = "";
    // timer.textContent = "";

    userInitials.value = "";
    var allDonePEl = document.getElementById("allDone");
    allDonePEl.textContent = "All Done!";
    // scorePEl.textContent = 
    // initialAndHighscore.appendChild(scorePEl);

    // var labelEl = document.querySelector("label");
var labelEl =document.createElement("label");
    labelEl.textContent = "Your final score: " + totalScore;
    scorePEl.appendChild(labelEl);

   

    submitButton.addEventListener("click", function () {
        localStorage.setItem("userInitials", JSON.stringify(userInitials.value))
        localStorage.setItem("userScore", JSON.stringify(totalScore))                   //is there any way to concatenate?
        userInitials.value = "";
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








