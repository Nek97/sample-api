import { Injectable } from '@nestjs/common';
import * as file from 'src/common/file.helpers';
import { IDay1Star2 } from 'src/dto/adventOfCode/day1.type';

@Injectable()
export class Day1Service {
  pushNewMax = (list: number[], val: number) => {
    let temp: number;
    for (let i = 0; i < list.length; i++) {
      if (val > list[i]) {
        temp = list[i];
        list[i] = val;
        val = temp;
      }
    }
    return list;
  };

  getTop3Elves(caloriesList: number[][]): number[] {
    let elveCarry = 0;
    let top3Elves = [0, 0, 0];
    caloriesList.map((elveCalories) => {
      elveCarry = 0;
      elveCalories.map((calories) => (elveCarry += calories));

      top3Elves = this.pushNewMax(top3Elves, elveCarry);
    });

    return top3Elves;
  }

  getMaxCalories(caloriesList: number[][]) {
    let elveCarry = 0;
    let maxCalories = 0;
    caloriesList.map((elveCalories) => {
      elveCalories.map((calories) => (elveCarry += calories));
      if (elveCarry > maxCalories) {
        maxCalories = elveCarry;
      }
      elveCarry = 0;
    });

    return maxCalories;
  }

  getData(): number[][] {
    const fileData = file.getFile('src/adventOfCode/day_1/input.txt');
    return file.convertNumberBuffer(fileData);
  }

  findMaxCalories(): number {
    const caloriesList = this.getData();

    return this.getMaxCalories(caloriesList);
  }

  findTop3Elves(): IDay1Star2 {
    const caloriesList = this.getData();
    const top3Elves = this.getTop3Elves(caloriesList);
    let top3Total = 0;
    top3Elves.map((calories) => (top3Total += calories));
    return { top3Elves, top3Total };
  }
}
