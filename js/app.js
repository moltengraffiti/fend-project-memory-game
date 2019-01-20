

let cardList = [];
let clickCount = 0;
let moveCount = document.querySelector('.moves');
let startOver = document.querySelector('.restart');
let modalCancel=document.querySelector('.modal-exit');
let modalReplay=document.querySelector('.modal-replay');
const deck = document.querySelector('.deck');
let cardDeck = document.querySelectorAll('.deck li');
let cardArray = Array.from(cardDeck);
let clockTime = document.querySelector('.time');
let finalTime; 
let playerRating = document.querySelectorAll('.stars li');
const theModal=document.querySelector('#winModal');
const timeStat=document.querySelector('.modalTime');
const playerStat=document.querySelector('.modalRating');
const moveStat=document.querySelector('.modalMoves');
const maxMatched = 8;
let clockOn = false;
let matched = 0;
let timer = 0;
let minutes = 0;
let seconds = 0;
let starCount=playerRating.length;
let clockFunction;
let shuffledCards;

shuffleDeck();

startOver.addEventListener('click', function (click) {
    const resetTarget = click.target;
    console.log('Restart button clicked')
    resetGame();
})

modalCancel.addEventListener('click', function(){
    toggleModal();
    resetTimer();
})
modalReplay.addEventListener('click', function(){
    toggleModal();
    resetGame();
})


deck.addEventListener('click', function (event) {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') && cardList.length < 2) {
        //Replace with function isValid
        if (!clockOn) {
            startTimer();
            clockOn = true;
           // theModal.classList.toggle('modal');
        }

        if (!clickTarget.classList.contains('open') && !clickTarget.classList.contains('show') && !clickTarget.classList.contains('match')) {
            console.log('Card clicked');
            showCard(clickTarget);
            addCard(clickTarget);

            console.log('CardList is ' + cardList.length)
        }
        if (cardList.length === 2) {
            clickCounter();
            checkMatch(cardList);
        }
    }
})

function showCard(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}

function addCard(clickTarget) {
    cardList.push(clickTarget);
}

function matchCard(clickTarget) {
    clickTarget.classList.toggle('match');
}
function startTimer() {
    clockFunction = setInterval(function(){
        timer++;
        displayTime();
    }, 1000);
    
}
function displayTime(){
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    console.log('Elapsed time is now' + minutes + seconds);
    if(seconds<10){
    clockTime.innerHTML = minutes+':0'+seconds;
    }
    else{
        clockTime.innerHTML = minutes+':'+seconds;
    }
    
}

function clickCounter() {
    clickCount++;
    console.log('Clickcount is now ' + clickCount);
    if (clickCount % 8 === 0) {
       
        checkRating();
    }
    moveCount.innerHTML = clickCount;
}
function countMatch() {
    matched++;
    console.log('Pairs matched is now ' + matched);
    //moveCount.innerHTML = clickCount;
    if (matched === maxMatched) {
        console.log('The Game has been won!');
        gameOverManGameOver();
    }
}
function checkMatch(cardList) {
    if (cardList[0].firstElementChild.className === cardList[1].firstElementChild.className) {
        console.log('A Match')
        //Is there a better way to call these functions?
        matchCard(cardList[0]);
        matchCard(cardList[1]);
        showCard(cardList[0]);
        showCard(cardList[1]);
        cardList.length = 0;
        countMatch();
    }
    else {
        console.log('No Match')
        setTimeout(function () {
            showCard(cardList[0]);
            showCard(cardList[1]);
            clearArray(cardList);
        }, 1200);
    }
}

function checkRating() {
    console.log('Rating is being checked');
    for (star of playerRating) {
        if(starCount>1){
        if (star.style.display != 'none') {
            star.style.display = 'none';
            starCount--;
            break;
            
        }
    }

        /*Couldn't get the below to work, added a hidden class in the css...
        if(!star.classList.contains('hidden')){
            star.classList.add('hidden');
        }
            */
    }
}

function resetGame() {
    clearArray(cardList);
    resetCounter();
    resetMatch();
    resetTimer();
    resetStars();
    resetCards();
    shuffleDeck();
    
}

function clearArray(cardList) {
    cardList.length = 0;
}

function resetMatch() {
    matched = 0;
    console.log('Matchcount has been reset, is now ' + matched);
}

function resetCounter() {
    clickCount = 0;
    console.log('Clickcount has been reset, is now ' + clickCount);
    moveCount.innerHTML = clickCount;
}

function resetTimer() {
    clockOn = false;
    clearInterval(clockFunction);
    timer = 0;
    console.log('Clock has been reset, is now ' + timer);
}

function resetStars() {
    for (star of playerRating) {
        star.style.display = 'inline';
    }
}

function resetCards() {
    for (card of cardDeck) {
        card.className = 'card';
    }
}

function gameOverManGameOver() {
    showStats();
    toggleModal();
      
}
function toggleModal(){
    theModal.classList.toggle('modal');
}

function showStats(){
    finalTime = clockTime.innerHTML;
    timeStat.innerHTML='Total Time: ' + finalTime;
    moveStat.innerHTML='Total Moves: ' + clickCount;
    playerStat.innerHTML='Player Rating: '+ starCount;
    resetTimer();
    
    
}

function shuffleDeck() {
    shuffledCards = shuffle(cardArray);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
Core:
If a card is clicked, set to to open show, unless 1) Its open already 2) Has been matched already
add to an array and determine if a0 = a1, if it does set both to matched and clear the array,
    else remove open show ( timeout)
    Functions:
    onclick()
    showcard()
    matchcard()
    hidecard() - No
    clearArray()? - yes
    counter()
    calcScore()

Start/Reset Game:
Need to ramdomly arrange cards in the grid, default hidden
Initilise( shuffle()
Counter = 0
Stars=3
Timer = 0
)

User Info:
Reset at any time - Initialise()
Count Moves
Show Time

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */














/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




