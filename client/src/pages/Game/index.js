import { React } from 'react';

const Game = () => {
    class Card {
        constructor(title, movement, value) {
            this.title = title;
            this.movement = movement;
            this.value = value;
        }
    }
    
    const candidate = new Card('Candidate', {up, down, left, right}, 0);
    const runningMate = new Card('Running Mate', {left, right}, 0);
    const militantSupporter = new Card('Militant Supporter', {upRight, upLeft, downRight, downLeft}, 10);    

    return (
        <div>
            
        </div>
    )






}





