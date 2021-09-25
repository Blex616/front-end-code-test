import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ball } from 'src/app/models/ball.model';

@Injectable({
    providedIn: 'root'
})
export class Functions {

    ball!: Ball;

    getColor(iterable: Observable<Ball[]>, value: number): Ball {
        iterable.pipe(map((item: Ball[]) => item.filter(ball => ball.value === value))).subscribe((val: Ball[]) => {
            this.ball = val[0];
        })
        return this.ball;
    }
}