import { Injectable } from '@nestjs/common';
import * as file from 'src/common/file.helpers';
import { TFileBuffer } from 'src/common/types';
@Injectable()
export class Day6Service {
  private findStartOfPacket(input: TFileBuffer): number {
    let i = 0;
    const buffer = [input[0], input[1], input[2]];
    for (const c of input) {
      if (buffer.indexOf(c) === -1) {
        return i;
      }
      buffer.shift();
      buffer.push(c);
      i++;
    }
    return -1;
  }

  private getData(): TFileBuffer {
    const fileData = file.getFile('src/adventOfCode/day_6/input.txt');
    return fileData;
  }

  getStartOfPacketIndex() {
    const sequenze: TFileBuffer = this.getData();
    return this.findStartOfPacket(sequenze);
  }
}
