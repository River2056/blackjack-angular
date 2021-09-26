import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Card } from "../Card";
import { CardsAndValue } from '../CardsAndValue';
import { constants } from '../constants/common-constants';

const { assetBasePath, suite, numbers } = constants;

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  private cardPool: Card[] = [];
  private cardAlreadyDeal: boolean[] = [];
  private deckDepleted: boolean = false;
  private isGameOver: boolean = false;
  private gameOverSubject: Subject<any> = new Subject();
  private isHideFirstCard: boolean = true;
  private hideFirstCardSubject: Subject<any> = new Subject();

  constructor() {
    this.onInit();
  }

  getIsHideFirstCard(): boolean {
    return this.isHideFirstCard;
  }

  setIsHideFirstCard(hide: boolean): void {
    this.isHideFirstCard = hide;
    this.hideFirstCardSubject.next(this.isHideFirstCard);
  }

  onSetIsHideFirstCard(): Observable<any> {
    return this.hideFirstCardSubject.asObservable();
  }

  getIsGameOver(): boolean {
    return this.isGameOver;
  }

  setIsGameOver(gameover: boolean): void {
    this.isGameOver = gameover;
    this.gameOverSubject.next(this.isGameOver);
  }

  onSetIsGameOver(): Observable<any> {
    return this.gameOverSubject.asObservable();
  }

  onInit(): void {
    // init card pool and switches
    suite.forEach((suite) => {
      numbers.forEach((number, numberIndex) => {
        const card: Card = {
          value: numberIndex + 1,
          cardFace: `${assetBasePath}${number}${suite}.png`,
          representation: `${number}${suite}`
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

  checkIfOver21(value: number): boolean {
    return value > 21;
  }

  checkForVictoryStatus(isPlayerBusted: boolean, isOpponentBusted: boolean, isGameOver: boolean, playerHandValue: number, opponentHandValue: number): boolean {
    if(isOpponentBusted) {
      return true;
    }

    if(isPlayerBusted) {
      return false;
    }
    
    if(!isPlayerBusted && !isOpponentBusted && isGameOver) {
      if(playerHandValue > opponentHandValue) {
        return true;
      } else if(playerHandValue <= opponentHandValue) {
        return false;
      }
    }
    return false;
  }

  resetStartingHand(): CardsAndValue {
    return {
      cards: [],
      value: 0,
      isBusted: false
    }
  }
}
