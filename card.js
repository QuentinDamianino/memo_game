const template = document.createElement('template');
const gameTemplate = document.createElement('template');

gameTemplate.innerHTML = `
<style>
    div {
        display: grid;
        grid-gap: 1.5rem;
        grid-template-columns: repeat(4, 1fr);
    }
</style>
<div id="game-board"></div>
`

template.innerHTML = `
<style>
    .container {
        perspective: 800px;
        width: 200px;
        height: 200px;
    }

    .front {
        background-color: #fff;
    }

    .back {
        transform: RotateY(180deg);
        background-color: #222;
    }

    .front, .back {
        width: 200px;
        height: 200px;
        border-radius: 2px;
        grid-area: overlap;
        display: flex;
        justify-content: center;
        align-items: center;
        backface-visibility: hidden;
    }

    .card {
        transform-style: preserve-3d;
        display: grid;
        grid-template-areas: "overlap";
        transition: 1s all ease-in-out;
    }

    .flip {
        transform: RotateY(180deg);
    }
</style>
<div class="container">
    <div class="card">
        <div class="back">Back</div>
        <div class="front">Front</div>
    </div>
</div>
`

class Card extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.card').addEventListener('click', () => this.flipCard());
    }

    flipCard() {
        const card = this.shadowRoot.querySelector('.card');

        if (card.classList.contains('flip')) {
            card.classList.remove('flip');
        } else {
            card.classList.add('flip');
        }
    }
}

class Game extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(gameTemplate.content.cloneNode(true));
        
        for(let i = 0; i < 16; i++) {
            let element = document.createElement('game-card');

            this.shadowRoot.getElementById('game-board').appendChild(element);
        }
    }
}

window.customElements.define('game-card', Card);
window.customElements.define('game-board', Game);