//Declare an array with objects
var questionsPack = [
    {
        question: "Javascript is an _____ language?",
        choices: ["Object-oriented", "Procedural", "Object-based", "All"],
        answer: "Object-oriented",
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert()", "All"],
        answer: "All",
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

//Declare and initialize variables
var givenTime = 30;
var totalScore = 0;
var thisQuestion = 0;
var timeInterval;
var topLevelDiv = document.getElementById("topLevel")
var quizDivEl = document.getElementById("quiz-div");
var instructionDivEl = document.getElementById("instruction-div")
var viewScoreBtn = document.getElementById("viewScore")
var timer = document.getElementById("timer");
var startButton = document.getElementById("startBtn");
var questionEl = document.getElementById("question");
var choicesOlEl = document.getElementById("choices");
var correctAnswer = document.querySelector("#correct-answer");
var summaryDivEl = document.getElementById("summary");
var scoreDivEl = document.getElementById("highscore");
var submitButton = document.getElementById("submitFinal");
var scorePEl = document.getElementById("score-paragraph");
var userInitials = document.querySelector('input[name="user-initials"]');

//Add the event listener to the start button
startButton.addEventListener("click", startTimer)

//Start the quiz
function startTimer() {
    timeInterval = setInterval(function () {
        givenTime--;
        timer.textContent = "Time:" + givenTime;
        if (givenTime <= 0) {
            clearInterval(timeInterval);
            quizDivEl.remove();
            timer.remove();
            submit();
        }
    }, 1000)
    instructionDivEl.remove()
    displayQuestions()
};

//Determine whether the quiz should proceed or stop 
function nextOrStop() {
    if (thisQuestion >= questionsPack.length || givenTime <= 0) {
        clearInterval(timeInterval);
        quizDivEl.remove();
        timer.remove()
        submit();
    } else {
        displayQuestions()
    }
}
//Execute questions in order
function displayQuestions() {

    choicesOlEl.innerHTML = "";
    questionEl.textContent = questionsPack[thisQuestion].question;
    
    //Display questions 
    for (var i = 0; i < questionsPack[thisQuestion].choices.length; i++) {
        //Creates elements for the multiple choice and its wrapper button
        var listOfChoices = document.createElement("li");
        var buttonWrapChoice = document.createElement("button");
        buttonWrapChoice.textContent = questionsPack[thisQuestion].choices[i];
        listOfChoices.appendChild(buttonWrapChoice);
        choicesOlEl.appendChild(listOfChoices);
        
        //Style the questions and multiple choices
        correctAnswer.setAttribute("style", "border-top: solid; margin-top:2%")
        buttonWrapChoice.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248); width: fit-content; font-weight: bold; font-size:small; padding: 1%; margin: 1%; border-radius: 10%");
        questionEl.setAttribute("style", "font-weight: bold; font-size: 1rem");

        //Add on mouseover event listener to the multiple choices' buttons on     // looks unprofessional,  i think
        buttonWrapChoice.addEventListener("mouseover", function () {
            this.setAttribute("style", "background-color: rgb(198, 240, 121); font-size: bold")
        })
        //Set the attributes back to the original
        buttonWrapChoice.addEventListener("mouseout", function () {
            this.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248)")
        })
        //add event listener
        buttonWrapChoice.addEventListener("click", function () {

            var checkAnswer = this.textContent;
            if (checkAnswer === questionsPack[thisQuestion].answer) {
                correctAnswer.textContent = "Correct";
                totalScore++;
            } else {
                correctAnswer.textContent = "Wrong";
                givenTime -= 5;
            }
            thisQuestion++;
            nextOrStop();
        })

    }

}


function submit() {

    summaryDivEl.setAttribute("style", "display: block; margin-left: 35%");
    var allDonePEl = document.getElementById("allDone");
    allDonePEl.textContent = "All Done!";

    summaryDivEl.classList.add("summary-submit");             //to manipulate its with css

    scorePEl.textContent = "Your Score is: " + totalScore;


    // Validate input and store user's initials and total score values
    submitButton.addEventListener("click", function () {
        if (userInitials.value === "" || !/^[a-zA-Z]+$/.test(userInitials.value)) {
            alert("Please enter only letter characters for your initials.")
        } else {
            localStorage.setItem("userInitials", JSON.stringify(userInitials.value))
            localStorage.setItem("userScore", JSON.stringify(totalScore))        //is there any way to concatenate?
            summaryDivEl.remove();
            displayHighscore(); /////////////////////////////////////////////
        }

    })
}
//Display user's initials and score, and reload the page
function displayHighscore() {

    var initialAndHighscore = document.createElement("p");

    initialAndHighscore.textContent += localStorage.getItem("userScore") + "-" + localStorage.getItem("userInitials");
    initialAndHighscore.textContent = "1." + userInitials.value + ": " + totalScore;  //seems unprofessional to put the list of number manually, any other way?  totalScore not increment
    scoreDivEl.appendChild(initialAndHighscore);


    //Add event listener to the 'view highscore' button appended on the top of the page to display the total score after
    var viewScoreTopEl = document.createElement("p");
    viewScoreBtn.addEventListener("click", function () {
        viewScoreTopEl.textContent = totalScore;
        topLevelDiv.appendChild(viewScoreTopEl);
    })


    //Create button elements
    var goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go Back";
    scoreDivEl.appendChild(goBackBtn);

    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear Highscore";
    scoreDivEl.appendChild(clearButton);

    //style the div
    scoreDivEl.setAttribute("style", "display: block; width: 100%; margin-left: 35%");
    //style the buttons
    clearButton.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248);; width: fit-content; font-weight: bold; padding: 1%; margin: 1%; border-radius: 10%");
    goBackBtn.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248);; width: fin-content; font-weight: bold; padding: 1%; margin: 1%; border-radius: 10%");
    initialAndHighscore.setAttribute("style", "border-style: inset; width: 25%")

    clearButton.addEventListener("click", function () {
        initialAndHighscore.remove();
        viewScoreTopEl.textContent = "";
    })
    goBackBtn.addEventListener("click", function () {
        location.reload();
    })
}