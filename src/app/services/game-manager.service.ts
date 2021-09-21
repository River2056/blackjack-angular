import { Injectable } from '@angular/core';
import { Card } from "../Card";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  private cardPool: Card[] = [];
  private cardAlreadyDeal: boolean[] = [];
  private deckDepleted: boolean = false;

  constructor() {
    this.onInit();
  }

  onInit(): void {
    const suite: string[] = ['S', 'H', 'D', 'C'];
    const numbers: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const basePath: string = 'assets/PNG/';

    // init card pool and switches
    suite.forEach((suite, suiteIndex) => {
      numbers.forEach((number, numberIndex) => {
        const card: Card = {
          value: numberIndex + 1,
          cardFace: `${basePath}${number}${suite}.png`
        };
        if(card.value > 10) card.value = 10;
        this.cardPool.push(card);
      });
    });

    // init card switches
    this.cardAlreadyDeal = new Array(52).fill(false);
  }

  dealCard(): Card {
    this.checkIfDeckDepleted();
    if(this.deckDepleted) this.resetCardSwitch();
    let index: number;
    do {
      index = Math.floor(Math.random() * this.cardPool.length);
    } while(this.cardAlreadyDeal[index]);
    const card: Card = this.cardPool[index];
    this.cardAlreadyDeal[index] = true;
    return card;
  }

  checkIfDeckDepleted(): void {
    const falseValues = this.cardAlreadyDeal.filter(value => !value);
    if(falseValues !== null && falseValues.length === 0) {
      this.deckDepleted = true;
    }
  }

  resetCardSwitch(): void {
    this.cardAlreadyDeal = new Array(52).fill(false);
  }

  determineHandValue(cards: Card[]): number {
    let totalHandValue = cards.reduce((previousValue, currentCard) => previousValue + currentCard.value, 0);
    if(cards.length <= 2) {
      const filterForAceCard = cards.filter(card => card.value === 1);
      if(filterForAceCard !== null && filterForAceCard !== undefined && filterForAceCard.length > 0) {
        totalHandValue += 10;
      }
    }
    return totalHandValue;
  }
}
