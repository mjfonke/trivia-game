$(document).ready(function (){


// make 8 questions
var questionObj = [
    {
        question: "Which is not a Game of Thrones royal family name?",
        choice: ["Stark", "Arryn", "Martell", "Baelish"],
        rightAnswer: 3,
        answer: "Baelish",
        gif: "../images/littlefinger"
        
    },

    {
        question: "What's the name of Arya Stark's sword?",
        choice: ["Long Claw", "Oath Keeper", "Needle", "Heartsbane"],
        rightAnswer: 2,
        answer: "Needle",
        gif: "../images/needle"

    },

    {
        question: "Which character is the Three-Eyed Raven?",
        choice: ["The High Sparrow", "Bran Stark", "Jaqen H'ghar", "Darrio Naharis"],
        rightAnswer: 1,
        answer: "Bran Stark",
        gif: "../images/bran"
    },

    {
        question: "Which one is the Tyrell’s ancestral home?",
        choice: ["Winterfell", "Highgarden", "The Vale", "Stormlands"],
        rightAnswer: 1,
        answer: "Highgarden",
        gif: "../images/highgarden"
    },

    {
        question: "Aside from Valyrian Steel, what else can kill White Walkers?",
        choice: ["A raven", "Dragon Glass", "Greyscale", "Ice"],
        rightAnswer: 1,
        answer: "Dragon Glass",
        gif: "../images/nightking"
    },

    {
        question: "Who actually poisoned Joffrey?",
        choice: ["Sansa Stark", "Tyrion Lannister", "Olenna Tyrell", "Lord Varys"],
        rightAnswer: 2,
        answer: "Olenna Tyrell",
        gif: "../images/joffrey"
    },

    {
        question: "By which of these names is Daenerys not known?",
        choice: ["Mother of Dragon", "Mhysa", "White Queen", "Khaleesi"],
        rightAnswer: 2,
        answer: "White Queen",
        gif: "../images/dany"

    },

    {
        question: "How are Daenerys and Jon Snow related?",
        choice: ["She's his cousin", "She's his aunt", "She's his half-sister", "She's his real mother"],
        rightAnswer: 1,
        answer: "She's his aunt",
        gif: "../images/jon"
    }
]



var correctAnswer = 0;
var wrongAnswer = 0;
var unAnswer = 0;
var showQuestions;
var count = 0;
var timer = 20;
var intervalId;
var respond = false;
var userAnswer;


$("#start").click(gameStart);



function gameRunning(){

    timerRunning();
    decrement();

    $("#questions").html("<h2"> + questionObj[count].question + "</h2>");
    
    for (var i = 0; i <4; i++) {
        var multipleChoice = $("<button>");
        multipleChoice.text(questionObj[count].choice[i]);
        multipleChoice.addClass("mc");
        multipleChoice.attr("data-choicevalue", i);
        $("#questions").append(multipleChoice);
    }

    $(".mc").on("click", function (){
        userAnswer = $(this).data("index");
        clearInterval(intervalId);
        respond = true;
        feedback();
    })
}



function gameStart() {
    $("#start").hide;
    correctAnswer = 0;
    wrongAnswer = 0;
    unAnswer = 0;
    gameRunning();
    console.log("running")
}



function timerRunning() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    timer--;
    
    $("#timer-text").html("<h2>" + "Time Remaining: " + timer + "</h2>");

    if (timer === 0) {

        clearInterval(intervalId);

        respond = false;

        $("#timer-text").html("<h2>" + "Times up!!" + "</h2>");
        
        feedback();

        
    }
}





function feedback () {
    
    count++;
    
    var imageHolder = $("<img>");
    imageHolder.addClass("gifImage");
    imageHolder.attr("src", questionObj[count].gif);
    $("#questions").append(imageHolder);

    if (userAnswer === questionObj[count].rightAnswer && respond === true) {
        correctAnswer++;
        $("#feedback-text").html("You're right!! The answer was " + questionObj[count].answer)
    }

    else if (userAnswer != questionObj[count].rightAnswer && respond === true) {
        wroingAnswer++;
        $("#feedback-text").html("Incorrect!! The answer was " + questionObj[count].answer);
    }

    else {
        unAnswer++;
        $("#feedback-text").html("Out of time!! The answer was " + questionObj[count].answer)
    }

}



});