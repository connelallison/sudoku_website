Summary of Sudoku Solver file structure:

For the sake of clearer organisation and readability, the sudoku logic is separated into several files containing methods involved in specific tasks.

- sudoku_spec.js is the test file, located inside the models/specs folder. If you want to run the tests yourself, remember to make sure mocha is installed, and that the command to run the tests is "npm test".
- sudoku_solver.js is located in the models folder. It is responsible for running the sudoku logic files and all communication with the rest of the program.
- square_constructor.js is located inside the models/sudoku_logic folder. It is responsible for constructing Square objects.
- sudoku_constructor.js is located inside the models/sudoku_logic folder. It is responsible for constructing blank Sudoku objects.
- sudoku_helpers.js is located inside the models/sudoku_logic folder. It is responsible for various small tasks commonly carried out across different files.
- sudoku_populate.js is located inside the models/sudoku_logic folder. It is responsible for populating blank Sudoku objects with supplied values.
- sudoku_basic_logic.js is located inside the models/sudoku_logic folder. It is currently empty, but when updated will be responsible for the logic involved in using basic sudoku techniques to solve an easy puzzle.

Dependencies:
( "x >> y"  means that x is dependent on y. )

sudoku_spec.js >> sudoku_solver.js >> sudoku_populate.js >> sudoku_helpers.js >> sudoku_constructor.js >> square_constructor.js



Methods by file location:

square_constructor.js
- Square object constructor function
- nonetFromXY() method

sudoku_constructor.js
- Sudoku object constructor function
- makeGrid() method
- constructRows() method
- constructColumns() method
- constructNonets() method

sudoku_helpers.js
- unitNumbers() method
- unitsNumbers() method
- unitComplete() method
- sudokuComplete() method
- printUnitArray() method
- checkPeers() method

sudoku_populate.js
- populate2dArray() method
- constructCandidates() method
