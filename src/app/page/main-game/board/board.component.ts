import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameManagerService } from "../../../services/game-manager.service";
import { Actions } from "../../../Actions";
import { CardsAndValue } from "../../../CardsAndValue";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  player: CardsAndValue = this.gameManagerService.resetStartingHand();
  opponent: CardsAndValue = this.gameManagerService.resetStartingHand();
  isHideFirstCard: boolean = this.gameManagerService.getIsHideFirstCard();
  isGameOver: boolean = this.gameManagerService.getIsGameOver();
  gameOverSubscription: Subscription;
  hideFirstCardSubscription: Subscription;

  constructor(private gameManagerService: GameManagerService) { 
    this.gameOverSubscription = this.gameManagerService.onSetIsGameOver().subscribe(value => this.isGameOver = value);
    this.hideFirstCardSubscription = this.gameManagerService.onSetIsHideFirstCard().subscribe(value => this.isHideFirstCard = value);
  }

  ngOnInit(): void {
    this.initializeHandAndValue(this.player);
    this.initializeHandAndValue(this.opponent);
  }

  initializeHandAndValue(hand: CardsAndValue) {
    hand.cards.push(this.gameManagerService.dealCard());
    hand.cards.push(this.gameManagerService.dealCard());
    hand.value = this.gameManagerService.determineHandValue(hand.cards);
  }

  handleCardAction(action: Actions): void {
    let checkIfOver21 = false;
    switch(action.actionType) {
      case 'HIT':
        if(action.card !== null) {
          this.player.cards.push(action.card);
        }
        this.player.value = this.gameManagerService.determineHandValue(this.player.cards);
        checkIfOver21 = this.gameManagerService.checkIfOver21(this.player.value);
        if(checkIfOver21) {
          this.player.isBusted = true;
          this.gameManagerService.setIsGameOver(true);
        }
        console.log('isGameOver: ', this.isGameOver);
        break;
      case 'STAND':
        // player phase ended, opponent starts getting cards
        // show first card
        console.log('stand in boardComponent: ');
        this.gameManagerService.setIsHideFirstCard(false);
        while(this.opponent.value < 16) {
          const card = this.gameManagerService.dealCard();
          this.opponent.cards.push(card);
          this.opponent.value = this.gameManagerService.determineHandValue(this.opponent.cards);
        }

        // over 16, check if value exceeds 21
        checkIfOver21 = this.gameManagerService.checkIfOver21(this.opponent.value);
        if(checkIfOver21) {
          this.opponent.isBusted = true;
          this.gameManagerService.setIsGameOver(true);
        } else {
          // opponent stopped getting cards, and value isn't busted
          // check for victory status
          let checkForVictoryStatus = this.gameManagerService.checkForVictoryStatus(this.player.isBusted, this.opponent.isBusted, this.isGameOver, this.player.value, this.opponent.value);
          this.gameManagerService.setIsGameOver(true);
        }
        break;
      case 'DEAL':
        this.player = this.gameManagerService.resetStartingHand();
        this.opponent = this.gameManagerService.resetStartingHand();
        this.gameManagerService.resetCardSwitch();
        this.initializeHandAndValue(this.player);
        this.initializeHandAndValue(this.opponent);
        this.player.value = this.gameManagerService.determineHandValue(this.player.cards);
        this.opponent.value = this.gameManagerService.determineHandValue(this.opponent.cards);
        this.isHideFirstCard = true;
        this.gameManagerService.setIsGameOver(false);
        break;
    }
  }

}
