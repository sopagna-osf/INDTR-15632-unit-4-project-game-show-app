/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

'use strict';

const startGameButton = document.getElementById('btn__reset');
const qwertyDiv = document.getElementById('qwerty');
const keyElements = document.querySelectorAll('#qwerty .key');
let game;

startGameButton.addEventListener('click', e => {
    e.preventDefault();

    const phrases = [
        new Phrase('Sports car'),
        new Phrase('A vase of roses'),
        new Phrase('Along the road'),
        new Phrase('Looking stunning'),
        new Phrase('Nice neighbourhood')
    ];

    game = new Game(0, phrases, null);
    game.startGame();
});

qwertyDiv.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && e.target.className === 'key' && game) {
        game.handleInteraction(e);
    }
});

document.addEventListener('keypress', e => {
    const keyChar = String.fromCharCode(e.which).toLowerCase();

    if (game) {
        for (let i in keyElements) {
            if (keyElements[i].textContent === keyChar) {
                keyElements[i].click();
                break;
            }
        }
    }
});
