var Word = require("./word.js");
var inquirer = require("inquirer");
var words;
var disneyGuess;
var guesses;
var randomWord;

var disney = ["Simba", "Ariel", "Aladdin", "Hercules", "Scar", "Mufasa", "Ursula", "Jasmine", "Jafar", "Rajah", "Iago", "Phil"
];

function start() {
    disneyGuess = [];
    console.log("Guess a Disney Character!");
    console.log("\n----------------\n");
    start();
}

function startGame() {
    randomWord = "";
    guesses = 10;
    if (disneyGuess.length < disney.length) {
        randomWord = newWord();
    } else {
        console.log("You are correct");
        continuePrompt();
    }
    if (randomWord) {
        words = new Word(randomWord);
        words.buildWord();
        userGuess();
    }
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
    inquirer.prompt([
        {
            type: "input",
            message: "Select a letter!",
            name: "userinput",
        }
    ])
        .then(data => {
            words.letterArray.forEach(letter => {
                letter.guess(data.letterGuessed);
                check.push(letter.toString());
            });

            if (guesses > 0 && check.indexOf("_") !== -1) {
        guesses--;
            if (guesses === 0) {
        console.log("Sorry game over");
        continuePrompt();
    } else {
        userInput();
    }
        }  else {
    console.log("You won!");
    console.log(words.display());
    startGame();
}
});
}

start();