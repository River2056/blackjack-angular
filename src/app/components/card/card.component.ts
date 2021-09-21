import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input('left') positionLeft: string;
  @Input('card') cardFace: string;
  @Input() value: string;

  constructor() { }

  ngOnInit(): void {
  }

}
