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
      console.log(this)
    } catch (error) {
      console.log(error);
    }
  }

}

const pokerHand = new Poker();

pokerHand.shuffle(1);
