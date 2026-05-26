import React, { useState, useEffect, useCallback } from 'react';
import styles from './Solitaire.module.css';

type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  isFaceUp: boolean;
}

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const getSuitSymbol = (suit: Suit) => {
  switch (suit) {
    case 'spades': return '♠';
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
  }
};

const isRed = (suit: Suit) => suit === 'hearts' || suit === 'diamonds';

const Solitaire: React.FC = () => {
  const [stock, setStock] = useState<Card[]>([]);
  const [waste, setWaste] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []]);

  const initGame = useCallback(() => {
    const deck: Card[] = [];
    SUITS.forEach(suit => {
      RANKS.forEach(rank => {
        deck.push({ id: `${suit}-${rank}`, suit, rank, isFaceUp: false });
      });
    });

    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    const newTableau: Card[][] = [[], [], [], [], [], [], []];
    let cardIndex = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        const card = deck[cardIndex++];
        if (j === i) card.isFaceUp = true;
        newTableau[i].push(card);
      }
    }

    setTableau(newTableau);
    setStock(deck.slice(cardIndex));
    setWaste([]);
    setFoundations([[], [], [], []]);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const drawCard = () => {
    if (stock.length === 0) {
      if (waste.length === 0) return;
      setStock([...waste].reverse().map(c => ({ ...c, isFaceUp: false })));
      setWaste([]);
    } else {
      const newStock = [...stock];
      const card = newStock.pop()!;
      setWaste([...waste, { ...card, isFaceUp: true }]);
      setStock(newStock);
    }
  };

  const handleCardClick = (card: Card, source: string, sourceIndex: number) => {
    // Basic auto-move logic: try to move to foundations first, then tableau
    // For now, let's just implement moving from waste to foundations or tableau
    
    if (source === 'waste') {
      // Try foundations
      const foundIdx = foundations.findIndex(f => {
        if (f.length === 0) return card.rank === 'A';
        const top = f[f.length - 1];
        return top.suit === card.suit && RANKS.indexOf(card.rank) === RANKS.indexOf(top.rank) + 1;
      });

      if (foundIdx !== -1) {
        const newFoundations = [...foundations];
        newFoundations[foundIdx] = [...newFoundations[foundIdx], card];
        setFoundations(newFoundations);
        setWaste(waste.slice(0, -1));
        return;
      }

      // Try tableau
      const tabIdx = tableau.findIndex(t => {
        if (t.length === 0) return card.rank === 'K';
        const top = t[t.length - 1];
        return isRed(top.suit) !== isRed(card.suit) && RANKS.indexOf(top.rank) === RANKS.indexOf(card.rank) + 1;
      });

      if (tabIdx !== -1) {
        const newTableau = [...tableau];
        newTableau[tabIdx] = [...newTableau[tabIdx], card];
        setTableau(newTableau);
        setWaste(waste.slice(0, -1));
        return;
      }
    }

    if (source === 'tableau') {
      // Only handle top card for now
      const pile = tableau[sourceIndex];
      const cardInPileIndex = pile.findIndex(c => c.id === card.id);
      if (cardInPileIndex !== pile.length - 1) return; // Not top card

      // Try foundations
      const foundIdx = foundations.findIndex(f => {
        if (f.length === 0) return card.rank === 'A';
        const top = f[f.length - 1];
        return top.suit === card.suit && RANKS.indexOf(card.rank) === RANKS.indexOf(top.rank) + 1;
      });

      if (foundIdx !== -1) {
        const newFoundations = [...foundations];
        newFoundations[foundIdx] = [...newFoundations[foundIdx], card];
        setFoundations(newFoundations);
        
        const newTableau = [...tableau];
        const newPile = [...pile.slice(0, -1)];
        if (newPile.length > 0) newPile[newPile.length - 1].isFaceUp = true;
        newTableau[sourceIndex] = newPile;
        setTableau(newTableau);
        return;
      }
    }
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.menuBar}>
        <div className={styles.menuItem} onClick={initGame}>Game</div>
        <div className={styles.menuItem}>Help</div>
      </div>
      
      <div className={styles.board}>
        <div className={styles.topSection}>
          <div className={styles.stockSection}>
            <div className={styles.pile} onClick={drawCard}>
              {stock.length > 0 && <div className={`${styles.card} ${styles.cardBack}`}></div>}
              {stock.length === 0 && <div className={styles.emptyPile}>🔄</div>}
            </div>
            <div className={styles.pile}>
              {waste.length > 0 && (
                <div 
                  className={`${styles.card} ${isRed(waste[waste.length-1].suit) ? styles.red : ''}`}
                  onClick={() => handleCardClick(waste[waste.length-1], 'waste', 0)}
                >
                  <span className={styles.rank}>{waste[waste.length-1].rank}</span>
                  <span className={styles.suit}>{getSuitSymbol(waste[waste.length-1].suit)}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.foundations}>
            {foundations.map((f, i) => (
              <div key={i} className={styles.pile}>
                {f.length === 0 ? (
                  <div className={styles.emptyPile}>A</div>
                ) : (
                  <div className={`${styles.card} ${isRed(f[f.length-1].suit) ? styles.red : ''}`}>
                    <span className={styles.rank}>{f[f.length-1].rank}</span>
                    <span className={styles.suit}>{getSuitSymbol(f[f.length-1].suit)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tableau}>
          {tableau.map((pile, i) => (
            <div key={i} className={styles.pile}>
              {pile.map((card, j) => (
                <div 
                  key={card.id}
                  className={`${styles.card} ${card.isFaceUp ? '' : styles.cardBack} ${card.isFaceUp && isRed(card.suit) ? styles.red : ''}`}
                  style={{ top: `${j * 15}px`, zIndex: j }}
                  onClick={() => card.isFaceUp && handleCardClick(card, 'tableau', i)}
                >
                  {card.isFaceUp && (
                    <>
                      <span className={styles.rank}>{card.rank}</span>
                      <span className={styles.suit}>{getSuitSymbol(card.suit)}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solitaire;
