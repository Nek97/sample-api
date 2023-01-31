import { Injectable } from '@nestjs/common';
import * as file from 'src/common/file.helpers';
import {
  IElvesTournamentMatch,
  IElvesTournamentPlay,
} from 'src/dto/adventOfCode/day2.type';
import { playGoodAsMatch } from 'src/validation/adventOfCoode/day_2.validator';
import {
  getLooser,
  getWinner,
  points,
  RPS_Map,
  mapNeed,
} from './day_2.helpers';

@Injectable()
export class Day2Service {
  private calculatePoints(list: IElvesTournamentMatch[]) {
    let points = 0;
    list.map((r) => {
      points += r.score;
    });
    return points;
  }

  private applyStrategy(matchList: IElvesTournamentMatch[]) {
    matchList.map((match) => {
      if (match.need === 'L') {
        match.p2 = getLooser(match.p1);
      } else if (match.need === 'W') {
        match.p2 = getWinner(match.p1);
      } else {
        match.p2 = match.p1;
      }
    });

    return matchList;
  }

  private evaluateMatch(matchList: IElvesTournamentMatch[]) {
    matchList.map((match) => {
      match.score = points(match.p2);
      if (match.p1 === match.p2) {
        match.score += 3;
      } else {
        if (match.p1 === 'r') {
          if (match.p2 === 'p') {
            //Paper win on Rock
            match.score += 6;
          }
          //Scissors loss on Rock
        }
        if (match.p1 === 'p') {
          if (match.p2 === 's') {
            //Scissors win on Paper
            match.score += 6;
          }
          //Rock loss on Paper
        }
        if (match.p1 === 's') {
          if (match.p2 === 'r') {
            //Rock win on Scissors
            match.score += 6;
          }
          //Paper loss on Scissors
        }
      }
    });

    return matchList;
  }

  private convertBuffer(fileBuffer: number[]): IElvesTournamentMatch[] {
    const p1Symbol = ['A', 'B', 'C'];
    const p2Symbol = ['X', 'Y', 'Z'];
    let buffer: IElvesTournamentPlay = {};
    const matches: IElvesTournamentMatch[] = [];
    fileBuffer.forEach((charCode) => {
      const symbol = String.fromCharCode(charCode);
      if (p1Symbol.includes(symbol)) {
        buffer.p1 = symbol;
      }
      if (p2Symbol.includes(symbol)) {
        buffer.p2 = symbol;
      }
      if (playGoodAsMatch(buffer)) {
        matches.push({
          p1: RPS_Map(buffer.p1),
          p2: RPS_Map(buffer.p2),
          need: mapNeed(buffer.p2),
          score: 0,
        });
        buffer = {};
      }
    });
    return matches;
  }

  private getData(): IElvesTournamentMatch[] {
    const fileData = file.getFile('src/adventOfCode/day_2/input.txt');
    return this.convertBuffer(fileData);
  }

  getScore(): number {
    const matchData = this.getData();
    const resultList = this.evaluateMatch(matchData);

    return this.calculatePoints(resultList);
  }

  getScoreUsingStrategy(): number {
    const matchData = this.getData();
    const adjustedList = this.applyStrategy(matchData);
    const resultList = this.evaluateMatch(adjustedList);

    return this.calculatePoints(resultList);
  }
}
