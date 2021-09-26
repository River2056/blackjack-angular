import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() btnText: string;
  @Input() btnColor: string;
  @Output() btnClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() isDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.btnClick.emit(this.btnText);
  }

}
