import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  @Input() playerHandValue: number;
  @Input() opponentHandValue: number;

  constructor() { }

  ngOnInit(): void {
  }

}
