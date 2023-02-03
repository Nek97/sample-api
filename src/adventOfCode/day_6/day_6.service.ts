import { Injectable } from '@nestjs/common';
import * as file from 'src/common/file.helpers';
import { TFileBuffer } from 'src/common/types';

@Injectable()
export class Day6Service {
  private checkBuffer(_buffer: number[]): boolean {
    const buffer = [..._buffer];
    for (; buffer.length; ) {
      if (buffer.indexOf(buffer.shift() ?? 0) !== -1) {
        return false;
      }
    }
    console.log(buffer);
    return true;
  }

  private findMessageMarker(input: TFileBuffer): number {
    let i = 0;
    const buffer: number[] = [];
    for (i = 0; i < 13; i++) {
      buffer.push(input[i]);
    }
    for (i; i < input.length; i++) {
      if (buffer.indexOf(input[i]) === -1) {
        if (this.checkBuffer(buffer)) return i + 1;
      }
      buffer.shift();
      buffer.push(input[i]);
    }
    return -1;
  }

  private findStartOfPacket(input: TFileBuffer): number {
    let i = 0;
    const buffer = [input[0], input[1], input[2]];
    for (const c of input) {
      console.log(buffer, c);
      if (buffer.indexOf(c) === -1) {
        if (
          buffer[0] !== buffer[1] &&
          buffer[0] !== buffer[2] &&
          buffer[1] !== buffer[2]
        )
          return i + 1;
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

  getStartOfMessageIndex() {
    const sequenze: TFileBuffer = this.getData();
    return this.findMessageMarker(sequenze);
  }
}
