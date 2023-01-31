import { Injectable } from '@nestjs/common';
import * as file from 'src/common/file.helpers';

@Injectable()
export class Day3Service {
  prioritiesSum(sharedItemList: number[][] | number[]) {
    let total = 0;
    sharedItemList.forEach((sharedItems) => {
      if (typeof sharedItems !== 'number') {
        sharedItems.forEach((item) => (total += item));
      } else {
        total += sharedItems;
      }
    });
    return total;
  }

  processRuckStack(ruckStack: number[]) {
    const firstRuck: number[] = [];
    const secondRuck: number[] = [];
    const sharedItems: number[] = [];
    let i = 0;

    for (; i < ruckStack.length / 2; i++) {
      firstRuck.push(ruckStack[i]);
    }
    for (; i < ruckStack.length; i++) {
      secondRuck.push(ruckStack[i]);
    }
    firstRuck.forEach((item) => {
      if (secondRuck.indexOf(item) !== -1 && sharedItems.indexOf(item) === -1) {
        sharedItems.push(item);
      }
    });
    return sharedItems;
  }

  processRuckStackGroup(ruckStackGroup: number[][]) {
    for (const item of ruckStackGroup[0]) {
      if (
        ruckStackGroup[1].indexOf(item) !== -1 &&
        ruckStackGroup[2].indexOf(item) !== -1
      ) {
        return item;
      }
    }
    return 0;
  }

  processRuckStackListForBadges(ruckstackList: number[][]) {
    let buffer: number[][] = [];
    const sharedItems: number[] = [];
    ruckstackList.map((ruckStack) => {
      buffer.push(ruckStack);
      if (buffer.length === 3) {
        sharedItems.push(this.processRuckStackGroup(buffer));
        buffer = [];
      }
    });
    return sharedItems;
  }

  processRuckStackList(ruckstackList: number[][]) {
    const sharedItems: number[][] = [];
    ruckstackList.map((ruckStack) => {
      sharedItems.push(this.processRuckStack(ruckStack));
    });
    return sharedItems;
  }

  convertBufferIntoRuckstackList(fileBuffer: number[]): any {
    let buffer: number[] = [];
    const ruckstackList: number[][] = [];
    let priority = 0;
    fileBuffer.map((charCode: number) => {
      if (charCode === 10) {
        ruckstackList.push(buffer);
        buffer = [];
      } else {
        if (charCode > 96 && charCode < 123) {
          priority = charCode - 96;
        } else if (charCode > 64 && charCode < 91) {
          priority = charCode - 38;
        }
        buffer.push(priority);
      }
    });
    if (buffer) {
      ruckstackList.push(buffer);
    }
    return ruckstackList;
  }
  getData(): number[][] {
    const fileData = file.getFile('src/adventOfCode/day_3/input.txt');
    return this.convertBufferIntoRuckstackList(fileData);
  }

  ruckstackPrioritiesSum() {
    const ruckstackList = this.getData();
    const sharedItemList = this.processRuckStackList(ruckstackList);
    return this.prioritiesSum(sharedItemList);
  }

  ruckstackBadgePrioritiesSum() {
    const ruckstackList = this.getData();
    const sharedItemList = this.processRuckStackListForBadges(ruckstackList);
    return this.prioritiesSum(sharedItemList);
  }
}
