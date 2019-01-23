const HistoryView = function(container) {
  this.container = container;
}

HistoryView.prototype.showHistory = function() {
  const historyNavButton = document.querySelector("a[href='#history']");
  historyNavButton.addEventListener('click', (event) => {
    // const formElement = document.querySelector('#new-users');
    // formElement.innerHTML = '';
    // const gridElement = document.querySelector('#users');
    // gridElement.innerHTML = '';
    this.container.innerHTML = '';
    this.renderHistoryData();
  })
}

HistoryView.prototype.renderHistoryData = function() {
  const historyHeading = document.createElement('h1');
  historyHeading.textContent = 'Sudoku History';
  this.container.appendChild(historyHeading);

  const originHeader = document.createElement('h2');
  originHeader.textContent = 'Origin';
  this.container.appendChild(originHeader);

  const originInfo = document.createElement('p');
  originInfo.textContent = "Originally called Number Place, the name Sudoku (or more correctly 数独) is a logic based number placement puzzle that is popular in Japan and consists of the Japanese characters Su(meaning 'number') and Doku (meaning 'single’). Sudoku was not invented in Japan, but originated in Switzerland and then traveled to Japan by way of America."
  this.container.appendChild(originInfo);

  const magicHeader = document.createElement('h2');
  magicHeader.textContent = 'Magic Squares';
  this.container.appendChild(magicHeader);

  const magicOneInfo = document.createElement('p');
  magicOneInfo.textContent = "Sudoku is derived from The Magic square, which was first documented in China two thousand years ago. The puzzle is both a numerical and positional problem, as all the rows, columns and diagonal lines through the grid must add up to the same number. Just as in Sudoku a number can only be used once in the grid. The aim of the puzzle is to try to devise a new ordering of the numbers to complete the puzzle starting from scratch. Solutions were considered to have mystical properties and became part of the Chinese I Ching (Book of Changes) method of telling the future."
  this.container.appendChild(magicOneInfo);

  const magicTwoInfo = document.createElement('p');
  magicTwoInfo.textContent = "The magic square reached Europe from China by way of the Arabs who brought news of many of the Chinese inventions with them along the Silk Road. Thabit ibn Qurrah (ninth century CE) is credited with introducing the magic square to the Western World."
  this.container.appendChild(magicTwoInfo);

  const magicThreeInfo = document.createElement('p');
  magicThreeInfo.textContent = "In Europe the first unequivocal appearance of the square is in Albrecht Dürer's engraving called 'Melancholia' in 1514 where a 4x4 magic square is clearly shown with an arrangement of the first sixteen numbers gives a sum of 34 in all rows, columns and both diagonals.."
  this.container.appendChild(magicThreeInfo);

  const eulerHeader = document.createElement('h2');
  eulerHeader.textContent = 'Leonard Euler';
  this.container.appendChild(eulerHeader);

  const eulerInfo = document.createElement('p');
  eulerInfo.textContent = "Mathematician Leonhard Euler is the man chiefly credited with the creation of the puzzle that we now know as Sudoku. Born in Basle, Switzerland in 1707, he both consolidated and pioneered mathematical knowledge in many areas. He moved from Basle to St Petersburg, Russia to study medicine but by the chance happenings he became the chief mathematician at the St Petersburg Academy. In 1741 he spent 25 years in Germany before returning to the Academy in Russia where he died at the grand age of 76. Even though blind for the last seventeen years of his life he still made important discoveries."
  this.container.appendChild(eulerInfo);

  const frenchHeader = document.createElement('h2');
  frenchHeader.textContent = 'French Dailies';
  this.container.appendChild(frenchHeader);

  const frenchOneInfo = document.createElement('p');
  frenchOneInfo.textContent = "Euler's immense legacy of pioneering research has been much used by mathematicians and scientists ever since but the obscure puzzle he created was not taken up by contemporaries, not even as a pastime."
  this.container.appendChild(frenchOneInfo);

  const frenchTwoInfo = document.createElement('p');
  frenchTwoInfo.textContent = "Le Siècle, a Paris daily, published a partially completed 9×9 magic square with 3×3 subsquares on November 19, 1892. It was not a Sudoku because it contained double-digit numbers and required arithmetic rather than logic to solve, but it shared key characteristics: each row, column and subsquare added up to the same number."
  this.container.appendChild(frenchTwoInfo);

  const frenchThreeInfo = document.createElement('p');
  frenchThreeInfo.textContent = "On July 6, 1895, Le Siècle's rival, La France, refined the puzzle so that it was almost a modern Sudoku. It simplified the 9×9 magic square puzzle so that each row, column, and broken diagonals contained only the numbers 1–9, but did not mark the subsquares. Although they are unmarked, each 3×3 subsquare does indeed comprise the numbers 1–9 and the additional constraint on the broken diagonals leads to only one solution."
  this.container.appendChild(frenchThreeInfo);

  const frenchFourInfo = document.createElement('p');
  frenchFourInfo.textContent = "These weekly puzzles were a feature of French newspapers such as L'Echo de Paris for about a decade, but disappeared about the time of World War I."
  this.container.appendChild(frenchFourInfo);

  const americaHeader = document.createElement('h2');
  americaHeader.textContent = 'Over to America';
  this.container.appendChild(americaHeader);

  const americaInfo = document.createElement('p');
  americaInfo.textContent = "It took another fifty years before the puzzle was introduced by Howard Garnes, a retired architect, in the American Dell magazine. Instead of requiring just rows and columns to be permutations, a new rule was introduced that split the grid into 9 regions of 3x3 squares and these regions must also have a unique occurrence of each number. This makes it a more challenging and interesting problem for people to solve. Howard Garnes called the puzzle Number Place when it was first published by Dell Puzzle Magazines, New York in 1979."
  this.container.appendChild(americaInfo);

  const pacificHeader = document.createElement('h2');
  pacificHeader.textContent = 'Across the Pacific';
  this.container.appendChild(pacificHeader);

  const pacificOneInfo = document.createElement('p');
  pacificOneInfo.textContent = "The puzzle was introduced in Japan by Nikoli in the paper Monthly Nikolist in April 1984 as Sūji wa dokushin ni kagiru (数字は独身に限る), which also can be translated as 'the digits must be single' or 'the digits are limited to one occurrence' (In Japanese, dokushin means an 'unmarried person'). At a later date, the name was abbreviated to Sudoku (数独) by Maki Kaji (鍜治 真起 Kaji Maki), taking only the first kanji of compound words to form a shorter version. 'Sudoku' is a registered trademark in Japan and the puzzle is generally referred to as Number Place (ナンバープレース Nanbāpurēsu) or, more informally, a portmanteau of the two words, Num(ber) Pla(ce) (ナンプレ Nanpure)."
  this.container.appendChild(pacificOneInfo);

  const pacificTwoInfo = document.createElement('p');
  pacificTwoInfo.textContent = "The Japanese added another element to the Sudoku puzzle. They imposed the rule that the pattern of revealed squares had to be symmetric and not just random. They also stipulated that at least 32 of the 81 initial squares in regular Sudoku should be revealed to give a reasonably tough level of difficulty."
  this.container.appendChild(pacificTwoInfo);

  const outsideHeader = document.createElement('h2');
  outsideHeader.textContent = 'Outside Japan';
  this.container.appendChild(outsideHeader);

  const outsideOneInfo = document.createElement('p');
  outsideOneInfo.textContent = "In 1997, Hong Kong judge Wayne Gould saw a partly completed puzzle in a Japanese bookshop. Over six years, he developed a computer program to produce unique puzzles rapidly. Knowing that British newspapers have a long history of publishing crosswords and other puzzles, he promoted Sudoku to The Times in Britain, which launched it on November 12, 2004 (calling it Su Doku). The first letter to The Times regarding Su Doku was published the following day on November 13 from Ian Payn of Brentford, complaining that the puzzle had caused him to miss his stop on the tube. Sudoku puzzles rapidly spread to other newspapers as a regular feature."
  this.container.appendChild(outsideOneInfo);

  const outsideTwoInfo = document.createElement('p');
  outsideTwoInfo.textContent = "In the United States, the first newspaper to publish a Sudoku puzzle by Wayne Gould was The Conway Daily Sun (New Hampshire), in 2004."
  this.container.appendChild(outsideTwoInfo);

  const variantsHeader = document.createElement('h2');
  variantsHeader.textContent = 'Variants';
  this.container.appendChild(variantsHeader);

  const variantsInfo = document.createElement('p');
  variantsInfo.textContent = "Today there are several variants such as Mini Sudoku, Nonomino, Killer Sudoku, Alphabetical Sudoku, Hyper Sudoku, Twin Sudoku, Greater Than Sudoku, Gattai 5 and Sudoku Cube."
  this.container.appendChild(variantsInfo);
}


module.exports = HistoryView;
