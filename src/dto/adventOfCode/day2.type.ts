export type T_RPS = 'r' | 'p' | 's';

export interface IElvesTournamentPlay {
  p1?: string;
  p2?: string;
}
export interface IElvesTournamentMatch {
  p1: T_RPS;
  p2: T_RPS;
  need: 'L' | 'D' | 'W';
  score: number;
}
