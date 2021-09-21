import {Component, Input, OnInit} from '@angular/core';
import { Card } from '../../Card';
import {GameManagerService} from "../../services/game-manager.service";

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() cards: Card[] = [];

  constructor(private gameManagerService: GameManagerService) { }

  ngOnInit(): void {
  }

}
