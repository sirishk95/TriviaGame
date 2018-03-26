//Declaring variables 

var gameQuestions = [{
    question: "What is the name of the first album released by American rock band Bon Jovi?",
    answerList: ["Bon Jovi", "Van Halen", "Back in Black", "Boston"],
    answer: 0
}, {
    question: "Who was the oldest member of the rock band The Beatles?",
    answerList: ["John Lennon", "Ringo Starr", "Paul McCartney", "Jim Morrison"],
    answer: 1
}, {
    question: "How old was American musician Jimi Hendrix when he passed away in 1970?",
    answerList: ["23", "30", "27", "35"],
    answer: 2
}, {
    question: "Victoria Beckham was a member of which English pop group?",
    answerList: ["Backstreet Boys", "TLC", "The Spice Girls", "Pussycat Dolls"],
    answer: 2
}, {
    question: "K-pop is a genre of music that originated in what country?",
    answerList: ["North Korea", "United States", "Australia", "South Korea"],
    answer: 3
}, {
    question: "What award is given to recognize outstanding achievement in the music industry?",
    answerList: ["Grammy", "Oscar", "Emmy", "Golden Globe"],
    answer: 0
}];

var search = ['bon+jovi', 'the+beatles','jimi+hendrix', 'victoria+beckham', 'k-pop+south+korea', 'music+industry+award'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unAnswered;
var seconds;
var time;
var answered;
var userSelect;

var messages = {
    correct: "Yes, that is correct!",
    incorrect: "Sorry, wrong answer.",
    endTime: "Times Up!",
    finished: "Game Over! Let's see the results."
}

$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function() {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unAnswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    unAnswered = 0;
    newQuestion();
}

function newQuestion() {
    $("#message").empty();
    $('#correctAnswer').empty();
    $('#gif').empty();
    answered = true;
// sets up new questions & answerlist
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+gameQuestions.length);
    $('.question').html('<h2>' + gameQuestions[currentQuestion].question + '<h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function() {
        userSelect=$(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '<h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '<h3>');
        if(seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].answer];

    var rightAnswerIndex = gameQuestions[currentQuestion].answer;

    if((userSelect == rightAnswerIndex) && (answered==true)) {
        correctAnswer++
        $('#message').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered==true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct was: ' + rightAnswerText);    
    } else {
        
        unAnswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerIndex);
        answered = true;

    }

    if(currentQuestion == (gameQuestions.length-1)) {
        setTimeout(scoreboard, 5000)
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }

}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('correctedAnswer').empty();

    $('#finalmessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unAnswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}

