let number = 42
let baseURL = 'https://deckofcardsapi.com/api/deck';

// Part 1
//1
async function getNumberFacts() { 
  let response = await $.getJSON({
    url: `http://numbersapi.com/${number}?json`
  });
  
  console.log(response);
}
// 2
let nums = [2,4,6,8,9,65,234]
async function getMultiNumFacts(){
  let response= await $.getJSON({url: `http://numbersapi.com/${nums}?json`});
  console.log(response);
}

//3
let factNum = 44

async function getFourFacts() {
  for (let i = 0; i < 4; i++) {
    try {
      let response = await $.getJSON(`http://numbersapi.com/${factNum}?json`);
      console.log(response);
      $('body').append(`<p>${response.text}</p>`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

//Part 2
//1


async function drawCard() {
  let data = await $.getJSON(`${baseURL}/new/draw/`);
  let card = data.cards[0]
  let suit = card.suit;
  let value = card.value;
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

//2
async function drawTwoCards() {
  let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
  let deckId = firstCardData.deck_id;
  let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
  [firstCardData, secondCardData].forEach(card => {
    let suit = card.cards[0].suit;
    let value = card.cards[0].value;
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  })};

  //3
async function setup() {
  let $btn = $('button');
  let $cardArea = $('#card-area');

  let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
  $btn.show().on('click', async function() {
    let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
    let cardSrc = cardData.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $('<img>', {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      })
    );
    if (cardData.remaining === 0) $btn.remove();
  });
}
setup();


