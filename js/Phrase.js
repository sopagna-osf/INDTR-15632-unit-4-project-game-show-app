/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

'use strict';

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Display the phrase
     */
    addPhraseToDisplay() {
        const phraseDiv = document.getElementById('phrase');
        const ul = phraseDiv.firstElementChild;
        const letters = this.phrase.split('');
        
        letters.forEach(letter => {
            const li = document.createElement('li');

            if (letter === ' ') {
                li.className = 'space';
            }
            else {
                li.className = `hide letter ${letter}`;
            }
            
            li.textContent = letter;
            ul.appendChild(li);
        });
    }

    /**
     * Checked if the selected letter is in the phrase
     * 
     * @param {string} letter 
     */
    checkLetter(letter) {
        return this.phrase.indexOf(letter.toLowerCase()) > -1;
    }

    /**
     * Show the matched letter
     * 
     * @param {string} letter 
     */
    showMatchedLetter(letter) {
        const letterElements = document.querySelectorAll(`#phrase .letter.${letter}`);

        letterElements.forEach(letterElement => {
            letterElement.classList.remove('hide');
            letterElement.classList.add('show');
        });
    }
}