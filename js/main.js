class Game {
    constructor() {
        this.label = null;
        this.turn = null;
        this.states = [];
        this.moves = 0;
        this.reset = null;
        this.count = 0;
        this.columnClicked = this.columnClicked.bind(this);
        this.start = this.start.bind(this);
    }

    start() {
        if (this.count === 0) {
            let app = document.getElementById('app');
            let container = this.elementCreate('div', ['container', 'text-center'], false, app, false);
            let headingRow = this.elementCreate('div', ['row'], false, container, false);
            let heading = this.elementCreate('h1', false, 'Tic-Tac-Toe', headingRow, false);
            this.turn = Math.random() < 0.5 ? 'X' : 'O';
            let labelRow = this.elementCreate('div', ['row'], false, container, false);
            this.label = this.elementCreate('h1', false, 'Turn: ' + this.turn + '', labelRow, false);
            let board = this.elementCreate('div', ['row'], false, container, false);
            let column;
            for (let i = 0; i < 9; i++) {
                column = this.elementCreate('div', ['col-4', 'border', 'border-dark', 'fs-1', 'text-white'], 'Z', board, 'col' + i);
                column.addEventListener('click', this.columnClicked);
                this.states.push(0);
            }
            this.reset = this.elementCreate('button', ['my-3', 'd-none'], 'Reset', container, false);
        } else {
            this.moves = 0;
            let column;
            for (let i = 0; i < 9; i++) {
                column = document.getElementById('col' + i);
                column.addEventListener('click', this.columnClicked);
                column.classList.add('text-white');
                column.innerText = 'Z';
                this.states[i] = 0;
            }
            if (!this.label.innerText.includes('Tie')) {
                this.switchTurn();
            }
            this.label.innerText = 'Turn: ' + this.turn;
            this.reset.classList.add('d-none');
            this.reset.removeEventListener('click', this.start);
        }
    }

    elementCreate(tag, classes, text, parent, id) {
        let element = document.createElement(tag);
        if (classes) {
            for (let i = 0; i < classes.length; i++) {
                element.classList.add(classes[i]);
            }
        }
        if (text) {
            element.innerText = text;
        }
        if (parent) {
            parent.appendChild(element);
        }
        if (id) {
            element.id = id;
        }
        return element;
    }

    columnClicked(event) {
        let id = event.target.id;
        let column = document.getElementById(id);
        let index = id.charAt(id.length - 1);
        if (column.className.includes('text-white')) {
            this.moves++;
            column.classList.remove('text-white');
            column.innerText = this.turn;
            if (this.turn === 'X') {
                this.states[index] = 1;
            } else {
                this.states[index] = -1;
            }
            this.switchTurn();
            this.label.innerText = 'Turn: ' + this.turn;
        }
        if (this.moves > 4) {
            this.checkWin(index);
        }
    }

    switchTurn() {
        if (this.turn === 'X') {
            this.turn = 'O';
        } else {
            this.turn = 'X';
        }
    }

    checkWin(index) {
        let index1, index2, index3, state1, state2, state3;
        let clicked = index;
        let condition;
        let wins = ['012', '345', '678', '036', '147', '258', '048', '246'];
        for (let i = 0; i < wins.length; i++) {
            condition = wins[i];
            if (condition.includes(clicked)) {
                index1 = Number(condition.charAt(0));
                index2 = Number(condition.charAt(1));
                index3 = Number(condition.charAt(2));
                state1 = this.states[index1];
                state2 = this.states[index2];
                state3 = this.states[index3];
                if (Math.abs(state1 + state2 + state3) === 3) {
                    this.switchTurn();
                    this.label.innerText = 'Winner: ' + this.turn + '!';
                    this.end();
                }
            }
            if (this.moves === 9) {
                this.label.innerText = 'Tie!';
                this.end();
            }
        }
    }

    end() {
        let column;
        for (let i = 0; i < 9; i++) {
            column = document.getElementById('col' + i);
            column.removeEventListener('click', this.columnClicked);
        }
        this.reset.classList.remove('d-none');
        this.count++;
        this.reset.addEventListener('click', this.start);
    }
}

function initialize() {
    let game = new Game();
    game.start();
}

initialize();