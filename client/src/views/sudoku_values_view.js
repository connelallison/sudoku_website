"use strict";

const PubSub = require("../helpers/pub_sub.js");

const SudokuValuesView = function (container) {
  this.container = container;
}

SudokuValuesView.prototype.bindEvents = function () {
  PubSub.subscribe('Hub:render-values-view', (evt) => {
    // console.log(evt.detail);
    this.render(evt.detail);
  });
}

SudokuValuesView.prototype.render = function (data) {
  this.container.innerHTML = "";
  const grid = document.createElement("table");
  grid.id = "values-grid";
  grid.innerHTML += "<colgroup> <col> <col> <col>";
  grid.innerHTML += "<colgroup> <col> <col> <col>";
  grid.innerHTML += "<colgroup> <col> <col> <col>";
  const tbody1 = document.createElement("tbody");
  const tbody2 = document.createElement("tbody");
  const tbody3 = document.createElement("tbody");
  grid.appendChild(tbody1);
  grid.appendChild(tbody2);
  grid.appendChild(tbody3);
  for (let i = 0, c = 0; i < 9; i++) {
    const gridRow = document.createElement("tr");
    for (let j = 0; j < 9; j++, c++) {
      const gridSquare = document.createElement("td");
      gridSquare.id = `square-${c}`;
      let value;
      let disabled;
      if (data[i][j] === 0) {
        value = ""
        disabled = false;
      } else {
        value = data[i][j];
        disabled = true;
      }
      // type="number" min="1" max="9"    << to be done later
      const gridSquareInput = document.createElement("input");
      gridSquareInput.id = `square-${c}-input`;
      gridSquareInput.disabled = disabled;
      gridSquareInput.maxlength = 1;
      gridSquareInput.size = 3;
      gridSquareInput.value = value;
      gridSquareInput.addEventListener("input", (event) => {
        if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.target.value)) {
          event.target.value = "";
        }
      });
      gridSquareInput.addEventListener("change", (event) => {
        console.log("change event triggered");
        console.log(parseInt(event.target.value));
        console.log(i);
        console.log(j);
        PubSub.publish("SudokuValuesView:attempt-fill-value", [i, j, parseInt(event.target.value)]);
      });
      PubSub.subscribe("Hub:illegal-move");
      gridSquare.appendChild(gridSquareInput);
      // gridSquare.innerHTML += `<input id="square-${c}" ${disabled}maxlength="1" size="3" value="${value}"></input>`;
      gridRow.appendChild(gridSquare);
      gridSquare.classList.add("values-table")
      grid
    }
    switch (i) {
      case 0:
      case 1:
      case 2:
        tbody1.appendChild(gridRow);
        break;
      case 3:
      case 4:
      case 5:
        tbody2.appendChild(gridRow);
        break;
      case 6:
      case 7:
      case 8:
        tbody3.appendChild(gridRow);
        break;
      default:
    }
  }
  this.container.appendChild(grid);
}

module.exports = SudokuValuesView;
