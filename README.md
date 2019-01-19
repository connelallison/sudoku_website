Sudoku Web-app

All desired features:
- Educational page(s) about sudoku - a bit about history, explanation of different techniques and how to use them
- A page that lets users solve a sudoku puzzle themselves - they can either request a random sudoku puzzle (provided by an API) or enter in their own one manually. The front-end ensures only legal moves are permitted to be entered.
- A feature to solve a sudoku puzzle - again either a random one requested from an API, or one entered by the user. The solver will explain to the user each step it takes and walk them through the logic, allowing them to see techniques in action and learn how to use them.
- The sudoku solver will be given increasingly advanced techniques to use when solving puzzles - starting with crosshatching, naked/hidden singles, etc - progressing as far as possible.

MVP:
The user should be able to request a random sudoku puzzle.
The user should be able to manually fill in a sudoku puzzle.
The user should be able to fill out a sudoku puzzle in the app with illegal moves being rejected.
The user should be able to have the app solve a sudoku puzzle for them.
The user should be able to create an account to track and review the puzzles they have completed.
The user should be able to read about the rules and history of sudoku.

Basic Extensions:
The user should be able to see step-by-step the logic that the solver has employed.
The user should be able to learn about basic sudoku techniques.
The user should be able to switch the colour scheme into a visually noisy mess and listen to blaring J-pop.
The user should be able to complete a puzzle that another user has completed and compare the time.

Full Extensions:
The user should be able to select a difficulty level when requesting a sudoku puzzle.
The user should be able to pencil in candidate numbers in squares.
The user should be able to use the sudoku solver with more advanced logic.
The user should be able to see more advanced logic that the solver has employed to solve harder puzzles.
The user should be able to learn about advanced sudoku techniques.





MVP:
- Page that allows the user to solve a sudoku puzzle - front-end checks each move's legality and rejects illegal moves, can confirm puzzle has been completed.
- The user can request a sudoku puzzle for them to work on.
- Alternatively, they can manually fill in a puzzle and then work on it in the app.
- The user can have the app solve a sudoku puzzle - one they enter in, one pulled from an API, or one they have attempted to solve and have given up on.
- At MVP level, the sudoku solver uses only crosshatching, naked/hidden singles, and similarly basic techniques to solve the puzzle.
- Educational section explaining the rules, and giving some information about the history of sudoku.
- Optionally, the user can create an account (with a unique username and a password).
- With an account, after completing a puzzle or giving up, the user can record the details of the attempt and store them in a database.
- A user with an account can review their attempts on a dedicated page, perhaps with some interesting stats as well.

Basic extensions:
- The solver reports to the front-end UI each logical step it takes, and the front-end explains to the user step-by-step how the solver solves the puzzle.
- There are tutorials that teach the user how to employ the basic techniques the solver has available to it.
- In the bottom right corner of the screen, there is a "CRAZY MODE" button.
- This changes the appearance of the site from professional monochrome minimalism to outrageous fuchsia and green, and similar visual mayhem. Obnoxious J-pop starts playing loudly.
- It can be reverted at any time.
- Different users can complete the same puzzle to compare speeds.

Full extensions:
- Allow support for pencilling in.
- Improve the logic of the sudoku solver - implement increasingly advanced techniques allowing it to solve increasingly difficult puzzles.
- The step-by-step explanation feature of the solver will be updated to include explanations for all additional techniques given to the solver.
- Similarly, the tutorials section will be updated with all additional techniques given to the solver.
- Provided an appropriate API is found, the user will be able to choose a difficulty level when they request a puzzle from the API.





Role Allocations:

Scrum Master: Ally
Product Owner: Connel


Main Responsibilities:

Interface and Visuals: Daniel and Kevin
In particular...
CSS: Daniel
Interface/front-end: Kevin

Logic and Back-end: Connel and Ally
In particular...
Sudoku algorithms: Connel
Server, database, account system: Ally

Additional ideas:
- Add a way for the user to import a puzzle in the form of a number string instead of having to manually enter in the numbers - for example:
000023000004000100050084090001070902093006000000010760000000000800000004060000587
would be converted into a sudoku grid, with the first 9 digits representing the values in the first row, and so on.
- In crazy mode, replace all the numbers in the grid with non-numeric symbols. For example, the number 1 might be replaced with a little image of a doge.
- Have the crazy mode button not say "CRAZY MODE" but instead say "クレージー モウド" - which is "KUREEJII MOUDO" (the closest you can get to "CRAZY MODE" using Japanese phonetics) written in katakana.
