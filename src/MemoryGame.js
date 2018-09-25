import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Card from './Card';
import NavBar from './NavBar';

  //-- A card can be one of the 3 states
  //-- HIDING   - This card is not being shown
  //-- SHOWING  - This card is being shown but does not have a match yet
  //-- MATCHING - This card is being shown and also has a match. A card can never move from MATCHING to any other state during game play.
  const CardState = {
    HIDING: 0,
    SHOWING: 1,
    MATCHING: 2
  }

class MemoryGame extends Component {
  
  constructor(props) {
    super(props);

    //-- Define the cards we will use for our state
    let cards = [
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
    ];
    cards = shuffle(cards);
    this.state = {cards, noClick: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  /*
   * If 2 cards are visible and they don't match, they should be flipped back
   * But, if 2 cards are visible and they do match, then they stay
  */
  handleClick(id) {
    //-- This has 3 arguments, cards: Array of cards, ids we want to change & state we want to change into
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    //-- This is the card that was just clicked on
    const foundCard = this.state.cards.find(c => c.id === id);

    //-- Finding if the card we clicked on - if noClick flag is true or if it is already not in hiding, 
    //-- we do not want to do anything, so we just return!
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    //-- We will use this to decide if the user can click again or not
    //-- If 0 or 1 non-matches showing, then user can click. 
    //-- If 2 non matches are showing, user cannot click for sometime
    
    //-- We can use mapCardState function, and map the card we clicked on to be showing
    //-- let's filter that to get only showing cards back
    const showingCards = cards.filter(c => c.cardState === CardState.SHOWING);
    const ids = showingCards.map(c => c.id); //-- return only array of the id of the showing cards

    //-- Checking to see if 2 cards are showing and their background colors match
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
          cards = mapCardState(cards, ids, CardState.MATCHING);
    }
    else if (showingCards.length == 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      noClick = true;
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
            //-- set the state of the cards to HIDING after 1.3 secs
            this.setState({cards: hidingCards, noClick:false});
        }, 1300);
      });
      return;
    }

    //-- One card showing which is not matched or 2 cards showing that now do match
    this.setState({cards, noClick});
  }

  /* Reset the game
   * Iterate over every card & then set card state to hiding
   * Shuffle the cards
   * Set the shuffled cards to the state
   * setState will cause the render() to be invoked, causing a new game
  */
  handleNewGame() {
    let cards = this.state.cards.map(c => (
      {
        ...c,
        cardState: CardState.HIDING
      }
    ));
    cards = shuffle(cards);
    this.setState({cards});
  }

  render() {
    const cards = this.state.cards.map(card => (
      <Card 
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
      />
    ));
    return (
      <div>
        <NavBar onNewGame={this.handleNewGame} />
        {cards}
      </div>
    );
  }
}

export default MemoryGame;
