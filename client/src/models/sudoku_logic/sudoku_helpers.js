"use strict";
const Sudoku = require("./sudoku_constructor.js");

Sudoku.prototype.stringify = function () {
  let stringified = "";
  for (let i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      stringified += this.rows[i][j].value;
    }
  }
  return stringified;
}

// This method takes in a unit as an argument, and returns and array of only its values.
// It is invoked in unitsNumbers(), unitComplete(), and printUnitArray().
Sudoku.prototype.unitNumbers = function (unit) {
  return unit.map((square) => {
    return square.value;
  });
};

Sudoku.prototype.unitCandidates = function (unit) {
  return unit.map((square) => {
    return square.candidates;
  });
};

// This method takes in one of the 2D arrays as an argument - this.rows, this.columns, or this.nonets - and then returns a 2D array containing the values in each square, not the objects.
Sudoku.prototype.unitsNumbers = function (unitArray) {
  return unitArray.map((unit) => {
    return this.unitNumbers(unit);
  });
};

Sudoku.prototype.unitsCandidates = function (unitArray) {
  return unitArray.map((unit) => {
    return this.unitCandidates(unit);
  });
};

// This method tests whether a unit (row, column, or nonet) has been correctly filled, with each number 1...9 contained once inside it.
// It checks for equality between this.completed and an array of the values of the unit's Square objects - each stringified to allow for comparison.
// If the unit contains each of 1...9 once, the method will return true. Otherwise, it will return false.
// This method is invoked inside sudokuComplete();
Sudoku.prototype.unitComplete = function (unit) {
  // return (JSON.stringify(this.completed) === JSON.stringify(this.unitNumbers(unit).sort()));
  return (this.stringEquals(this.completed, this.unitNumbers(unit).sort()));
};

// This method tests whether the entire sudoku puzzle has been correctly solved. It checks if every unit returns true when tested with the unitComplete method.
// If every row, every column, and every nonet contains each of 1...9 once - meaning the puzzle has been solved - the method will return true. Otherwise, it will return false.
Sudoku.prototype.sudokuComplete = function () {
  return this.sudoku.every((unitArray) => {
    return unitArray.every((unit) => {
      return this.unitComplete(unit)
    });
  });
};

// This method prints the number values of each Square in each unit in a 2D unit array (this.rows, this.columns, or this.nonets).
// It loops through the 2D array, individually printing each unit's values as an array. This improves readability in the console.
// Lastly, it prints a string of dashes after the last array. This makes it clear where the grid ends - in case multiple grids are being printed after each other.
// This method is used during development to print sudoku grids to the console in a readable form without requiring a GUI. It is not meant to be used for anything else.
Sudoku.prototype.printUnitArray = function (unitArray) {
  for (let i = 0; i < 9; i++) {
    console.log(this.unitNumbers(unitArray[i]));;
  }
  console.log("-----------------------------");
};

Sudoku.prototype.stringEquals = function (item1, item2) {
  return JSON.stringify(item1) === JSON.stringify(item2)
}

Sudoku.prototype.setCandidatesToValue = function (square) {
  if (square.value !== 0) {
    square.candidates = [square.value];
  }
}

// This method is used to check, for a single Square object passed in as an argument, which of the numbers in its candidate list can be immediately eliminated.
// To do this, it checks its peers (the other squares in its row,  its column, and its nonet), and removes their values from its candidates list.
// For example, if it finds that a square in the same row has 7 as its value, it would remove 7 from its list of candidates, because 7 is already taken.
// This method is invoked inside the constructCandidates() method.
Sudoku.prototype.checkPeers = function (square) {
  if (square.candidates.length > 1) {
    square.candidates = square.candidates.filter((candidate) => {
      return !(this.unitNumbers(this.getPeers(square)).includes(candidate))
    })
  }
};

Sudoku.prototype.attemptFillValue = function (square, value) {
  if (value === 0) {
    this.fillValue(square, value);
    return [true];
  }
  const result = this.legalMove(square, value);
  if (result[0]) {
    this.fillValue(square, value);
    return [true];
  } else {
    // console.error("ILLEGAL MOVE");
    return result;
  }
}


Sudoku.prototype.fillValue = function (square, value) {
  square.value = value;
  square.candidates = [value];
  this.updatePeers(square);
}

Sudoku.prototype.legalMove = function (square, value) {
  const peers = this.getPeers(square);
  if (peers.some((peer) => {
    return peer.value === value;
  })) {
    console.log("illegal move");
    const illegalPeers = peers.filter((peer) => {
      return peer.value === value;
    }).concat(square);
    console.log(illegalPeers);
    return [false, illegalPeers];
  } else {
    console.log("legal move");
    return [true];
  }
}

Sudoku.prototype.getPeers = function (square) {
  return square.peers.map((peer) => {
    return this.rows[peer[0]][peer[1]];
  })
}

Sudoku.prototype.getCoordsArray = function (array) {
  return array.map((square) => {
    return [square.row, square.column];
  });
}

Sudoku.prototype.getPeerCoords = function (square) {
  return square.peers;
}

Sudoku.prototype.getPeerAndSquareCoords = function (square) {
  return square.peers.concat([square.row, square.column]);
}

Sudoku.prototype.checkHiddenSingles = function (square) {
  let peerCandidates = [];
  for (var i = 0; i < this.getPeers(square).length; i++) {
    peerCandidates = peerCandidates.concat(this.getPeers(square)[i].candidates)
  }
  // peerCandidates = [...new Set(peerCandidates)];
  for (let i = 0; i < square.candidates.length; i++) {
    if (!peerCandidates.includes(square.candidates[i])) {
      this.attemptFillValue(square, square.candidates[i])
      // square.value = square.candidates[i];
      // square.candidates = [square.candidates[i]];
      // this.updatePeers(square);
    }
  }
};

Sudoku.prototype.updatePeers = function (square) {
  if (square.value !== 0) {
    for (let i = 0; i < 24; i++) {
      this.getPeers(square)[i].candidates = this.getPeers(square)[i].candidates.filter((candidate) => {
        return square.value !== candidate;
      })
    }
  }
  // for (let i = 0; i < 9; i++) {
  //   this.rows[square.row][i].candidates = this.rows[square.row][i].candidates.filter((candidate) => {
  //     return candidate !== square.candidates[0] || this.nonets[square.nonet][i] === square;
  //   });
  //   this.columns[square.column][i].candidates = this.columns[square.column][i].candidates.filter((candidate) => {
  //     return candidate !== square.candidates[0] || this.nonets[square.nonet][i] === square;
  //   });
  //   this.nonets[square.nonet][i].candidates = this.nonets[square.nonet][i].candidates.filter((candidate) => {
  //     return candidate !== square.candidates[0] || this.nonets[square.nonet][i] === square;
  //   });
  // }
};

Sudoku.prototype.fillIfForced = function (square) {
  if (square.candidates.length === 1 && square.value === 0) {
    // square.value = square.candidates[0];
    this.attemptFillValue(square, square.candidates[0]);
  }
}

Sudoku.prototype.fillOneCandidates = function () {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (this.rows[i][j].candidates.length === 1) {
        // this.rows[i][j].value = this.rows[i][j].candidates[0];
        this.attemptFillValue(this.rows[i][j], this.rows[i][j].candidates[0])
      }
    }
  }
};

Sudoku.prototype.reportOutcome = function (bool) {
  if (this.sudokuComplete()) {
    console.log("Sudoku successfully completed.");
  } else {
    console.log("Sudoku cannot be completed with current logic.");
    if (bool) {
      console.log("Some progress made.");
    } else {
      console.log("No progress made.");
    }
  }
}

Sudoku.prototype.checkUniqueness = function () {
  let unfilledSquares = [];
  for (let i = 0; i < 9; i++) {
    unfilledSquares = unfilledSquares.concat(this.emptySquares(this.rows[i]));
  }
  if (unfilledSquares.length > 3) {
    let candidateLists = unfilledSquares.map((square) => {
      return square.candidates;
    });
    if (candidateLists.some((someList) => {
      return someList.some((candidate) => {
        return candidateLists.every((otherList) => {
          return otherList.includes(candidate);
        });
      });
    }) ) {
      unfilledSquares[0].value = unfilledSquares[0].candidates[0];
      return [unfilledSquares[0].row, unfilledSquares[0].column, unfilledSquares[0].value]
    } else {
      return false;
    }
  }
}

Sudoku.prototype.handleUniqueness = function () {
  let stringified = this.stringify();
  let testSudoku = new Sudoku();
  testSudoku.populateString(stringified);
  testSudoku.solve();
  for (let i = 0; i < 5 && !testSudoku.sudokuComplete(); i++) {
    if (testSudoku.sudokuComplete()) {
      console.log("sudoku is solveable without modifications");
      return;
    } else {
      console.log("sudoku is not solveable without modifications");
      let squareToFix = testSudoku.checkUniqueness();
      if (squareToFix) {
        testSudoku.rows[squareToFix[0]][squareToFix[1]].value = squareToFix[2];
        testSudoku.solve();
        if (testSudoku.sudokuComplete()) {
          this.rows[squareToFix[0]][squareToFix[1]].value = squareToFix[2];
        }
      }
    }
  }
}



Sudoku.prototype.solve = function () {
  let previousValues = [];
  let currentValues = this.unitsCandidates(this.rows);
  this.printUnitArray(this.rows);
  while (!this.stringEquals(previousValues, currentValues)) {
    // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
    previousValues = currentValues;
    this.loopsPass();
    currentValues = this.unitsCandidates(this.rows);
  }
  this.printUnitArray(this.rows);
  this.reportOutcome(!this.stringEquals(previousValues, this.unitsNumbers(this.rows)));
  // this.reportOutcome(JSON.stringify(initialValues) !== JSON.stringify(this.unitsNumbers(this.rows)));
}

Sudoku.prototype.hint = function () {
  let previousValues = this.unitsNumbers(this.rows);
  let currentValues = this.unitsNumbers(this.rows);
    for (let i = 0; i < 10 && this.stringEquals(previousValues, currentValues); i++) {
    // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
    this.loopsPassHint();
    currentValues = this.unitsNumbers(this.rows);
  }
}

// Sudoku.prototype.untilStuck = function (callback) {
//   let previousValues = [];
//   let currentValues = this.unitsCandidates(this.rows);
//   // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
//   while (!this.stringEquals(previousValues, currentValues)) {
//     previousValues = currentValues;
//     callback();
//     currentValues = this.unitsCandidates(this.rows);
//     // this.printUnitArray(this.rows);
//   }
// }

Sudoku.prototype.loopsPass = function () {
  this.singlesLoop();
  // can think about some control flow stuff later
  this.lockedCandidatesLoop();
  this.nakedPairsLoop();
  this.hiddenPairsLoop();
}
Sudoku.prototype.loopsPassHint = function () {
  this.singlesLoopHint();
  // can think about some control flow stuff later
  // this.lockedCandidatesLoop();
  // this.nakedPairsLoop();
  // this.hiddenPairsLoop();
}

Sudoku.prototype.singlesLoop = function () {
  let previousValues = [];
  let currentValues = this.unitsCandidates(this.rows);
  while (!this.stringEquals(previousValues, currentValues)) {
    // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
    previousValues = currentValues;
    this.singlesPass();
    this.fillOneCandidates();
    currentValues = this.unitsCandidates(this.rows);
    // this.printUnitArray(this.rows);
  }
}

Sudoku.prototype.singlesLoopHint = function () {
  let previousValues = this.unitsNumbers(this.rows);
  let currentValues = this.unitsNumbers(this.rows);
  for (let i = 0; i < 10 && this.stringEquals(previousValues, currentValues); i++) {
    this.singlesPassHint();
    currentValues = this.unitsNumbers(this.rows);
    this.printUnitArray(this.rows);
  }
}

Sudoku.prototype.singlesPass = function () {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      this.checkPeers(this.rows[i][j]);
      // this.fillIfForced(this.rows[i][j]);
      // this.updatePeers(this.rows[i][j]);
      this.checkHiddenSingles(this.rows[i][j]);
      this.fillIfForced(this.rows[i][j]);
    }
  }
}
Sudoku.prototype.singlesPassHint = function () {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let previousValue = this.rows[i][j].value;
      this.checkPeers(this.rows[i][j]);
      // this.fillIfForced(this.rows[i][j]);
      // this.updatePeers(this.rows[i][j]);
      this.checkHiddenSingles(this.rows[i][j]);
      this.fillIfForced(this.rows[i][j]);
      if (this.rows[i][j].value !== previousValue) {
        break;
      }
    }
  }
}

Sudoku.prototype.singlesSolve = function () {
  let previousValues = [];
  let currentValues = this.unitsCandidates(this.rows);
  // let counter = 0;
  // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
  while (!this.stringEquals(previousValues, currentValues)) {
    previousValues = currentValues;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        console.log(this.rows[i][j].candidates);
        this.checkPeers(this.rows[i][j]);
        this.fillIfForced(this.rows[i][j]);
        this.updatePeers(this.rows[i][j]);
      }
    }
    currentValues = this.unitsCandidates(this.rows);
    // this.fillOneCandidates();
    // counter++;
    // console.log(`Attempt ${counter}:`);
    this.printUnitArray(this.rows);
  }
};

// Sudoku.prototype.lineOrNonet = function (unit) {
//
// }

Sudoku.prototype.missingNumbers = function (unit) {
  return this.completed.filter((number) => {
    return !this.unitNumbers(unit).includes(number);
  });
}

Sudoku.prototype.emptySquares = function (unit) {
  return unit.filter((square) => {
    return square.value === 0;
  });
}

// Sudoku.prototype.candidateSquares = function (missingNumber, emptySquares) {
//   return
// }

// Sudoku.prototype.sameNonet = function (squares) {
//   return (squares.length > 0) && squares.every((square) => {
//     square.nonet =
//   })
// }

Sudoku.prototype.lockedCandidatesLine = function (unit) {
  let missingNumbers = this.missingNumbers(unit);
  let emptySquares = this.emptySquares(unit);
  if (missingNumbers.length < 2 || emptySquares.length < 2) {
    return;
  }
  for (let i = 0; i < missingNumbers.length; i++) {
    let candidateSquares = emptySquares.filter((square) => {
      return square.candidates.includes(missingNumbers[i]);
    });
    if (candidateSquares.length > 0 && candidateSquares.every((candidateSquare) => {
      return candidateSquare.nonet === candidateSquares[0].nonet;
    })) {
      let eliminatedSquares = this.nonets[candidateSquares[0].nonet].filter((square) => {
        return !candidateSquares.includes(square)
      });
      for (let j = 0; j < eliminatedSquares.length; j++) {
        eliminatedSquares[j].candidates = eliminatedSquares[j].candidates.filter((candidate) => {
          return candidate !== missingNumbers[i];
        })
      }
    }
  }
};

Sudoku.prototype.lockedCandidatesNonet = function (nonet) {
  let missingNumbers = this.missingNumbers(nonet);
  let emptySquares = this.emptySquares(nonet);
  if (missingNumbers.length < 2 || emptySquares.length < 2) {
    return;
  }
  for (let i = 0; i < missingNumbers.length; i++) {
    let candidateSquares = emptySquares.filter((square) => {
      return square.candidates.includes(missingNumbers[i])
    });
    if (candidateSquares.length > 1 && candidateSquares.every((square) => {
      return square.row === candidateSquares[0].row;
    })) {
      let eliminatedSquares = this.rows[candidateSquares[0].row].filter((square) => {
        return !candidateSquares.includes(square)
      });
      for (let j = 0; j < eliminatedSquares.length; j++) {
        eliminatedSquares[j].candidates = eliminatedSquares[j].candidates.filter((candidate) => {
          return candidate !== missingNumbers[i];
        })
      }
    }
    if (candidateSquares.length > 1 && candidateSquares.every((square) => {
      return square.column === candidateSquares[0].column;
    })) {
      let eliminatedSquares = this.columns[candidateSquares[0].column].filter((square) => {
        return !candidateSquares.includes(square)
      });
      for (let j = 0; j < eliminatedSquares.length; j++) {
        eliminatedSquares[j].candidates = eliminatedSquares[j].candidates.filter((candidate) => {
          return candidate !== missingNumbers[i];
        })
      }
    }
  }
}

Sudoku.prototype.lockedCandidatesPass = function () {
  for (let i = 0; i < 9; i++) {
    this.lockedCandidatesLine(this.rows[i]);
  }
  for (let i = 0; i < 9; i++) {
    this.lockedCandidatesLine(this.columns[i]);
  }
  for (let i = 0; i < 9; i++) {
    this.lockedCandidatesNonet(this.nonets[i]);
  }
}

Sudoku.prototype.lockedCandidatesLoop = function () {
  let previousValues = [];
  let currentValues = this.unitsCandidates(this.rows);
  // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
  while (!this.stringEquals(previousValues, currentValues)) {
    previousValues = currentValues;
    this.lockedCandidatesPass();
    this.fillOneCandidates();
    currentValues = this.unitsCandidates(this.rows);
    // this.printUnitArray(this.rows);
  }
}

Sudoku.prototype.checkNakedPairs = function (unit) {
  let emptySquares = this.emptySquares(unit);
  let eliminatedSquares;
  let potentialPairs = emptySquares.filter((square) => {
    return square.candidates.length === 2;
  });
  for (let i = 0; i < potentialPairs.length; i++) {
    for (let j = 0; j < potentialPairs.length; j++) {
      if (i !== j && this.stringEquals(potentialPairs[i].candidates, potentialPairs[j].candidates)) {
        eliminatedSquares = emptySquares.filter((square) => {
          return (square !== potentialPairs[i]) && (square !== potentialPairs[j]);
        })
        for (let k = 0; k < eliminatedSquares.length; k++) {
          eliminatedSquares[k].candidates = eliminatedSquares[k].candidates.filter((candidate) => {
            return (candidate !== potentialPairs[i].candidates[0]) && (candidate !== potentialPairs[i].candidates[1]);
          })
        }
      }
    }
  }
}

Sudoku.prototype.nakedPairsPass = function () {
  for (let i = 0; i < 9; i++) {
    this.checkNakedPairs(this.rows[i]);
  }
  for (let i = 0; i < 9; i++) {
    this.checkNakedPairs(this.columns[i]);
  }
  for (let i = 0; i < 9; i++) {
    this.checkNakedPairs(this.nonets[i]);
  }
}

Sudoku.prototype.nakedPairsLoop = function () {
  let previousValues = [];
  let currentValues = this.unitsCandidates(this.rows);
  // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
  while (!this.stringEquals(previousValues, currentValues)) {
    previousValues = currentValues;
    this.nakedPairsPass();
    this.fillOneCandidates();
    currentValues = this.unitsCandidates(this.rows);
    // this.printUnitArray(this.rows);
  }
}

Sudoku.prototype.squaresWithCandidate = function (number, emptySquares) {
  return emptySquares.filter((square) => {
    return square.candidates.includes(number);
  }).length;
}

Sudoku.prototype.findPotentialPair = function (unit) {
  let missingNumbers = this.missingNumbers(unit);
  let emptySquares = this.emptySquares(unit);
  if (missingNumbers.length > 1 && emptySquares.length > 1) {
    return missingNumbers.filter((number) => {
      return this.squaresWithCandidate(number, emptySquares) === 2;
    });
  } else {
    return 0;
  }
}

// Sudoku.prototype.potentialPairs = function (unit) {
//   let missingNumbers = this.missingNumbers(unit);
//   let emptySquares = this.emptySquares(unit);
//   let potentialPairs = findPotentialPair
// }

Sudoku.prototype.checkHiddenPairs = function (unit) {
  let missingNumbers = this.missingNumbers(unit);
  let emptySquares = this.emptySquares(unit);
  let eliminatedNumbers;
  // let potentialPairs = missingNumbers.filter((number) => {
  //   return emptySquares.filter((square) => {
  //     return square.candidates.includes(number)
  //   }).length === 2;
  // });
  let potentialPairs = this.findPotentialPair(unit);

  if (potentialPairs !== 0) {
    for (let i = 0; i < potentialPairs.length; i++) {
      for (let j = 0; j < potentialPairs.length && i !== j; j++) {
        // if (i !== j && emptySquares.find((square) => {return square.candidates.includes(potentialPairs[i])}).candidates.includes(potentialPairs[j])) {
        if (i !== j && emptySquares.filter((square) => {
          return square.candidates.includes(potentialPairs[i])
        }).length === 2 && emptySquares.filter((square) => {
          return square.candidates.includes(potentialPairs[i])
        })[0].candidates.includes(potentialPairs[j])) {
          eliminatedNumbers = missingNumbers.filter((number) => {
            return (number !== potentialPairs[i]) && (number !== potentialPairs[j]);
          })
          let pairSquares = emptySquares.filter((square) => {
            return square.candidates.includes(potentialPairs[i]);
          });
          if (pairSquares.length == 2) {
            pairSquares[0].candidates = pairSquares[0].candidates.filter((candidate) => {
              return !eliminatedNumbers.includes(candidate);
            });
            pairSquares[1].candidates = pairSquares[1].candidates.filter((candidate) => {
              return !eliminatedNumbers.includes(candidate);
            });
          }
          // console.log(pairSquares);

        }
        // if (i !== j) {
        //   const pairSquares = [potentialPairs[i], potentialPairs[j]];
        // }
      }
    }
  }


}

Sudoku.prototype.hiddenPairsPass = function () {
  for (let i = 0; i < 9; i++) {
    this.checkHiddenPairs(this.rows[i]);
  }
  for (let i = 0; i < 9; i++) {
    this.checkHiddenPairs(this.columns[i]);
  }
  for (let i = 0; i < 9; i++) {
    this.checkHiddenPairs(this.nonets[i]);
  }
}

Sudoku.prototype.hiddenPairsLoop = function () {
  let previousValues = [];
  let currentValues = this.unitsCandidates(this.rows);
  // while (JSON.stringify(previousValues) !== JSON.stringify(currentValues)) {
  while (!this.stringEquals(previousValues, currentValues)) {
    previousValues = currentValues;
    this.hiddenPairsPass();
    this.fillOneCandidates();
    currentValues = this.unitsCandidates(this.rows);
    // this.printUnitArray(this.rows);
  }
}

module.exports = Sudoku;
