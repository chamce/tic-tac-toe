class Game {
    constructor() {
        // turn / winner label
        this.label = null;
        // player
        this.turn = null;
        // state of each column
        this.states = [];
        // number of turns played
        this.moves = 0;
        // reset button
        this.reset = null;
        // game count
        this.count = 0;
        // binding column clicked to this class
        this.columnClicked = this.columnClicked.bind(this);
        // binding start to this class
        this.start = this.start.bind(this);
    }

    start() {
        // if first game
        if (this.count === 0) {
            // app div in html document
            let app = document.getElementById('app');
            // container to hold the interface
            let container = this.elementCreate('div', ['container', 'text-center'], false, app, false);
            // row to hold the heading
            let headingRow = this.elementCreate('div', ['row'], false, container, false);
            // tic-tac-toe
            let heading = this.elementCreate('h1', false, 'Tic-Tac-Toe', headingRow, false);
            // randomize turn to begin
            this.turn = Math.random() < 0.5 ? 'X' : 'O';
            // row to hold the label
            let labelRow = this.elementCreate('div', ['row'], false, container, false);
            // label displays turn
            this.label = this.elementCreate('h1', false, 'Turn: ' + this.turn + '', labelRow, false);
            // row to hold board columns
            let board = this.elementCreate('div', ['row'], false, container, false);
            let column;
            // 9 columns
            for (let i = 0; i < 9; i++) {
                // create column with hidden white text
                column = this.elementCreate('div', ['col-4', 'border', 'border-dark', 'fs-1', 'text-white'], 'Z', board, 'col' + i);
                // enable clicking of column
                column.addEventListener('click', this.columnClicked);
                // state of column initially 0
                this.states.push(0);
            }
            // create reset button to be hidden
            this.reset = this.elementCreate('button', ['my-3', 'd-none'], 'Reset', container, false);
            // not first game
        } else {
            // reset moves to 0
            this.moves = 0;
            let column;
            // 9 columns
            for (let i = 0; i < 9; i++) {
                // reset column to be blank
                column = document.getElementById('col' + i);
                column.addEventListener('click', this.columnClicked);
                column.classList.add('text-white');
                column.innerText = 'Z';
                // reset state of column to 0
                this.states[i] = 0;
            }
            // if not tie
            if (!this.label.innerText.includes('Tie')) {
                // switch turn so person who last went never goes first
                this.switchTurn();
            }
            // reset label
            this.label.innerText = 'Turn: ' + this.turn;
            // hide reset button
            this.reset.classList.add('d-none');
            // remove clickability of reset button
            this.reset.removeEventListener('click', this.start);
        }
    }

    elementCreate(tag, classes, text, parent, id) {
        // html element
        let element = document.createElement(tag);
        // if classes exist
        if (classes) {
            // for all classes
            for (let i = 0; i < classes.length; i++) {
                // add class
                element.classList.add(classes[i]);
            }
        }
        // if text exists
        if (text) {
            // set inner text
            element.innerText = text;
        }
        // if parent exists
        if (parent) {
            // append element to parent
            parent.appendChild(element);
        }
        // if id exists
        if (id) {
            // set id
            element.id = id;
        }
        return element;
    }

    columnClicked(event) {
        // get id
        let id = event.target.id;
        // get column from id
        let column = document.getElementById(id);
        // get index from id
        let index = id.charAt(id.length - 1);
        // if column is blank or clickable
        if (column.className.includes('text-white')) {
            // iterate moves
            this.moves++;
            // remove clickability
            column.classList.remove('text-white');
            // set the text of the column to the player's symbol
            column.innerText = this.turn;
            // if turn was X
            if (this.turn === 'X') {
                // set state of column to 1
                this.states[index] = 1;
                // if turn was 0
            } else {
                // set state of column to -1
                this.states[index] = -1;
            }
            // switch turn
            this.switchTurn();
            // update label
            this.label.innerText = 'Turn: ' + this.turn;
        }
        // if enough turns have gone for a winner
        if (this.moves > 4) {
            // check wins that could occur from column index
            this.checkWin(index);
        }
    }

    switchTurn() {
        // if turn was X
        if (this.turn === 'X') {
            // switch to O
            this.turn = 'O';
            // if turn was O
        } else {
            // switch to X
            this.turn = 'X';
        }
    }

    checkWin(index) {
        // initialize math vars
        let index1, index2, index3, state1, state2, state3;
        // set index to clicked for clarity
        let clicked = index;
        let condition;
        // all win conditions of 3 * 3 tic-tac-toe
        let wins = ['012', '345', '678', '036', '147', '258', '048', '246'];
        // for all win conditions
        for (let i = 0; i < wins.length; i++) {
            // set win condition to condition for clarity
            condition = wins[i];
            // if win condition includes clicked column
            if (condition.includes(clicked)) {
                // obtain column indexes of the win condition
                index1 = Number(condition.charAt(0));
                index2 = Number(condition.charAt(1));
                index3 = Number(condition.charAt(2));
                // find states of each column index
                state1 = this.states[index1];
                state2 = this.states[index2];
                state3 = this.states[index3];
                // if the states summed equals 3 or -3
                if (Math.abs(state1 + state2 + state3) === 3) {
                    // switch turn so correct winner displayed
                    this.switchTurn();
                    // declare winner
                    this.label.innerText = 'Winner: ' + this.turn + '!';
                    // end game
                    this.end();
                    // leave function so rest of code in function doesn't run
                    return;
                }
            }
        }
        // if run of out columns and winner never found
        if (this.moves === 9) {
            // declare tie
            this.label.innerText = 'Tie!';
            // end game
            this.end();
        }
    }

    end() {
        let column;
        // 9 columns
        for (let i = 0; i < 9; i++) {
            // remove clickability of columns
            column = document.getElementById('col' + i);
            column.removeEventListener('click', this.columnClicked);
        }
        // display reset button
        this.reset.classList.remove('d-none');
        // iterate game count so we don't load everything in start function
        this.count++;
        // link reset button to start function when clicked
        this.reset.addEventListener('click', this.start);
    }
}

function initialize() {
    // create game instance
    let game = new Game();
    // start game
    game.start();
}

// initialize program
initialize();