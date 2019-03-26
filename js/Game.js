/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

'use strict';

class Game {
    constructor(missed, phrases, activePhrase) {
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = activePhrase;
    }

    /**
     * Start new game
     */
    startGame() {
        const overlay = document.getElementById('overlay');
        const phraseDiv = document.getElementById('phrase');
        const ul = phraseDiv.firstElementChild;
        const keyElements = document.querySelectorAll('#qwerty .key');
        const lostHearts = document.querySelectorAll('#scoreboard img[src="images/lostHeart.png"]');

        // Hide overlay
        overlay.classList.remove('win', 'lose');
        overlay.classList.add('animated', 'fadeOut');
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.classList.remove('animated', 'fadeOut');
        }, 1000);

        // Clear phrase
        while (ul.firstElementChild) {
            ul.removeChild(ul.firstElementChild);
        }

        // Reset keyboard
        keyElements.forEach(keyElement => {
            keyElement.classList.remove('wrong', 'chosen');
            keyElement.disabled = false;
        });

        // Reset life
        lostHearts.forEach(lostHeart => {
            lostHeart.src = 'images/liveHeart.png';
        });

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Get random phrase
     */
    getRandomPhrase() {
        const index = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[index];
    }

    /**
     * Controls the game logic
     * 
     * @param {Object} e Event object
     */
    handleInteraction(e) {
        if (this.missed === 5) {
            return;
        }

        const selectedLetter = e.target.textContent.toLowerCase();
        const phraseDiv = document.getElementById('phrase');

        e.target.disabled = true;

        if (this.activePhrase.checkLetter(selectedLetter)) {
            e.target.classList.add('chosen');
            this.activePhrase.showMatchedLetter(selectedLetter);

            if (this.checkForWin()) {
                phraseDiv.classList.add('animated', 'bounceIn');

                setTimeout(() => {
                    this.gameOver(true);
                    phraseDiv.classList.remove('animated', 'bounceIn');
                }, 500);
            }
        } else {
            e.target.classList.add('wrong');
            phraseDiv.classList.add('animated', 'shake');

            setTimeout(() => {
                phraseDiv.classList.remove('animated', 'shake');
            }, 1000);

            this.removeLife();
        }
    }

    /**
     * Check if the player won the game
     */
    checkForWin() {
        return document.querySelectorAll('#phrase .letter.hide').length === 0;
    }

    /**
     * Remove life
     */
    removeLife() {
        const liveHeart = document.querySelectorAll('#scoreboard img[src="images/liveHeart.png"]');

        if (liveHeart[liveHeart.length - 1]) {
            liveHeart[liveHeart.length - 1].src = 'images/lostHeart.png';
        }

        this.missed += 1;
        
        if (this.missed === 5) {
            setTimeout(() => {
                this.gameOver(false);
            }, 1000);
        }
    }

    /**
     * End the game
     * 
     * @param {Boolean} win 
     */
    gameOver(win) {
        const overlay = document.getElementById('overlay');
        const gameOverMessage = document.getElementById('game-over-message');

        overlay.style.display = 'flex';
        overlay.classList.add(win ? 'win' : 'lose');
        gameOverMessage.textContent = win ? 'Congratulations, You win!' : 'You lose! Please try again!';
        gameOverMessage.classList.add('animated', 'bounceIn');

        setTimeout(() => {
            gameOverMessage.classList.remove('animated', 'bounceIn');
        }, 1000);
    }
}