import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
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

  convertbuffer(fileBuffer: number[]): number[][] {
    let num = 0;
    let buffer: number[] = [];
    const elves: number[][] = [];
    let save = false;
    fileBuffer.map((charCode: number) => {
      if (charCode === 10) {
        if (save) {
          elves.push(buffer);
          buffer = [];
          save = false;
        } else {
          buffer.push(num);
          num = 0;
          save = true;
        }
      } else {
        save = false;
        num = num * 10 + charCode - 48;
      }
    });
    return elves;
  }

  getFile(): any {
    const file = readFileSync(
      join(process.cwd(), 'src/adventOfCode/day_1/input.txt'),
    ).toJSON().data;
    return file;
  }

  getData(): number[][] {
    const fileData = this.getFile();
    return this.convertbuffer(fileData);
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
