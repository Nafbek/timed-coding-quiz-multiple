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

//Declare and initialize variables
var givenTime =3; 
var totalScore =0;
var thisQuestion =0;
var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start");
var stopCommand = document.querySelector("#stop");
var questionEl =document.querySelector("#question");
var multipleChoices = document.querySelector("#choices");






timer = setInterval(function(){
    givenTime--;
    if(givenTime ===0){
        clearInterval();
        stop();
        displaySummary();
    }else{
        displayQuestions();
    }
},300000)





function displayQuestions(){

}
function displaySummary(){

}
function stop(){
    //your time is up

}


//eventListener for highscore get displayed when the initials submitted