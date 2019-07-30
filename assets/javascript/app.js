$(document).ready(function (){


// make 8 questions
var questionObj = [
    {
        question: "Which is not a Game of Thrones royal family name?",
        choice: ["Stark", "Arryn", "Martell", "Baelish"],
        rightAnswer: 3,
        answer: "Baelish",
        gif: "assets/images/littlefinger.gif"
        
    },

    {
        question: "What's the name of Arya Stark's sword?",
        choice: ["Long Claw", "Oath Keeper", "Needle", "Heartsbane"],
        rightAnswer: 2,
        answer: "Needle",
        gif: "assets/images/needle.gif"

    },

    {
        question: "Which character is the Three-Eyed Raven?",
        choice: ["The High Sparrow", "Bran Stark", "Jaqen H'ghar", "Darrio Naharis"],
        rightAnswer: 1,
        answer: "Bran Stark",
        gif: "assets/images/bran.gif"
    },

    {
        question: "Which one is the Tyrell’s ancestral home?",
        choice: ["Winterfell", "Highgarden", "The Vale", "Stormlands"],
        rightAnswer: 1,
        answer: "Highgarden",
        gif: "assets/images/highgarden.gif"
    },

    {
        question: "Aside from Valyrian Steel, what else can kill White Walkers?",
        choice: ["A raven", "Dragon Glass", "Greyscale", "Ice"],
        rightAnswer: 1,
        answer: "Dragon Glass",
        gif: "assets/images/nightking.gif"
    },

    {
        question: "Who actually poisoned Joffrey?",
        choice: ["Sansa Stark", "Tyrion Lannister", "Olenna Tyrell", "Lord Varys"],
        rightAnswer: 2,
        answer: "Olenna Tyrell",
        gif: "assets/images/joffrey.gif"
    },

    {
        question: "By which of these names is Daenerys not known?",
        choice: ["Mother of Dragon", "Mhysa", "White Queen", "Khaleesi"],
        rightAnswer: 2,
        answer: "White Queen",
        gif: "assets/images/dany.gif"

    },

    {
        question: "How are Daenerys and Jon Snow related?",
        choice: ["She's his cousin", "She's his aunt", "She's his half-sister", "She's his real mother"],
        rightAnswer: 1,
        answer: "She's his aunt",
        gif: "assets/images/jon-dany.gif"
    }
]



var correctAnswer = 0;
var wrongAnswer = 0;
var unAnswer = 0;
var count = 0;
var timer = 21;
var intervalId;
var respond = false;
var userAnswer;


$("#start").click(gameStart);



function gameRunning(){

    timerRunning();
    decrement();

    $("#image-div").empty();
    $("#feedback-text").empty();
    $("#questions").html("<h2>" + questionObj[count].question + "</h2>");
    
    for (var i = 0; i <4; i++) {
        var multipleChoice = $("<button>");
        multipleChoice.text(questionObj[count].choice[i]);
        multipleChoice.addClass("mc");
        multipleChoice.attr("data-choicevalue", i);
        $("#questions").append(multipleChoice);
    }

    $(".mc").on("click", function (){
        userAnswer = $(this).data("choicevalue")
        clearInterval(intervalId);
        timer = 21;
        respond = true;
        feedback();
    })
}



function gameStart() {
    $("#start").hide();
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

    $("#questions").empty();
    $(".mc").empty();
    $("#timer-text").empty();
    $("#result-text").empty();
    
    var imageHolder = $("<img>");
    imageHolder.addClass("gifImage");
    imageHolder.attr("src", questionObj[count].gif);
    $("#image-div").append(imageHolder);


    if (userAnswer === questionObj[count].rightAnswer && respond === true) {
        correctAnswer++;
        $("#feedback-text").html("You're right!! The answer was " + questionObj[count].answer)
    }

    else if (userAnswer != questionObj[count].rightAnswer && respond === true) {
        wrongAnswer++;
        $("#feedback-text").html("Incorrect!! The answer was " + questionObj[count].answer);
    }

    else {
        unAnswer++;
        $("#feedback-text").html("Out of time!! The answer was " + questionObj[count].answer);
        timer = 21;
    }

    if (count === questionObj.length-1) {
        setTimeout(endPage, 5000);
        
    } else {
    count++;
    setTimeout(gameRunning, 5000);
   
    }

    console.log("rightAnswer: " + questionObj[count].rightAnswer)
    console.log("userAnswer" + userAnswer)
    

}

function endPage() {

    $("#image-div").hide();
    $("#feedback-text").hide();

    $("#result-text").html(" All done!! Let's see how you did! ");
    $("#result-text").append("<p>" + " Correct Answer: " + correctAnswer + "</p>");
    $("#result-text").append("<p>" + " Incorrect Answer: " + wrongAnswer + "</p>");
    $("#result-text").append("<p> Unanswered: " + unAnswer + "</p>");
    $("#result-text").append("<hr>");
    $("#result-text").append("<p> Do you want to play again? </p>");
    count = 0;
    $("#start").show();
}





});