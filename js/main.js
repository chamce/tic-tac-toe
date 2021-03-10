// helper function to create individual elements
function createElement(tag, classes, text, parent, id) {
    // html element
    let element = document.createElement(tag);
    // if classes exist
    if (classes) {
        // iterate on classes
        for (let i = 0; i < classes.length; i++) {
            // add class to element's class list
            element.classList.add(classes[i]);
        }
    }
    // if text exists
    if (text) {
        // add text to element's inner text
        element.innerText = text;
    }
    // if parent exists
    if (parent) {
        // append element to parent
        parent.appendChild(element);
    }
    // if id exists
    if (id) {
        // set element's id
        element.id = id;
    }
    return element;
}

// global variables used in many functions
let turn, turnLabel, moves = 0, cols = [], container, reset;

function createView() {
    // app div in html document
    let app = document.getElementById('app');
    // container div to hold interface
    container = createElement('div', ['container', 'text-center'], false, app, false);
    // row div to hold heading
    let headingRow = createElement('div', ['row'], false, container, false);
    // heading element
    let heading = createElement('h1', false, 'Tic-Tac-Toe', headingRow, false);
    // row div to hold turn label
    let turnRow = createElement('div', ['row'], false, container, false);
    // randomize turn
    turn = Math.random() < 0.5 ? 'X' : 'O';
    // turn label element
    turnLabel = createElement('h1', false, 'Turn: ' + turn + '', turnRow, false);
    // row div to hold board cols
    let boardRow = createElement('div', ['row'], false, container, false);
    // initialize col and state
    let col, state;
    // 9 cols
    for (let i = 0; i < 9; i++) {
        // create col element
        col = createElement('div', ['col-4', 'border', 'border-dark'], false, boardRow, 'col' + i);
        // create h1 element stored in col
        state = createElement('h1', ['text-white'], 'Z', col, 'state' + i);
        // add click listener to col
        col.addEventListener('click', updateView);
        // set up cols data with 0s
        cols.push(0);
    }
}

function updateView() {
    // index of clicked col
    let index = this.id[this.id.length - 1];
    // find h1 element inside col with col index
    let state = document.getElementById('state' + index);
    // if col hasn't been clicked yet, state will have hidden white text
    if (state.className.includes('text-white')) {
        // iterate moves only when we click a 'blank' col
        moves++;
        // remove white text from col so it cannot be updated
        state.classList.remove('text-white');
        // set state element to player's symbol
        state.innerText = turn;
        // if player X turn
        if (turn === 'X') {
            // set state data to 1
            cols[index] = 1;
            // player O turn
        } else {
            // set state data to -1
            cols[index] = -1;
        }
        // switch turn
        switchTurn();
    }
    // if enough moves for win
    if (moves > 4) {
        // check win with clicked col's index
        checkWin(index);
    }
    // if winner not found
    if (!turnLabel.innerText.includes('Winner')) {
        // if run out of moves
        if (moves === 9) {
            // declare tie
            turnLabel.innerText = 'Tie!'
            // switch turn
            switchTurn();
            // end game
            end();
            // haven't run out of moves
        } else {
            // update turn label for turn switch
            turnLabel.innerText = 'Turn: ' + turn;
        }
        // if winner found
    } else {
        // end game
        end();
    }
}

function end() {
    // create reset button
    reset = createElement('button', ['my-3'], 'Reset', container, false);
    // add click listener to reset button
    reset.addEventListener('click', reload);
    // for all cols
    for (let i = 0; i < 9; i++) {
        // remove click listener
        document.getElementById('col' + i).removeEventListener('click', updateView);
    }
}

function reload() {
    // reset moves
    moves = 0;
    // initialize col
    let col;
    // for all cols
    for (let i = 0; i < 9; i++) {
        // get col from loop index
        col = document.getElementById('col' + i);
        // set state from loop index
        state = document.getElementById('state' + i);
        // re-add click listener to col
        col.addEventListener('click', updateView);
        // re-blank state of cols
        state.classList.add('text-white');
        // re-add filler text to state
        state.innerText = 'Z';
        // re-zero cols state data
        cols[i] = 0;
        // remove reset button
        reset.remove();
    }
    // switch turn
    switchTurn();
    // update turn label to reflect turn switch
    turnLabel.innerText = 'Turn: ' + turn;
}

function switchTurn() {
    // if turn X
    if (turn === 'X') {
        // switch to O
        turn = 'O';
        // if turn O
    } else {
        // switch to X
        turn = 'X';
    }
}

function checkWin(index) {
    // initialize math variables
    let i1, i2, i3, n1, n2, n3, state1, state2, state3;
    // win conditions
    let wins = ['012', '345', '678', '036', '147', '258', '048', '246'];
    // for all win conditions
    for (let i = 0; i < wins.length; i++) {
        // if win condition includes index of selected col
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
            // if the absolute value of the 3 states in the win condition equals 3
            if (Math.abs(state1 + state2 + state3) === 3) {
                // switch turn
                switchTurn();
                // declare winner
                turnLabel.innerText = 'Winner: ' + turn + '!';
                // leave for loop
                break;
            }
        }
    }
}

// start program
createView();