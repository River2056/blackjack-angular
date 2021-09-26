import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameManagerService } from "../../../services/game-manager.service";
import { Card } from "../../../Card";
import { Actions } from '../../../Actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Output() cardActionEmitter: EventEmitter<Actions> = new EventEmitter<Actions>();
  isGameOver: boolean = this.gameManagerService.getIsGameOver();
  subscription: Subscription;

  constructor(private gameManagerService: GameManagerService) {
    this.subscription = this.gameManagerService.onSetIsGameOver().subscribe(value => this.isGameOver = value)
  }

  ngOnInit(): void {
  }

  onDealAction(text: string): void {
    console.log(text);
    const action: Actions = {
      actionType: text,
      card: null
    }
    this.cardActionEmitter.emit(action);
  }

  onHitAction(text: string): void {
    console.log(text);
    const card: Card = this.gameManagerService.dealCard();
    const action: Actions = {
      actionType: text,
      card: card
    };
    this.cardActionEmitter.emit(action);
  }

  onStandAction(text: string): void {
    console.log(text);
    const action: Actions = {
      actionType: text,
      card: null
    }
    this.cardActionEmitter.emit(action);
  }


}
