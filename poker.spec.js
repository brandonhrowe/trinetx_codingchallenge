const { expect } = require("chai");
const Poker = require("./poker");

describe("Poker Hand", () => {
  let hand;
  beforeEach(() => {
    hand = new Poker();
  });

  describe("straightHelper method", () => {
    it("returns false if passed in an array that is not five elements long", () => {
      let arr1 = [2, 3, 4, 5];
      let arr2 = [6, 7, 8, 9, 10, 11];
      expect(hand.straightHelper(arr1)).to.equal(false);
      expect(hand.straightHelper(arr2)).to.equal(false);
    });
    it("returns true when passed in a valid array of sequential values", () => {
      let arr1 = [2, 3, 4, 5, 6];
      let arr2 = [13, 9, 12, 11, 10];
      expect(hand.straightHelper(arr1)).to.equal(true);
      expect(hand.straightHelper(arr2)).to.equal(true);
    });
    it("returns false when passed an array of values that do not make a straight", () => {
      let arr1 = [5, 6, 7, 8, 10];
      let arr2 = [3, 4, 5, 6, 6];
      expect(hand.straightHelper(arr1)).to.equal(false);
      expect(hand.straightHelper(arr2)).to.equal(false);
    });
  });

  describe("valuesHelper method", () => {
    describe("return values", () => {
      let values = {
        2: 2,
        5: 1,
        KING: 2
      };
      it("returns an array of three items: an integer, an integer, and a boolean", () => {
        let result = hand.valuesHelper(values);
        expect(Array.isArray(result)).to.equal(true);
        expect(result.length).to.equal(3);
        expect(typeof result[0]).to.equal("number");
        expect(typeof result[1]).to.equal("number");
        expect(typeof result[2]).to.equal("boolean");
      });
    });

    describe("most frequent value", () => {
      it("returns the integer of the most frequent value", () => {
        let values1 = {
          8: 4,
          QUEEN: 1
        };
        let values2 = {
          3: 2,
          2: 3
        };
        expect(hand.valuesHelper(values1)[0]).to.equal(4);
        expect(hand.valuesHelper(values2)[0]).to.equal(3);
      });
      it("works when there are multiple top values", () => {
        let values3 = {
          ACE: 2,
          KING: 1,
          QUEEN: 2
        };
        let values4 = {
          2: 1,
          3: 1,
          4: 1,
          5: 1,
          6: 1
        };
        expect(hand.valuesHelper(values3)[0]).to.equal(2);
        expect(hand.valuesHelper(values4)[0]).to.equal(1);
      });
    });

    describe("second most frequent value", () => {
      it("returns the second highest value of use", () => {
        let values1 = {
          JACK: 3,
          KING: 2
        };
        let values2 = {
          7: 4,
          8: 1
        };
        expect(hand.valuesHelper(values1)[1]).to.equal(2);
        expect(hand.valuesHelper(values2)[1]).to.equal(1);
      });
      it("works even when there are multiple instances of same value", () => {
        let values3 = {
          2: 2,
          5: 2,
          8: 1
        };
        let values4 = {
          ACE: 1,
          KING: 1,
          QUEEN: 1,
          JACK: 1,
          10: 1
        };
        expect(hand.valuesHelper(values3)[1]).to.equal(2);
        expect(hand.valuesHelper(values4)[1]).to.equal(1);
      });
    });

    describe("straight result", () => {
      it("correctly returns whether the hand is a straight", () => {
        let values1 = {
          2: 1,
          3: 1,
          4: 1,
          5: 1,
          6: 1
        };
        let values2 = {
          9: 1,
          10: 1,
          QUEEN: 1,
          KING: 1,
          ACE: 1
        };
        let values3 = {
          5: 1,
          6: 1,
          7: 1,
          8: 2
        };
        expect(hand.valuesHelper(values1)[2]).to.equal(true);
        expect(hand.valuesHelper(values2)[2]).to.equal(false);
        expect(hand.valuesHelper(values3)[2]).to.equal(false);
      });
    });
  });

  describe("flushHelper method", () => {
    it("returns whether the hand is a flush", () => {
      let suits1 = {
        HEARTS: 5
      };
      let suits2 = {
        HEARTS: 1,
        DIAMONDS: 4
      };
      let suits3 = {
        HEARTS: 1,
        DIAMONDS: 1,
        SPADES: 1,
        CLUBS: 2
      };
      expect(typeof hand.flushHelper(suits1)).to.equal("boolean");
      expect(hand.flushHelper(suits1)).to.equal(true);
      expect(hand.flushHelper(suits2)).to.equal(false);
      expect(hand.flushHelper(suits3)).to.equal(false);
    });
  });

  describe("messageHelper method", () => {
    it("will return a straight flush", () => {
      expect(hand.messageHelper(true, true, 4, 1)).to.equal("Straight flush");
    });
    it("will return a four of a kind", () => {
      expect(hand.messageHelper(true, false, 4, 1)).to.equal("Four of a kind");
    });
    it("will return a full house", () => {
      expect(hand.messageHelper(false, true, 3, 2)).to.equal("Full house");
    });
    it("will return a flush", () => {
      expect(hand.messageHelper(true, false, 2, 1)).to.equal("Flush");
    });
    it("will return a straight", () => {
      expect(hand.messageHelper(false, true, 1, 1)).to.equal("Straight");
    });
    it("will return a three of a kind", () => {
      expect(hand.messageHelper(false, false, 3, 1)).to.equal(
        "Three of a kind"
      );
    });
    it("will return a two pair", () => {
      expect(hand.messageHelper(false, false, 2, 2)).to.equal("Two pair");
    });
    it("will return a one pair", () => {
      expect(hand.messageHelper(false, false, 2, 1)).to.equal("One pair");
    });
    it("will return high card when no other field passes", () => {
      expect(hand.messageHelper(false, false, 1, 1)).to.equal("High card");
    });
  });

  describe("topScoringHand method", () => {
    let straightFlush = [
      {
        value: "QUEEN",
        suit: "CLUBS"
      },
      {
        value: "9",
        suit: "CLUBS"
      },
      {
        value: "10",
        suit: "CLUBS"
      },
      {
        value: "JACK",
        suit: "CLUBS"
      },
      {
        value: "KING",
        suit: "CLUBS"
      }
    ];
    let fourOfAKind = [
      {
        value: "QUEEN",
        suit: "CLUBS"
      },
      {
        value: "QUEEN",
        suit: "DIAMONDS"
      },
      {
        value: "QUEEN",
        suit: "SPADES"
      },
      {
        value: "QUEEN",
        suit: "HEARTS"
      },
      {
        value: "KING",
        suit: "CLUBS"
      }
    ];
    let fullHouse = [
      {
        value: "QUEEN",
        suit: "CLUBS"
      },
      {
        value: "QUEEN",
        suit: "DIAMONDS"
      },
      {
        value: "QUEEN",
        suit: "SPADES"
      },
      {
        value: "JACK",
        suit: "HEARTS"
      },
      {
        value: "JACK",
        suit: "CLUBS"
      }
    ];
    let flush = [
      {
        value: "QUEEN",
        suit: "CLUBS"
      },
      {
        value: "7",
        suit: "CLUBS"
      },
      {
        value: "2",
        suit: "CLUBS"
      },
      {
        value: "4",
        suit: "CLUBS"
      },
      {
        value: "KING",
        suit: "CLUBS"
      }
    ];
    let straight = [
      {
        value: "3",
        suit: "CLUBS"
      },
      {
        value: "2",
        suit: "HEARTS"
      },
      {
        value: "4",
        suit: "DIAMONDS"
      },
      {
        value: "6",
        suit: "CLUBS"
      },
      {
        value: "5",
        suit: "SPADES"
      }
    ];
    let threeOfAKind = [
      {
        value: "3",
        suit: "CLUBS"
      },
      {
        value: "3",
        suit: "HEARTS"
      },
      {
        value: "3",
        suit: "DIAMONDS"
      },
      {
        value: "6",
        suit: "CLUBS"
      },
      {
        value: "5",
        suit: "SPADES"
      }
    ];
    let twoPair = [
      {
        value: "3",
        suit: "CLUBS"
      },
      {
        value: "3",
        suit: "HEARTS"
      },
      {
        value: "6",
        suit: "DIAMONDS"
      },
      {
        value: "6",
        suit: "CLUBS"
      },
      {
        value: "5",
        suit: "SPADES"
      }
    ];
    let onePair = [
      {
        value: "3",
        suit: "CLUBS"
      },
      {
        value: "3",
        suit: "HEARTS"
      },
      {
        value: "6",
        suit: "DIAMONDS"
      },
      {
        value: "7",
        suit: "CLUBS"
      },
      {
        value: "5",
        suit: "SPADES"
      }
    ];
    let highCard = [
      {
        value: "3",
        suit: "CLUBS"
      },
      {
        value: "KING",
        suit: "HEARTS"
      },
      {
        value: "6",
        suit: "DIAMONDS"
      },
      {
        value: "7",
        suit: "CLUBS"
      },
      {
        value: "5",
        suit: "SPADES"
      }
    ];
    it("returns straight flush correctly", () => {
      hand.hand = straightFlush;
      hand.topScoringHand();
      expect(hand.topScoringHand()).to.equal("Straight flush");
    });
    it("returns four of a kind correctly", () => {
      hand.hand = fourOfAKind;
      expect(hand.topScoringHand()).to.equal("Four of a kind");
    });
    it("returns full house correctly", () => {
      hand.hand = fullHouse;
      expect(hand.topScoringHand()).to.equal("Full house");
    });
    it("returns flush correctly", () => {
      hand.hand = flush;
      expect(hand.topScoringHand()).to.equal("Flush");
    });
    it("returns straight correctly", () => {
      hand.hand = straight;
      expect(hand.topScoringHand()).to.equal("Straight");
    });
    it("returns three of a kind correctly", () => {
      hand.hand = threeOfAKind;
      expect(hand.topScoringHand()).to.equal("Three of a kind");
    });
    it("returns two pair correctly", () => {
      hand.hand = twoPair;
      expect(hand.topScoringHand()).to.equal("Two pair");
    });
    it("returns one pair correctly", () => {
      hand.hand = onePair;
      expect(hand.topScoringHand()).to.equal("One pair");
    });
    it("returns high card correctly", () => {
      hand.hand = highCard;
      expect(hand.topScoringHand()).to.equal("High card");
    });
  });
});
