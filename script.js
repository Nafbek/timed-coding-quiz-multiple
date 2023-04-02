//Declare an array with several objects.....
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
-store the initials and score values
-initials and highscore will be displayed with 'Go back' and 'clear highscore' options
- when 'Go back' gets clicked, reload page

*/

//Declare and initialize variables
var givenTime = 60;
var totalScore = 0;
var thisQuestion = 0;
// var multipleChoices = 0;
var quizDivEl = document.getElementById("quiz-div");
var instructionDivEl = document.getElementById("instruction-div")
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

var timeInterval;


startButton.addEventListener("click", startTimer)





//Create an anchor element for multiple choices and style them ..........????
// var listOfChoices;
// listOfChoices.setAttribute("style", "border:solid; background-color:purple")



function startTimer() {
    setInterval(function () {
        givenTime--;
        timer.textContent = "Time:" + givenTime;



    }, 1000)

    setTimeout(function () {
        //         choicesOlEl.textContent = "";
        // questionEl.textContent = "";
        // thisQuestion++;
        displayQuestions();

    }, 1000)
};

function nextOrStop() {
    if (thisQuestion >= questionsPack.length || givenTime <= 0) {
        clearInterval(timeInterval);
        quizDivEl.remove();
        timer.remove();
        submit();
    } else {
        displayQuestions();
    }
}

function displayQuestions() {

    choicesOlEl.innerHTML = "";






    for (var i = 0; i < questionsPack[thisQuestion].choices.length; i++) {
        questionEl.textContent = questionsPack[thisQuestion].question;

        var listOfChoices = document.createElement("li");

        var buttonWrapChoice = document.createElement("button");

        buttonWrapChoice.textContent = questionsPack[thisQuestion].choices[i];

        listOfChoices.appendChild(buttonWrapChoice);

        // listOfChoices.innerHTML = 
        choicesOlEl.appendChild(listOfChoices);
        // listOfChoices.innerHTML = questionsPack[thisQuestion].choices[i];
        // choicesOlEl.appendChild(listOfChoices);

        correctAnswer.setAttribute("style", "border-top: solid")

        buttonWrapChoice.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248); width: fit-content; font-weight: bold; font-size: 1rem; padding: 1%; margin: 1%; border-radius: 10%");

        questionEl.setAttribute("style", "font-weight: bold; font-size: 1rem");




        //add event listener
        buttonWrapChoice.addEventListener("click", function () {
            // choicesOlEl.textContent = "";
            // questionEl.textContent = "";




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




            console.log(givenTime);



        })

    }

}


function submit() {

    //.. to hold the user initials and score
    summaryDivEl.setAttribute("style", "display: block; margin-left: 35%");
    var allDonePEl = document.getElementById("allDone");
    allDonePEl.textContent = "All Done!";

    scorePEl.textContent = "Your Score is: " + totalScore;  //totalScore not increment

    // to store the user's initials and total score values
    submitButton.addEventListener("click", function () {
        localStorage.setItem("userInitials", JSON.stringify(userInitials.value))
        localStorage.setItem("userScore", JSON.stringify(totalScore))                   //is there any way to concatenate?
        summaryDivEl.remove();
        displayHighscore();
    })

}

function displayHighscore() {
    console.log("hi")

    console.log("here you go")

    //create a paragraph element to hold and display the initials and score again

    var initialAndHighscore = document.createElement("p");

    // initialAndHighscore.textContent += localStorage.getItem("userScore") + "-" + localStorage.getItem("userInitials");
    initialAndHighscore.textContent = "1." + userInitials.value + ": " + totalScore;  //seems unprofessional to put the list of number manually, any other way?  totalScore not increment
    scoreDivEl.appendChild(initialAndHighscore);

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


    clearButton.addEventListener("click", function () {
        initialAndHighscore.textContent = "";
    })
    goBackBtn.addEventListener("click", function () {

        location.reload();
    })
}








