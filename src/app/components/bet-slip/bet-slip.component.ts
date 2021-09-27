import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Functions } from 'src/utils/functions';
import { Observable } from 'rxjs';
import { Ball } from 'src/app/models/ball.model';
import { WinOrLose } from 'src/app/models/win-or-lose.model';
declare let alertify: any;

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

  @Input() itemsSelected!: Array<number>;
  @Input() balls!: Observable<Ball[]>;
  @Output() winOrLoseEvent = new EventEmitter<WinOrLose>();

  betValue: number;
  totalBetValue: number;
  moneyAvailable: number;

  constructor(public functions: Functions) {
    this.betValue = 0;
    this.totalBetValue = 0;
    this.moneyAvailable = 10000;
  }

  ngOnInit(): void { }

  winOrLose(value: WinOrLose) {
    this.winOrLoseEvent.emit(value);
  }

  dropSelection(item: number) {
    const index = this.itemsSelected.indexOf(item);
    if (index !== -1) {
      this.itemsSelected.splice(index, 1);
    }
  }

  totalValue() {
    if (this.betValue && this.betValue > 0) {
      this.totalBetValue = this.betValue * 5;
    } else {
      alertify.error("Please enter a correct value");
    }
  }

  playBet() {
    if (this.totalBetValue < 5) {
      alertify.error("The minimum bet is 5 €");
      return
    }
    if (this.totalBetValue > this.moneyAvailable) {
      alertify.error("You don't have enough funds");
      this.betValue = 0;
      this.totalBetValue = 0;
      return
    }
    if (this.itemsSelected?.length) {
      const random = this.getRandomInt(1, 10);
      const checkNumber = this.itemsSelected.includes(random);
      if (!checkNumber) {
        this.moneyAvailable -= this.totalBetValue;
        this.winOrLose({
          number: random,
          text: `YOU LOST: ${this.totalBetValue} €`,
          color: "red"
        })
      } else {
        const winValue = this.totalBetValue * 1.5;
        this.moneyAvailable += winValue;
        this.winOrLose({
          number: random,
          text: `YOU WOM: ${winValue} €`,
          color: "green",
        })
      }
    } else {
      alertify.error("You must select a number");
    }
  }

  getRandomInt(min: number, max: number) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

}
