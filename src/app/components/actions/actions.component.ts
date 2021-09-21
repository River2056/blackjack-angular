import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameManagerService } from "../../services/game-manager.service";
import { Card } from "../../Card";
import { Actions } from '../../Actions';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Output() cardActionEmitter: EventEmitter<Actions> = new EventEmitter<Actions>();

  constructor(private gameManagerService: GameManagerService) { }

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
  }


}
