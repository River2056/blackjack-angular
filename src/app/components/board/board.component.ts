import { Component, OnInit } from '@angular/core';
import {Card} from "../../Card";
import {GameManagerService} from "../../services/game-manager.service";
import {Actions} from "../../Actions";
import {CardsAndValue} from "../../CardsAndValue";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  player: CardsAndValue = {
    cards: [],
    value: 0
  };
  opponent: CardsAndValue = {
    cards: [],
    value: 0
  };

  constructor(private gameManagerService: GameManagerService) { }

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
    switch(action.actionType) {
      case 'HIT':
        if(action.card !== null) {
          this.player.cards.push(action.card);
        }
        this.player.value = this.gameManagerService.determineHandValue(this.player.cards);
        break;
      case 'STAND':
        break;
    }
  }

}
