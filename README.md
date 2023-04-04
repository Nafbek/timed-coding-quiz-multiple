# timed-coding-quiz-multiple
# password Generator

## Description

This mini homework project is aimed at creating a timed javascipt quiz registering the user's initials and total score data in the local storage. The code is organized into five functions. The first function is responsible for starting the quiz while the second one takes the responsibility to display questions and multiple choices one after the other.If the user choose the wrong answer, five more seconds will be deducted from the given time.  Once the given time reached zero or all questions attempted, the submit function will be executed to allow user enter their initials, and then it calls the fourth function to display user's data. At this point, input validation is applied to check the validity of user's initials. User's initials and score are saved in the local storage. The later function is also responsible for reloading the page. The other function right after the starter function determines whether to proceed to the next question or not.

## User Story

AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

## Acceptance Criteria

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score



## Installation

You can clone this particular repository (follow this link  https://github.com/Nafbek/timed-coding-quiz-multiple ) form GitHub, and paste it to your local machine. Unzip the repository directory, then open the 'index.html' file in any of your prefered web browser. No additional software is required to run this application.

## Usage

After you have opened the 'index.html' file in your prefered browser, click the 'Start Quiz' button to begin the quiz. There are a total of five questions with 1 minute allowed time. Attempt all questions before the given time is over. You can see your result on the screen and in your local storage/browser.If you want to attemp once again, you can click the 'Go Back' button.


You can either double click on the file "Animation.gif" in the repository or on the follwing syntax link to view the animation of the animation that demonstrate the functionality of the application.


![alt text](AnimationQuiz.gif)



## Credits

I would like to thank Phillip Clark for his priceless time and support during the development of this application. I am also thankful for the advice I got from Brad Dunham, specifically on the use of local storage for my application.


Questions are taken from https://www.w3schools.com/js/js_quiz.asp


## License

The MIT License applies (check here https://github.com/Nafbek/timed-coding-quiz-multiple/blob/main/LICENSE for details).