import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { cleanStringList } from 'src/common/string.helpers';
import { IItemStructure, IValidItemStructure } from 'src/dto/item.type';
import { itemValidator } from 'src/validation/item.validator';

@Injectable()
export class ItemService {
  constructor(private readonly httpService: HttpService) {}

  async getCsvData(): Promise<string> {
    const request = await this.httpService.axiosRef.get(
      'https://docs.google.com/spreadsheet/ccc?key=0Aqg9JQbnOwBwdEZFN2JKeldGZGFzUWVrNDBsczZxLUE&single=true&gid=0&output=csv',
    );
    return request.data;
  }

  processLine(line: string): IItemStructure {
    let splitted: string[] = [];
    if (line.indexOf('"') !== -1) {
      let index = 0;
      let tempString;
      let commaAsDivisor = true;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
          commaAsDivisor = !commaAsDivisor;
        } else if (line[i] === ',' && commaAsDivisor) {
          tempString = '';
          for (let j = index; j < i; j++) {
            tempString += line[j];
          }
          splitted.push(tempString);
          index = i + 1;
        }
        if (splitted.length === 2) {
          splitted.push(line.substring(index));
          break;
        }
      }
    } else {
      splitted = line.split(',');
    }
    splitted = cleanStringList(splitted);
    return {
      title: splitted[0],
      description: splitted[1],
      image: splitted[2],
    };
  }

  async getItemList(): Promise<IItemStructure[]> {
    const csv = await this.getCsvData();
    const lines: string[] | undefined = csv.split(String.fromCharCode(13));
    const LineList: IItemStructure[] = [];
    if (lines) {
      lines.shift();
      lines.forEach((line) => {
        LineList.push(this.processLine(line));
      });
    }
    return LineList;
  }

  async getItem(index = 0): Promise<IItemStructure> {
    const csv = await this.getCsvData();
    const lines: string[] | undefined = csv.split(String.fromCharCode(13));
    if (lines && lines[index + 1]) {
      return this.processLine(lines[index + 1]);
    }
    throw new Error("The line required doesn't exist");
  }

  async getValidItemList(): Promise<IValidItemStructure[]> {
    const LineList: IItemStructure[] = await this.getItemList();
    const ValidLineList: IValidItemStructure[] = LineList.filter(
      itemValidator,
    ) as IValidItemStructure[];
    return ValidLineList;
  }

  async getValidItem(index = 0): Promise<IValidItemStructure> {
    const validLineList = await this.getValidItemList();
    if (validLineList && validLineList[index]) {
      return validLineList[index];
    }
    throw new Error("The line required doesn't exist");
  }
}
