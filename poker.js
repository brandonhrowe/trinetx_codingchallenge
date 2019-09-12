const fetch = require("node-fetch");

class Poker {
  constructor() {
    this.deck = null;
    this.hand = null;
    this.rankings = {
      ACE: 14,
      KING: 13,
      QUEEN: 12,
      JACK: 11,
      10: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2
    };
  }
  async shuffle(num = 1) {
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${num}`
      );
      const json = await response.json();
      this.deck = json.deck_id;
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
      const json = await response.json();
      if (!this.deck) {
        this.deck = json.deck_id;
      }
      this.hand = json.cards;
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

  straightHelper(arr) {
    arr.sort((a, b) => a - b);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i + 1] - arr[i] !== 1) {
        return false;
      }
    }
    return true;
  }

  valuesHelper(values) {
    let mostFrequent = 0;
    let secondMostFrequent = 0;
    let valuesArr = [];
    let straight = true;
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        if (values[key] >= mostFrequent) {
          secondMostFrequent = mostFrequent;
          mostFrequent = values[key];
        } else if (values[key] > secondMostFrequent) {
          secondMostFrequent = values[key];
        }
        if (values[key] > 1) {
          straight = false;
        }
        valuesArr.push(this.rankings[key]);
      }
    }
    if (straight) {
      straight = this.straightHelper(valuesArr);
    }
    return [mostFrequent, secondMostFrequent, straight];
  }

  flushHelper(suits) {
    for (let key in suits) {
      if (suits[key] === 5) return true;
    }
    return false;
  }

  messageHelper(flush, straight, mostFrequent, secondMostFrequent) {
    let message;
    if (flush && straight) {
      message = "Straight flush";
    } else if (mostFrequent === 4) {
      message = "Four of a kind";
    } else if (mostFrequent === 3 && secondMostFrequent === 2) {
      message = "Full house";
    } else if (flush) {
      message = "Flush";
    } else if (straight) {
      message = "Straight";
    } else if (mostFrequent === 3) {
      message = "Three of a kind";
    } else if (mostFrequent === 2 && secondMostFrequent === 2) {
      message = "Two pair";
    } else if (mostFrequent === 2) {
      message = "One pair";
    } else {
      message = "High card";
    }
    return message;
  }

  topScoringHand() {
    let values = {};
    let suits = {};

    let flush;
    let straight;
    let mostFrequent;
    let secondMostFrequent;

    for (let i = 0; i < this.hand.length; i++) {
      let value = this.hand[i].value;
      let suit = this.hand[i].suit;

      if (!values[value]) {
        values[value] = 1;
      } else {
        values[value]++;
      }

      if (!suits[suit]) {
        suits[suit] = 1;
      } else {
        suits[suit]++;
      }
    }
    [mostFrequent, secondMostFrequent, straight] = this.valuesHelper(values);
    flush = this.flushHelper(suits);

    let message = this.messageHelper(
      flush,
      straight,
      mostFrequent,
      secondMostFrequent
    );

    console.log("\n");
    console.log("Your top scoring hand is:");
    console.log(message);
  }

  async play() {
    await this.shuffle();
    await this.deal();
    this.topScoringHand();
  }
}

module.exports = Poker;

if (typeof require !== 'undefined' && require.main === module) {
  const pokerHand = new Poker();
  pokerHand.play();
}
