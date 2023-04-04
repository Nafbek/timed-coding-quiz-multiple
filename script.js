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
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<script>", "<javascript>", "<style>"],
        answer: "<script>",
    },
    {
        question: "The external JavaScript file must contain the <script> tag.?",
        choices: ["False", "True"],
        answer: "False",
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["funtion = myFunction()", "function:myFunction()", "function.myFunction()", "function myFunction()"],
        answer: "function myFunction()",
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

    //Erase multiple choices before the next get displayed
    choicesOlEl.innerHTML = "";

    //Display questions and choices
    for (var i = 0; i < questionsPack[thisQuestion].choices.length; i++) {
        questionEl.textContent = questionsPack[thisQuestion].question;

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

        //Add on mouseover event listener to the multiple choices' buttons        
        buttonWrapChoice.addEventListener("mouseover", function () {
            this.setAttribute("style", "background-color: rgb(198, 240, 121); font-size: bold")
        })

        //Set the attributes back to the original
        buttonWrapChoice.addEventListener("mouseout", function () {
            this.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248)")
        })

        //Add event listener to the multiple choices
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

//Execute submission of initials and total score 
function submit() {

    //Get an element from HTML
    var allDonePEl = document.getElementById("allDone");
    allDonePEl.textContent = "All Done!";

    //Add class to the Html element and style it
    summaryDivEl.classList.add("summary-submit");
    summaryDivEl.setAttribute("style", "display: block; margin-left: 35%");

    scorePEl.textContent = "Your Score is: " + totalScore;

    // Validate input and store user's initials and total score values
    submitButton.addEventListener("click", function () {
        if (userInitials.value === "" || !/^[a-zA-Z]+$/.test(userInitials.value)) {
            alert("Please enter only letter characters for your initials.")
        } else {
            summaryDivEl.remove();
            displayHighscore();
        }
    })
}

//Display user's initials and score, and reload the page
function displayHighscore() {

    //Store the user's data in local storage
    var storeUserData = JSON.parse(localStorage.getItem("userData")) || [];
    storeUserData.push({ userInitials: userInitials.value.trim(), score: totalScore });
    localStorage.setItem("userData", JSON.stringify(storeUserData));

    //Create order list element to hold the user data
    var userOrder = document.createElement("ol");
    scoreDivEl.appendChild(userOrder);
    
    //A for loop to add users to the order list
    for (var i = 0; i < 1; i++) {
        //Create an element to hold and display the value of the user's both initials and score
        var initialAndHighscore = document.createElement("li");
        initialAndHighscore.textContent += userInitials.value.trim() + ": " + totalScore;

        storeUserData[i].textContent = "";
        userOrder.appendChild(initialAndHighscore);
    }

    //Add event listener to the 'view highscore' button appended on the top of the page to optionally display the total score
    var viewScoreTopEl = document.createElement("p");
    viewScoreBtn.addEventListener("click", function () {
        viewScoreTopEl.textContent = totalScore;
        topLevelDiv.appendChild(viewScoreTopEl);
    })

    //Create button elements for clearing values and reloading the page

    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear Highscore";
    scoreDivEl.appendChild(clearButton);

    var goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go Back";
    scoreDivEl.appendChild(goBackBtn);

    //style the the section and individual buttons
    clearButton.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248);; width: fit-content; font-weight: bold; padding: 1%; margin: 1%; border-radius: 10%");
    goBackBtn.setAttribute("style", "border:solid; background-color: rgb(197, 142, 248);; width: fin-content; font-weight: bold; padding: 1%; margin: 1%; border-radius: 10%");
    userOrder.setAttribute("style", "border-style: inset; width: auto")

    //Add event listener to the buttons to lead the execution to the next step
    clearButton.addEventListener("click", function () {
        userOrder.remove();
        topLevelDiv.remove();
    })
    goBackBtn.addEventListener("click", function () {
        location.reload();
    })
}