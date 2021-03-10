function createElement(tag, classes, text, parent, id) {
    // create element
    let element = document.createElement(tag);
    // if classes exist
    if (classes) {
        // for classes
        for (let i = 0; i < classes.length; i++) {
            // add class
            element.classList.add(classes[i]);
        }
    }
    // if inner text exists
    if (text) {
        // set text
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

let turn, turnLabel, moves = 0, cols = [], container;

function createView() {
    // reference app div
    let app = document.getElementById('app');
    // create container div
    container = createElement('div', ['container', 'text-center'], false, app, false);
    // create heading row
    let headingRow = createElement('div', ['row'], false, container, false);
    // create heading
    let heading = createElement('h1', false, 'Tic-Tac-Toe', headingRow, false);
    // create turn row
    let turnRow = createElement('div', ['row'], false, container, false);
    // randomize turn
    turn = Math.random() < 0.5 ? 'X' : 'O';
    // create turn label
    turnLabel = createElement('h1', false, 'Turn: ' + turn + '', turnRow, false);
    // create board row
    let boardRow = createElement('div', ['row'], false, container, false);
    // initialize board col and state
    let col, state;
    // 9 elements
    for (let i = 0; i < 9; i++) {
        // create board col
        col = createElement('div', ['col-4', 'border', 'border-dark'], false, boardRow, 'col' + i);
        // create board state
        state = createElement('h1', ['text-white'], 'Z', col, 'state' + i);
        // create click listener for col
        col.addEventListener('click', updateView);
        // push board state to cols
        cols.push(0);
    }
}

function updateView() {
    // iterate moves
    moves++;
    // clicked element's index
    let index = this.id[this.id.length - 1];
    // reference clicked element's state
    let state = document.getElementById('state' + index);
    // if clicked element has white text because it has never been clicked on
    if (state.className.includes('text-white')) {
        // remove text-white class so player symbol will show up
        state.classList.remove('text-white');
        // set clicked element's state to player symbol
        state.innerText = turn;
        // if player was X
        if (turn === 'X') {
            // update state in array to 1
            cols[index] = 1;
        } else {
            // otherwise update state in array to -1
            cols[index] = -1;
        }
    }
    // if enough moves have been played for a win
    if (moves > 4) {
        // check win
        checkWin(index);
    }
    // if winner not found
    if (!turnLabel.innerText.includes('Winner')) {
        // if run out of moves
        if (moves === 9) {
            // declare tie
            turnLabel.innerText = 'Tie!'
        } else {
            // alternate turn
            switchTurn();
        }
    }
}

function switchTurn() {
    // if player X
    if (turn === 'X') {
        // switch to player O
        turn = 'O';
    } else {
        // else switch to player X
        turn = 'X';
    }
    // update turn label
    turnLabel.innerText = 'Turn: ' + turn;
}

function checkWin(index) {
    // initialize math variables
    let i1, i2, i3, n1, n2, n3, state1, state2, state3;
    // win conditions
    let wins = ['012', '345', '678', '036', '147', '258', '048', '246'];
    // for win conditions
    for (let i = 0; i < wins.length; i++) {
        // if win condition includes clicked index
        if (wins[i].includes(index)) {
            // math
            i1 = wins[i][0];
            i2 = wins[i][1];
            i3 = wins[i][2];
            n1 = Number(i1);
            n2 = Number(i2);
            n3 = Number(i3);
            state1 = cols[n1];
            state2 = cols[n2];
            state3 = cols[n3];
            // does the absolute value of the win condition equal 3
            if (Math.abs(state1 + state2 + state3) === 3) {
                // winner found
                turnLabel.innerText = 'Winner: ' + turn + '!';
                // leave for loop
                break;
            }
        }
    }
}

createView();