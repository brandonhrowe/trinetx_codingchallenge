# TriNetX Coding Challenge
### Brandon Rowe

## Instructions

### To Play:

1. cd into project director

```bash
cd /path/to/TriNetX_CodingChallenge
```

2. Run npm start script

```bash
npm start
```

Or manually run poker.js file with node

```bash
node poker.js
```

### To Run Tests:

1. cd into project director

```bash
cd /path/to/TriNetX_CodingChallenge
```

2. Run npm test script

```bash
npm test
```

Or manually run poker.specs.js file with mocha

```bash
mocha poker.specs.js
```

### To Run Game Within Files:

1. Create a new instance of the Poker class

```js
let hand = new Poker()
```

2. Call the "play" method on that instance

```js
hand.play()
```

This will call three other methods: shuffle, to create a new deck; deal, which sets five cards for the user; and topScoringHand, which outputs the highest hand with the supplied five cards.

## Assumptions

1. Because the Deck of Cards API does not include a Joker card, the program does not account for a Five of a Kind result (the highest hand now being a straight flush).

2. In order to keep all functionality contained, all properties and methods (including helper functions within the main methods) are contained within a Poker class.

3. For both testing purposes and for most usefulness as a function, the method that outputs the highest hand (Poker.prototype.topScoringHand()) returns the message, rather than console.log it. The Poker.prototype.play() method console.log's the result of this method, after also calling the shuffle and deal methods.
