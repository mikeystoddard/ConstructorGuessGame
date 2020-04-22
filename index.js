// worked with tutor to get this fully functional but not quite there
// Meeting with tutor again to complete - the flow isn't as smooth as I would like
var Word = require("./word.js");
var inquirer = require("inquirer");
var words;
var disneyGuess;
var guesses;
var randomWord;

var disney = ["Simba", "Ariel", "Aladdin", "Hercules", "Scar", "Mufasa", "Ursula", "Jasmine", "Jafar", "Rajah", "Iago", "Phil"];

function start() {
    disneyGuess = [];
    console.log("Guess a Disney Character!");
    console.log("\n----------------\n");
    startGame();
}

function startGame() {
    randomWord = "";
    guesses = 10;
    if (disneyGuess.length < disney.length) {
        randomWord = newWord();
    } else {
        console.log("You are correct");
        playAgain();
    }
    if (randomWord) {
        words = new Word(randomWord);
        words.buildWord();
        userInput();
    }
    console.log("random word", randomWord)
}

function newWord() {
    var random = Math.floor(Math.random() * disney.length);
    var randomTerm = disney[random];
    if (disneyGuess.indexOf(randomTerm === -1)) {
        disneyGuess.push(randomTerm);
        return randomTerm;
    } else {
        return newWord();
    }
}

function userInput() {
    var check = [];
    inquirer.prompt([{
            type: "input",
            message: "Select a letter!",
            name: "userinput",
        }])
        .then(data => {
            //console.log(data.userinput);
            words.letterArray.forEach(letter => {
                letter.guess(data.userinput);
                check.push(letter.toString());
                //console.log("check", check);
            });

            if (guesses > 0 && check.indexOf("_") !== -1) {
                guesses--;
                if (guesses === 0) {
                    console.log("No more guesses left! \n");
                    console.log("Sorry game over");
                    playAgain();
                } else {
                    //Additional Console to prinout word and remaining guesses
                    // console.log("Correct Letter Guessed: " + check.join("") + "!!\n");
                    console.log(guesses + " guesses remaining!!!\n");
                    userInput();
                }
            } else {
                console.log("You won!");
                console.log(words.display());
                playAgain();
            }
        });
}
function playAgain () {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to play again?",
        name: "userinput",
    }])
    .then(data => {
    if (data.userInput) {
        start();
    } 
    else {
        console.log("Thank you for playing!\n")
        process.exit(0)
    }

    })
}

start();