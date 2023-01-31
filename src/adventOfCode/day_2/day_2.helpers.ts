import { ErrorEnum } from 'src/common/error.enum';
import { T_RPS } from 'src/dto/adventOfCode/day2.type';

export const RPS_Map = (symbol: string) => {
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

export const points = (symbol: T_RPS) => {
  if (symbol === 'r') {
    return 1;
  }
  if (symbol === 'p') {
    return 2;
  }
  return 3;
};

export const mapNeed = (symbol: string) => {
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

export const getWinner = (p: T_RPS): 'r' | 's' | 'p' => {
  for (const match of winConditions) {
    if (match.lose === p) {
      return match.win;
    }
  }
  throw new Error(ErrorEnum.BAD_INPUT);
};

export const getLooser = (p: T_RPS): 'r' | 's' | 'p' => {
  for (const match of winConditions) {
    if (match.win === p) {
      return match.lose;
    }
  }
  throw new Error(ErrorEnum.BAD_INPUT);
};
