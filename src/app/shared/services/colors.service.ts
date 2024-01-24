import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor() {}

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomColor() {
    var h = this.randomInt(0, 360);
    var s = this.randomInt(42, 98);
    var l = this.randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  }

  generateRandomColorArray(length: number) {
    let arr: string[] = [];

    for (let i = 0; i < length; i++) arr.push(this.randomColor());
    console.log(arr);
    return arr;
  }

  getColors() {
    return this.colors;
  }

  colors = [
    'hsl(239,66%,75%)',
    'hsl(311,57%,63%)',
    'hsl(275,94%,82%)',
    'hsl(232,74%,87%)',
    'hsl(49,66%,64%)',
    'hsl(110,94%,86%)',
    'hsl(32,85%,49%)',
    'hsl(38,87%,77%)',
    'hsl(64,53%,52%)',
    'hsl(259,66%,56%)',
    'hsl(184,43%,73%)',
    'hsl(226,88%,64%)',
    'hsl(188,93%,58%)',
    'hsl(341,88%,44%)',
    'hsl(267,89%,43%)',
    'hsl(150,74%,46%)',
    'hsl(324,70%,86%)',
    'hsl(59,56%,61%)',
    'hsl(341,59%,52%)',
    'hsl(100,57%,79%)',
    'hsl(201,64%,84%)',
    'hsl(75,58%,65%)',
    'hsl(148,93%,44%)',
    'hsl(233,85%,60%)',
    'hsl(195,52%,81%)',
    'hsl(348,59%,86%)',
    'hsl(56,93%,89%)',
    'hsl(107,92%,48%)',
    'hsl(4,82%,77%)',
    'hsl(83,77%,84%)',
    'hsl(313,75%,86%)',
    'hsl(178,88%,62%)',
    'hsl(0,44%,79%)',
  ];
}
