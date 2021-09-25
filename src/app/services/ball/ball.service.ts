import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ball } from 'src/app/models/ball.model';

@Injectable({
  providedIn: 'root'
})
export class BallService {

  constructor() { }

  getBalls(): Observable<Ball[]> {
    return of([
      { color: "green", value: 1 },
      { color: "red", value: 2 },
      { color: "yellow", value: 3 },
      { color: "gray", value: 4 },
      { color: "pink", value: 5 },
      { color: "brown", value: 6 },
      { color: "blue", value: 7 },
      { color: "orange", value: 8 },
      { color: "purple", value: 9 },
      { color: "white", value: 10 },
    ]);
  }
}
