const PubSub  = require('../helpers/pub_sub.js');

const detail = [
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
];

const SudokuGridView = function(container) {
  this.container = container;
  this.render(detail)
}
 //subscribe to sodoku data
SudokuGridView.prototype.bindEvents = function () {
  PubSub.subscribe('sodoku data channel', (event) => {
    this.render(event.detail);
  });
};

//render sodoku grid
SudokuGridView.prototype.render = function (detail) {
  this.container.innerHTML =
    '<table>' +
      detail.map(renderRow).join('') +
    '</table>';
};


function renderRow(row, idx, arr) {
  let className = '';
  if (idx === 3 || idx === 6) {
    className = 'bottom-border'
  }
  return `<tr class="${className}">` + row.map((cell, cellIdx, arr) => renderCell(idx, cell, cellIdx, arr)).join('') + '</tr>';
}

function renderCell(rowIdx, cell, cellIdx, arr) {
  let className = '';
  if (cellIdx === 3 || cellIdx === 6) {
    className = 'left-border'
  }
  return `<td class=${className}>` +
    '<input id="number1" maxlength="1" size="3"></input>' +
  '</td>';
}

module.exports = SudokuGridView;
