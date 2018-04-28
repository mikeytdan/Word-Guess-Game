var getStarted = document.getElementById("get-started");
var hangman = document.getElementById("hangman");
var guessText = document.getElementById("guess-text");
var guessedText = document.getElementById("guessed-text");
var guessesLeftCountText = document.getElementById("guesses-left-count-text");
var winsCountText = document.getElementById("wins-count-text");
var lossesCountText = document.getElementById("losses-count-text");

var game = {
    lettersGuessed: "",
    currentWord: "",
    started: false,
    wins: 0,
    losses: 0,
    guessesLeft: 15,
    words: ["apple", "banana", "berry", "blackberry", "blueberry", "boysenberry", "breadfruit", "cantaloupe", "cherry", "citron", "citrus", "coconut", "crabapple", "cranberry", "current", "date", "dragonfruit", "durian", "elderberry", "fig", "grape", "grapefruit", "guava", "honeydew", "jackfruit", "kiwi", "kumquat", "lemon", "lime", "lingonberry", "loquat", "lychee", "mango", "marionberry", "melon", "mulberry", "nectarine", "orange", "papaya", "peach", "pear", "persimmon", "pineapple", "plantain", "plum", "pomegranite", "pomelo", "prune", "quince", "raisin", "raspberry", "strawberry", "tangelo", "tangerine", "watermelon"],

    initialSetup: function () {
        hangman.style.display = "none";
        getStarted.style.display = "block";
        guessText.textContent = game.currentGuesses();
        winsCountText.textContent = game.wins;
        lossesCountText.textContent = game.losses;
        guessesLeftCountText.textContent = game.guessesLeft;
    },

    newGame: function () {
        this.lettersGuessed = "";
        this.guessesLeft = 10;
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)].toLowerCase();
        this.update();
    },

    didWin: function () {
        for (index in this.currentWord) {
            var character = this.currentWord[index];
            if (this.lettersGuessed.indexOf(character) == -1) {
                return false
            }
        }
        return true;
    },

    currentGuesses: function () {
        var text = "";
        for (index in this.currentWord) {
            var character = this.currentWord[index];
            if (this.lettersGuessed.indexOf(character) != -1) {
                text += character;
            } else {
                text += "_";
            }
            if (index != this.currentWord.length - 1) {
                text += " ";
            }
        }
        return text.toUpperCase();
    },

    guessLettersString: function () {
        var text = "";
        for (index in this.lettersGuessed) {
            text += this.lettersGuessed[index];
            if (index != this.lettersGuessed.length - 1) {
                text += " ";
            }
        }
        return text.toUpperCase();
    },

    update: function () {
        guessText.textContent = game.currentGuesses();
        guessedText.textContent = game.guessLettersString();
        guessesLeftCountText.textContent = game.guessesLeft;
    },

    guess: function (key) {
        if (!this.started) {
            this.started = true;
            getStarted.style.display = "none";
            hangman.style.display = "block";
            return
        }

        if (this.lettersGuessed.indexOf(key) != -1) {
            return // Already guessed that letter
        } else {
            this.lettersGuessed += key;
        }

        if (this.currentWord.indexOf(key) == -1) {
            this.guessesLeft -= 1;
            this.update();
            return // Already guessed that letter
        }
        
        this.update();

        if (this.didWin()) {
            this.wins += 1;
            winsCountText.textContent = this.wins;
            this.newGame();
        } else if (game.guessesLeft == 0) {
            this.newGame();
            this.losses += 1;
            lossesCountText.textContent = this.losses;
        }
    }
};

game.initialSetup();

document.onkeyup = function (event) {
    if (event.keyCode < 65 || event.keyCode > 90) {
        return // Invalid input
    }

    var key = event.key.toLowerCase();
    game.guess(key);
}

game.newGame();
