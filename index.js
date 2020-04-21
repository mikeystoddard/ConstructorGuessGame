// worked with tutor to get this fully functional but not quite there
// Meeting with tutor again to complete - the flow isn't as smooth as I would like
var Word = require("./word.js");
var inquirer = require("inquirer");
var words;
var disneyGuess;
var guesses;
var randomWord;
var guessedWord;

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
        start();
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
                    console.log("Sorry game over");
                    start();
                } else {
                    userInput();
                }
            } else {
                console.log("You won!");
                console.log(words.display());
                start();
            }
        });
}

start();