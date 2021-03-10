function createElement(tag, classes, text, parent, id) {
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

let turn, turnLabel, moves = 0, cols = [], container;

function createView() {
    let app = document.getElementById('app');
    container = createElement('div', ['container', 'text-center'], false, app, false);
    let headingRow = createElement('div', ['row'], false, container, false);
    let heading = createElement('h1', false, 'Tic-Tac-Toe', headingRow, false);
    let turnRow = createElement('div', ['row'], false, container, false);
    turn = Math.random() < 0.5 ? 'X' : 'O';
    turnLabel = createElement('h1', false, 'Turn: ' + turn + '', turnRow, false);
    let boardRow = createElement('div', ['row'], false, container, false);
    let col, state;
    for (let i = 0; i < 9; i++) {
        col = createElement('div', ['col-4', 'border', 'border-dark'], false, boardRow, 'col' + i);
        state = createElement('h1', ['text-white'], 'Z', col, 'state' + i);
        col.addEventListener('click', updateView);
        cols.push(0);
    }
}

function updateView() {
    moves++;
    let index = this.id[this.id.length - 1];
    let state = document.getElementById('state' + index);
    if (state.className.includes('text-white')) {
        state.classList.remove('text-white');
        state.innerText = turn;
        if (turn === 'X') {
            turn = 'O';
            cols[index] = 1;
        } else {
            turn = 'X';
            cols[index] = -1;
        }
        turnLabel.innerText = 'Turn: ' + turn;
    }
    if (moves > 4) {
        //checkWin(index);
    }
}

function checkWin(index) {
    let i1, i2, i3, n1, n2, n3, state1, state2, state3;
    let wins = ['012', '345', '678', '036', '147', '258', '048', '246'];
    for (let i = 0; i < wins.length; i++) {
        if (wins[i].includes(index)) {
            i1 = wins[i][0];
            i2 = wins[i][1];
            i3 = wins[i][2];
            n1 = Number(i1);
            n2 = Number(i2);
            n3 = Number(i3);
            state1 = cols[n1];
            state2 = cols[n2];
            state3 = cols[n3];
            if (Math.abs(state1 + state2 + state3) === 3) {
                turnLabel = 'Winner: ' + turn + '!';
            }
        }
    }
}

createView();