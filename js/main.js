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

function randomizeTurn() {
    return Math.random() < 0.5 ? 'X' : 'O';
}

function createView() {
    let app = document.getElementById('app');
    let container = createElement('div', ['container', 'text-center'], false, app, false);
    let headingRow = createElement('div', ['row'], false, container, false);
    let heading = createElement('h1', false, 'Tic-Tac-Toe', headingRow, false);
    let turnRow = createElement('div', ['row'], false, container, false);
    let turn = randomizeTurn();
    let turnLabel = createElement('h1', false, 'Turn: ' + turn + '', turnRow, false);
    let boardRow = createElement('div', ['row'], false, container, false);
    let cols = [], col, state;
    for (let i = 0; i < 9; i++) {
        col = createElement('div', ['col-4', 'border', 'border-dark'], false, boardRow, 'col' + i);
        state = createElement('h1', ['text-white'], 'Z', col, 'state' + i);
        cols.push([col, state]);
    }
}

createView();