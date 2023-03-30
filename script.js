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
var givenTime = 3;
var totalScore = 0;
var thisQuestion = 0;
var timer = document.getElementById("timer");
var startButton = document.getElementById("startBtn");
var stopCommand = document.getElementById("stop");
var questionEl = document.getElementById("question");
var multipleChoicesEl = document.getElementById("choices");
var CorrectAnswer = document.querySelector(".correct-answer");
var submitButton = document.getElementById("submitFinal");
var initials = document.querySelector('input[name="user-initials"]');
var initialAndHighscore = document.getElementById("initialAndScore");
var goBackButton = document.getElementById("goBackBtn");
var clearButton = document.getElementById("clearHighscore");




// startButton.addEventListener("click", displayQuestions);
// startButton.addEventListener("click", startTimer)

function startTimer() {
    var timeInterval = setInterval(function () {
        timer.textContent = "Time:" + givenTime;
        givenTime--;
        if (givenTime === 0) {
            clearInterval(timeInterval);
            ///////
        } else {
            displayQuestions();
        }

    }, 1000)
};





// timer = setInterval(function(){
//     givenTime--;
//     if(givenTime ===0){
//         clearInterval();
//         stop();
//         displaySummary();
//     }else{
//         displayQuestions();
//     }
// },300000)





function displayQuestions() {


    questionEl.textContent = questionsPack[thisQuestion].question;



    //     for(var i =0; i<questionsPack.length; i++){

    // }


    for (var index = 0; index < questionsPack[i].choices[index].length; index++) {
        var liEl = document.createElement("li");
        liEl.textContent = questionsPack[thisQuestion].choices[index];

        multipleChoicesEl.appendChild(liEl);

    }

    thisQuestion++;
}



// }
// function displaySummary(){

// }
// function stop(){
//     //your time is up

// }


//eventListener for highscore get displayed when the initials submitted