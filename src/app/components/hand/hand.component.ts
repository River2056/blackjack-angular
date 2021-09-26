import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../Card';
import { GameManagerService } from "../../services/game-manager.service";
import { constants } from '../../constants/common-constants';

const { assetBasePath } = constants;

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Output() cardsChange: EventEmitter<Card[]> = new EventEmitter<Card[]>();
  @Input() isHideFirstCard: boolean = false;
  @Output() isHideFirstCardChange = new EventEmitter<boolean>();
  @Input() isOpponentHand: boolean = false;
  assetBasePath: string = assetBasePath;

  constructor(private gameManagerService: GameManagerService) { }

  ngOnInit(): void {
  }
}
