// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Modify the image paths to include the 'images' folder
  const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg",
  ]; // Use actual image paths or URLs
  let cardImages = [...images, ...images]; // Duplicate images for pairs
  let gridSize = 4;
  let moves = 0;
  let timer;
  let seconds = 0;
  let hasFlippedCard = false;
  let firstCard, secondCard;
  let lockBoard = false;
  let matchedPairs = 0;

  const gameContainer = document.querySelector(".game-container");
  const startButton = document.getElementById("start-button");
  const difficultySelect = document.getElementById("difficulty");
  const timerDisplay = document.getElementById("timer");
  const scoreDisplay = document.getElementById("score");
  const statusDisplay = document.getElementById("game-status");

  startButton.addEventListener("click", startGame);
  difficultySelect.addEventListener("change", () => {
    gridSize = difficultySelect.value === "6x6" ? 6 : 4;
    resetGame();
  });

  function startGame() {
    resetGame();
    adjustCardImages();
    shuffle(cardImages);
    createBoard();
    startTimer();
  }

  function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;
    card.innerHTML = `
            <div class="front"></div>
            <div class="back"><img src="${image}" alt="Card Image"></div>
        `;
    card.addEventListener("click", flipCard);
    return card;
  }

  function createBoard() {
    gameContainer.innerHTML = "";
    const numCards = gridSize * gridSize;
    cardImages = cardImages.slice(0, numCards);
    for (let i = 0; i < numCards; i++) {
      gameContainer.appendChild(createCard(cardImages[i]));
    }
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flip");
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
      disableCards();
      matchedPairs++;
      moves++;
      scoreDisplay.textContent = `Moves: ${moves}`;
      if (matchedPairs === (gridSize * gridSize) / 2) {
        clearInterval(timer);
        setTimeout(() => {
          statusDisplay.innerHTML = '<div class="celebration">You Win!</div>';
        }, 500);
      }
    } else {
      unflipCards();
      moves++;
      scoreDisplay.textContent = `Moves: ${moves}`;
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function startTimer() {
    seconds = 0;
    timerDisplay.textContent = `Time: 00:00`;
    timer = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerDisplay.textContent = `Time: ${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function resetGame() {
    clearInterval(timer);
    moves = 0;
    matchedPairs = 0;
    scoreDisplay.textContent = `Moves: 0`;
    statusDisplay.textContent = "";
  }
  function adjustCardImages() {
    // Number of cards needed based on grid size
    const numCards = gridSize * gridSize;

    // Calculate number of pairs needed
    const numPairs = numCards / 2;

    // Create an array of pairs
    cardImages = [];

    // If you have fewer images than required, duplicate them as needed
    while (cardImages.length < numPairs) {
      cardImages.push(...images);
    }

    // Slice to the exact number of pairs needed and shuffle
    cardImages = cardImages
      .slice(0, numPairs)
      .flatMap((image) => [image, image]);
  }
});

/*document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg", // Ensure you have this many images
  ];

  let cardImages = [];
  let gridSize = 4; // Default grid size is 4x4
  let moves = 0;
  let timer;
  let seconds = 0;
  let hasFlippedCard = false;
  let firstCard, secondCard;
  let lockBoard = false;
  let matchedPairs = 0;

  const gameContainer = document.querySelector(".game-container");
  const startButton = document.getElementById("start-button");
  const difficultySelect = document.getElementById("difficulty");
  const timerDisplay = document.getElementById("timer");
  const scoreDisplay = document.getElementById("score");
  const statusDisplay = document.getElementById("game-status");

  startButton.addEventListener("click", startGame);
  difficultySelect.addEventListener("change", () => {
    gridSize = difficultySelect.value === "4x4" ? 4 : 2;
    resetGame();
  });

  function startGame() {
    resetGame();
    adjustCardImages();
    shuffle(cardImages);
    createBoard();
    startTimer();
  }

  function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;
    card.innerHTML = `
            <div class="front"></div>
            <div class="back"><img src="${image}" alt="Card Image"></div>
        `;
    card.addEventListener("click", flipCard);
    return card;
  }

  function createBoard() {
    gameContainer.innerHTML = "";
    const numCards = gridSize * gridSize;
    for (let i = 0; i < numCards; i++) {
      gameContainer.appendChild(createCard(cardImages[i]));
    }
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flip");
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
      disableCards();
      matchedPairs++;
      moves++;
      scoreDisplay.textContent = `Moves: ${moves}`;
      if (matchedPairs === (gridSize * gridSize) / 2) {
        clearInterval(timer);
        setTimeout(() => {
          statusDisplay.innerHTML = '<div class="celebration">You Win!</div>';
        }, 500);
      }
    } else {
      unflipCards();
      moves++;
      scoreDisplay.textContent = `Moves: ${moves}`;
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function startTimer() {
    seconds = 0;
    timerDisplay.textContent = `Time: 00:00`;
    timer = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerDisplay.textContent = `Time: ${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function resetGame() {
    clearInterval(timer);
    moves = 0;
    matchedPairs = 0;
    scoreDisplay.textContent = `Moves: 0`;
    statusDisplay.textContent = "";
  }

  function adjustCardImages() {
    const numCards = gridSize * gridSize;
    const numPairs = numCards / 2;

    cardImages = [];
    const uniqueImages = images.slice(0, numPairs); // Use unique images

    // Duplicate each image to create pairs
    for (let i = 0; i < numPairs; i++) {
      cardImages.push(uniqueImages[i], uniqueImages[i]);
    }

    // If cardImages is less than numCards, repeat some images
    while (cardImages.length < numCards) {
      cardImages.push(...uniqueImages);
    }

    // If cardImages is more than numCards, slice to the exact length
    cardImages = cardImages.slice(0, numCards);
  }
});
*/
