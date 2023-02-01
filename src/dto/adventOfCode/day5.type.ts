import { TFileBuffer, TUppercaseChar } from 'src/common/types';

export type TcrateStackElement = TUppercaseChar;
export type TcrateStack = TcrateStackElement[];
export type TcrateStackList = TcrateStack[];

export interface ICrateBuffer {
  stack: TFileBuffer;
  numberOfStack: number;
  procedure: TFileBuffer;
}

export interface IProcedure {
  many: number;
  from: number;
  to: number;
}
export type TProcedureList = IProcedure[];

export interface ICrateLogistic {
  crateStackList: TcrateStackList;
  rearrangmentProcedureList: TProcedureList;
}
