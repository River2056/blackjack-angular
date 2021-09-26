import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameManagerService } from 'src/app/services/game-manager.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  @Input() playerHandValue: number;
  @Input() opponentHandValue: number;
  @Input() isHideFirstCard:  boolean = false;
  @Output() isHideFirstCardChange = new EventEmitter<boolean>();
  @Input() isPlayerBusted: boolean = false;
  @Input() isOpponentBusted: boolean = false;

  isGameOver: boolean = false;
  gameOverSubscription: Subscription;

  thenBlock: TemplateRef<any> | null = null;
  @ViewChild('defaultBlock', { static: true }) defaultBlock: TemplateRef<any> | null = null
  @ViewChild('playerWonBlock', { static: true }) playerWonBlock: TemplateRef<any> | null = null;
  @ViewChild('opponentWonBlock', { static: true }) opponentWonBlock: TemplateRef<any> | null = null;

  constructor(private gameManagerService: GameManagerService) {
    this.gameOverSubscription = this.gameManagerService.onSetIsGameOver().subscribe(value => this.isGameOver = value);
  }

  ngOnInit(): void {
    this.thenBlock = this.defaultBlock;
  }

  ngOnChanges(): void {
    if(this.isGameOver) {
      this.thenBlock = 
      this.gameManagerService.checkForVictoryStatus(this.isPlayerBusted, this.isOpponentBusted, this.isGameOver, this.playerHandValue, this.opponentHandValue) ?
      this.playerWonBlock : this.opponentWonBlock;
    } else {
      this.thenBlock = this.defaultBlock;
    }
  }

}
