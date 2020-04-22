var Letter = require("./letter.js");

function Word (words) {

  this.letterArray = [];


this.buildWord = function () {
  for (var i = 0; i < words.length; i++) {
    var letter = new Letter(words[i]);
    this.letterArray.push(letter);
  }}
  this.display = function () {
      console.log("Disney Character: ", this.letterArray.join(""));
  }

  this.guess = function () {
    guessLog = "";
    for (var i = 0; i < this.letterArray.length; i++) {
      guessLog += this.letterArray[i] + " ";
    }
    console.log(guessLog + "\n");
  };

  this.userInput = function (input) {
    for (var i = 0; i < this.letterArray.length; i++) {
      this.letterArray[i].guess(input);
      console.log(this.letterArray[i])
    }
  };
}

module.exports = Word;