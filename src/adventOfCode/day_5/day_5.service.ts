import { Injectable } from '@nestjs/common';
import {
  AsciiCode,
  converUpperCaseAscii,
  isAsciiLetter,
  isAsciiNumber,
  numFromAscii,
} from 'src/common/ascii.helper';
import { ErrorEnum } from 'src/common/error.enum';
import * as file from 'src/common/file.helpers';
import { TFileBuffer, TUppercaseChar } from 'src/common/types';
import {
  ICrateBuffer,
  ICrateLogistic,
  TcrateStackList,
  TProcedureList,
} from 'src/dto/adventOfCode/day5.type';

const CrateMover9000 = 9000;
const CrateMover9001 = 9001;

@Injectable()
export class Day5Service {
  private processProcedureBuffer(buffer: TFileBuffer): TProcedureList {
    let num = 0;
    let procedureBuffer: number[] = [];
    const procedureList: TProcedureList = [];

    buffer.forEach((c) => {
      if (isAsciiNumber(c)) {
        num = num * 10 + numFromAscii(c);
      } else if (num) {
        procedureBuffer.push(num);
        num = 0;
      }
      if (procedureBuffer.length === 3) {
        procedureList.push({
          many: procedureBuffer[0],
          from: procedureBuffer[1],
          to: procedureBuffer[2],
        });
        procedureBuffer = [];
      }
    });
    return procedureList;
  }

  private processStackBuffer(
    buffer: TFileBuffer,
    numberOfStack: number,
  ): TcrateStackList {
    const crateStackList: TcrateStackList = [];
    for (numberOfStack; numberOfStack > 0; numberOfStack--) {
      crateStackList.push([]);
    }
    let i = 0;
    let crateIndex = 0;
    buffer.forEach((c) => {
      if (c === AsciiCode.LF) {
        crateIndex = 0;
        i = 0;
      }
      if (isAsciiLetter(c)) {
        crateStackList[crateIndex].push(converUpperCaseAscii(c));
      }
      if (i && i % 4 === 0) {
        crateIndex++;
      }
      i++;
    });
    crateStackList.map((crateStack) => {
      crateStack.reverse();
    });

    return crateStackList;
  }

  private splitBuffer(buffer: TFileBuffer): ICrateBuffer {
    const crateBuffer: ICrateBuffer = {
      procedure: [],
      stack: [],
      numberOfStack: 0,
    };
    let saveIntoProcedure = false;
    let isCrateIndexLine = false;
    buffer.forEach((c) => {
      if (c === AsciiCode.LOW_m) {
        saveIntoProcedure = true;
      }
      if (c === AsciiCode.NUM_1) {
        isCrateIndexLine = true;
      }
      if (saveIntoProcedure) {
        crateBuffer.procedure.push(c);
      } else {
        if (isCrateIndexLine) {
          if (isAsciiNumber(c)) {
            crateBuffer.numberOfStack = numFromAscii(c);
          }
        } else {
          crateBuffer.stack.push(c);
        }
      }
    });
    return crateBuffer;
  }

  private convertBufferIntoCrateLogistic(buffer: TFileBuffer): ICrateLogistic {
    const crateBuffer: ICrateBuffer = this.splitBuffer(buffer);
    const crateLogistic: ICrateLogistic = {
      crateStackList: this.processStackBuffer(
        crateBuffer.stack,
        crateBuffer.numberOfStack,
      ),
      rearrangmentProcedureList: this.processProcedureBuffer(
        crateBuffer.procedure,
      ),
    };
    return crateLogistic;
  }

  private getData() {
    const fileData = file.getFile('src/adventOfCode/day_5/input.txt');
    return this.convertBufferIntoCrateLogistic(fileData);
  }

  private rearrangeCrates(crateLogistic: ICrateLogistic, crateMover = 9000) {
    let i = 0;
    const buffer: TUppercaseChar[] = [];
    let crate: TUppercaseChar | undefined;
    crateLogistic.rearrangmentProcedureList.forEach((procedure) => {
      for (i = 0; i < procedure.many; i++) {
        crate = crateLogistic.crateStackList[procedure.from - 1].pop();
        if (typeof crate !== 'undefined') {
          buffer.push(crate);
        } else {
          throw new Error(ErrorEnum.BAD_INDEX);
        }
      }
      if (crateMover === CrateMover9000) {
        buffer.forEach((crate) => {
          crateLogistic.crateStackList[procedure.to - 1].push(crate);
        });
      } else if (crateMover === CrateMover9001) {
        for (i = 0; i < procedure.many; i++) {
          crate = buffer.pop();
          if (typeof crate !== 'undefined') {
            crateLogistic.crateStackList[procedure.to - 1].push(crate);
          }
        }
      }
    });
    return crateLogistic;
  }

  private findTopCrateList(crateLogistic: ICrateLogistic) {
    let crate: TUppercaseChar | undefined;
    let topCrates = '';
    crateLogistic.crateStackList.forEach((crateStack) => {
      crate = crateStack.at(-1);
      if (typeof crate !== 'undefined') {
        topCrates = topCrates.concat(crate);
      }
    });
    return topCrates;
  }

  getTopCrateList() {
    let crateLogistic: ICrateLogistic = this.getData();
    crateLogistic = this.rearrangeCrates(crateLogistic);
    return this.findTopCrateList(crateLogistic);
  }

  getTopCrateList9001() {
    let crateLogistic: ICrateLogistic = this.getData();
    crateLogistic = this.rearrangeCrates(crateLogistic, CrateMover9001);
    return this.findTopCrateList(crateLogistic);
  }
}
