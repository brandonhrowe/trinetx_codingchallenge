const fetch = require("node-fetch");

class Poker {
  constructor() {
    this.deck = null;
    this.hand = null;
  }
  async shuffle(num = 1) {
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${num}`
      );
      const deck = await response.json();
      this.deck = deck.deck_id;
    } catch (error) {
      console.log(error);
    }
  }

  async deal(cards = 5) {
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${
          this.deck ? this.deck : "new"
        }/draw/?count=${cards}`
      );
      const hand = await response.json();
      if (!this.deck) {
        this.deck = hand.deck_id;
      }
      this.hand = hand.cards;
      for (let i = 0; i < this.hand.length; i++) {
        console.log("\n");
        console.log(`Card ${i + 1}:`);
        console.log(`Value: ${this.hand[i].value}`);
        console.log(`Suit: ${this.hand[i].suit}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const pokerHand = new Poker();

const func = async game => {
  await game.shuffle();
  await game.deal();
};

func(pokerHand);
