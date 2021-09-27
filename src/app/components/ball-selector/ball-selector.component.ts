import { Component, OnInit } from '@angular/core';
import { Functions } from 'src/utils/functions';
import { Observable } from 'rxjs';
import { Ball } from 'src/app/models/ball.model';
import { WinOrLose } from 'src/app/models/win-or-lose.model';
import { BallService } from 'src/app/services/ball/ball.service';
declare let alertify: any;

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  balls: Observable<Ball[]>;
  itemsSelected: Array<number>;
  winOrLose: WinOrLose;

  constructor(public functions: Functions, private ballService: BallService) {
    this.balls = this.ballService.getBalls();
    this.itemsSelected = new Array;
    this.winOrLose = new WinOrLose;
  }

  ngOnInit(): void { }

  showWinOrLose(value: WinOrLose) {
    this.winOrLose = value;
  }

  addItem(itemSelected: number) {
    if (this.itemsSelected.length >= 8) {
      alertify.warning('Only a maximum of 8 selections are allowed');
      return
    }
    if (this.itemsSelected.includes(itemSelected)) {
      alertify.warning('You have already selected this number');
      return
    }
    this.itemsSelected.push(itemSelected);
  }

  reset() {
    this.winOrLose = new WinOrLose;
    this.itemsSelected = new Array;
  }

}
