import { Injectable } from '@nestjs/common';
import { ErrorEnum } from 'src/common/error.enum';
import * as file from 'src/common/file.helpers';
import {
  IElvesTournamentMatch,
  IElvesTournamentPlay,
  T_RPS,
} from 'src/dto/adventOfCode/day2.type';
import { playGoodAsMatch } from 'src/validation/adventOfCoode/day_2.validator';

const RPS_Map = (symbol: string) => {
  if (symbol === 'A' || symbol === 'X') {
    return 'r';
  }
  if (symbol === 'B' || symbol === 'Y') {
    return 'p';
  }
  if (symbol === 'C' || symbol === 'Z') {
    return 's';
  }
  throw new Error(ErrorEnum.BAD_INPUT);
};

const points = (symbol: T_RPS) => {
  if (symbol === 'r') {
    return 1;
  }
  if (symbol === 'p') {
    return 2;
  }
  return 3;
};

const mapNeed = (symbol: string) => {
  if (symbol === 'X') {
    return 'L';
  }
  if (symbol === 'Y') {
    return 'D';
  }
  if (symbol === 'Z') {
    return 'W';
  }
  throw new Error(ErrorEnum.BAD_INPUT);
};
const winConditions: { lose: T_RPS; win: T_RPS }[] = [
  {
    lose: 'r',
    win: 'p',
  },
  {
    lose: 'p',
    win: 's',
  },
  {
    lose: 's',
    win: 'r',
  },
];

const getWinner = (p: T_RPS): 'r' | 's' | 'p' => {
  for (const match of winConditions) {
    if (match.lose === p) {
      return match.win;
    }
  }
  throw new Error(ErrorEnum.BAD_INPUT);
};

const getLooser = (p: T_RPS): 'r' | 's' | 'p' => {
  for (const match of winConditions) {
    if (match.win === p) {
      return match.lose;
    }
  }
  throw new Error(ErrorEnum.BAD_INPUT);
};

@Injectable()
export class Day2Service {
  applyStrategy(matchList: IElvesTournamentMatch[]) {
    console.log(matchList[0]);
    matchList.map((match) => {
      if (match.need === 'L') {
        match.p2 = getLooser(match.p1);
      } else if (match.need === 'W') {
        match.p2 = getWinner(match.p1);
      } else {
        match.p2 = match.p1;
      }
    });
    console.log(matchList[0]);
    return matchList;
  }

  evaluateMatch(matchList: IElvesTournamentMatch[]) {
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

  convertBuffer(fileBuffer: number[]): IElvesTournamentMatch[] {
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

  getData(): IElvesTournamentMatch[] {
    const fileData = file.getFile('src/adventOfCode/day_2/input.txt');
    return this.convertBuffer(fileData);
  }

  getScore(): number {
    const matchData = this.getData();
    const resultList = this.evaluateMatch(matchData);
    let points = 0;
    resultList.map((r) => {
      points += r.score;
    });
    return points;
  }

  getScoreUsingStrategy(): number {
    const matchData = this.getData();
    const adjustedList = this.applyStrategy(matchData);
    const resultList = this.evaluateMatch(adjustedList);
    let points = 0;
    resultList.map((r) => {
      points += r.score;
    });

    return points;
  }
}
