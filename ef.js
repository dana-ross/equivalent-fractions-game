document.addEventListener("DOMContentLoaded", (event) => {

    let score = 100;
    let denominator = 0;
    let numerator = 0;
    let answerFactor = 0;
    let answerDenominator = 0;


    const submitButtonElement = document.getElementsByClassName('submit')[0];

    const answerBoxElement = document.getElementsByClassName('answer')[0];

    function updateScore(score) {
        const scoreElement = document.getElementsByClassName('score')[0];
        scoreElement.innerHTML = score;
    }

    const answerBoxClickHandler = (e) => {
        if(e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
        }
        else {
            e.target.classList.add('selected');
        }
    }
    
    const newProblem = () => {
        answerBoxElement.innerHTML = '';

        denominator = Math.floor(Math.random() * 10 + 1);
        numerator = Math.floor(Math.random() * denominator + 1);
        answerFactor = Math.floor(Math.random() * 4 + 2);
        let answerDenominator = denominator * answerFactor;

        const numeratorElement = document.getElementsByClassName('numerator')[0] || 0;
        const denominatorElement = document.getElementsByClassName('denominator')[0] || 0;

        numeratorElement.innerHTML = numerator;
        denominatorElement.innerHTML = denominator;

        for(x = 0; x < answerDenominator; x++) {
            let newBox = document.createElement('div');
            newBox.className = 'answerBoxCounter';
            newBox.onclick = answerBoxClickHandler;
            console.log(newBox);
            answerBoxElement.appendChild(newBox);
        }
    }

    updateScore(score);
    newProblem();

    submitButtonElement.onclick = () => {
        const countOfSelectedBoxes = [...answerBoxElement.getElementsByClassName('answerBoxCounter')].filter((elem) => { return elem.classList.contains('selected')}).length || 0;
        if(countOfSelectedBoxes === numerator * answerFactor) {
            score += 100;
            updateScore(score);

            const correctElement = document.getElementsByClassName('correct')[0];
            correctElement.style.display = 'inline-block'
            setTimeout(() => {
                correctElement.style.display = 'none';
                newProblem();
            }, 2000)
        }
        else {
            score -= 20;
            updateScore(score);

            const incorrectElement = document.getElementsByClassName('incorrect')[0];
            incorrectElement.style.display = 'inline-block'
            setTimeout(() => {
                incorrectElement.style.display = 'none';
            }, 2000)

        }
    }

});