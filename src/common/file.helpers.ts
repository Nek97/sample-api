import { readFileSync } from 'fs';
import { join } from 'path';

export const convertNumberBuffer = (fileBuffer: number[]): number[][] => {
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
};

export const getFile = (fileName: string): number[] => {
  const file = readFileSync(join(process.cwd(), fileName)).toJSON().data;
  return file;
};
