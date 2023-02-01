import { Injectable } from '@nestjs/common';
import { isAsciiNumber } from 'src/common/ascii.helper';
import * as file from 'src/common/file.helpers';
import { TFileBuffer } from 'src/common/types';
import {
  ISectionElve,
  ISectionRow,
  TSectionRowOverlapList,
} from 'src/dto/adventOfCode/day4.type';
import { rowIsValid } from 'src/validation/adventOfCoode/day_4.validator';

@Injectable()
export class Day4Service {
  private checkForOverlap(a1: number[], a2: number[]) {
    let isContained = true;
    a1.map((e) => {
      if (a2.indexOf(e) === -1) {
        isContained = false;
      }
    });
    return isContained;
  }

  private checkForPartialOverlap(a1: number[], a2: number[]) {
    let isContained = false;
    a1.map((e) => {
      if (a2.indexOf(e) !== -1) {
        isContained = true;
      }
    });
    return isContained;
  }

  private countOverlap(sectionList: TSectionRowOverlapList): number {
    let counter = 0;
    sectionList.forEach((row) => {
      if (row.overlap) {
        console.log(row);
        counter++;
      }
    });
    return counter;
  }

  private processSectionList(
    sectionList: TSectionRowOverlapList,
    checkFn = this.checkForOverlap,
  ): TSectionRowOverlapList {
    sectionList.map((sectionRow) => {
      sectionRow.overlap =
        checkFn(sectionRow.p1, sectionRow.p2) ||
        checkFn(sectionRow.p2, sectionRow.p1);
    });
    return sectionList;
  }

  private createArrayFromRange(start?: number, end?: number): number[] {
    const buffer = [];
    if (typeof start === 'number' && typeof end === 'number') {
      for (let i = start; i <= end; i++) {
        buffer.push(i);
      }
    }
    return buffer;
  }

  private convertBufferIntoSectionList(
    fileBuffer: TFileBuffer,
  ): TSectionRowOverlapList {
    let number = 0;
    let section: ISectionElve = {};
    let sectionRow: ISectionRow = {};
    const sectionList: TSectionRowOverlapList = [];
    fileBuffer.map((charCode: number) => {
      if (charCode === 45) {
        section.start = number;
        number = 0;
      } else if (charCode === 44) {
        section.end = number;
        number = 0;
        sectionRow.p1 = this.createArrayFromRange(section.start, section.end);
      } else if (charCode === 10) {
        section.end = number;
        number = 0;
        sectionRow.p2 = this.createArrayFromRange(section.start, section.end);
        if (rowIsValid(sectionRow)) {
          sectionList.push({ ...sectionRow, overlap: false });
          sectionRow = {};
        }
        section = {};
      } else if (isAsciiNumber(number)) {
        number = number * 10 + charCode - 48;
      }
    });
    return sectionList;
  }

  private getData(): TSectionRowOverlapList {
    const fileData = file.getFile('src/adventOfCode/day_4/input.txt');
    return this.convertBufferIntoSectionList(fileData);
  }

  countSectionOverlap() {
    let sectionList = this.getData();
    sectionList = this.processSectionList(sectionList);
    return this.countOverlap(sectionList);
  }

  countSectionPartialOverlap() {
    let sectionList = this.getData();
    sectionList = this.processSectionList(
      sectionList,
      this.checkForPartialOverlap,
    );
    return this.countOverlap(sectionList);
  }
}
