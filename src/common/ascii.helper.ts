import { ErrorEnum } from './error.enum';
import { TUppercaseChar } from './types';

export enum AsciiCode {
  /**new line */
  LF = 10,
  /**carry over */
  CR = 13,
  /**space*/
  SP = 32,
  /**,*/
  COMMA = 44,
  /**0*/
  NUM_0 = 48,
  /**1*/
  NUM_1 = 49,
  /**2*/
  NUM_2 = 50,
  /**3*/
  NUM_3 = 51,
  /**4*/
  NUM_4 = 52,
  /**5*/
  NUM_5 = 53,
  /**6*/
  NUM_6 = 54,
  /**7*/
  NUM_7 = 55,
  /**8*/
  NUM_8 = 56,
  /**9*/
  NUM_9 = 57,
  /**A*/
  UPP_A = 65,
  /**B*/
  UPP_B = 66,
  /**C*/
  UPP_C = 67,
  /**D*/
  UPP_D = 68,
  /**E*/
  UPP_E = 69,
  /**F*/
  UPP_F = 70,
  /**G*/
  UPP_G = 71,
  /**H*/
  UPP_H = 72,
  /**I*/
  UPP_I = 73,
  /**J*/
  UPP_J = 74,
  /**K*/
  UPP_K = 75,
  /**L*/
  UPP_L = 76,
  /**M*/
  UPP_M = 77,
  /**N*/
  UPP_N = 78,
  /**O*/
  UPP_O = 79,
  /**P*/
  UPP_P = 80,
  /**Q*/
  UPP_Q = 81,
  /**R*/
  UPP_R = 82,
  /**S*/
  UPP_S = 83,
  /**T*/
  UPP_T = 84,
  /**U*/
  UPP_U = 85,
  /**V*/
  UPP_V = 86,
  /**W*/
  UPP_W = 87,
  /**X*/
  UPP_X = 88,
  /**Y*/
  UPP_Y = 89,
  /**Z*/
  UPP_Z = 90,
  /**[*/
  L_S_B = 91,
  /**]*/
  R_S_B = 93,
  /**a*/
  LOW_a = 97,
  /**b*/
  LOW_b = 98,
  /**c*/
  LOW_c = 99,
  /**d*/
  LOW_d = 100,
  /**e*/
  LOW_e = 101,
  /**f*/
  LOW_f = 102,
  /**g*/
  LOW_g = 103,
  /**h*/
  LOW_h = 104,
  /**i*/
  LOW_i = 105,
  /**j*/
  LOW_j = 106,
  /**k*/
  LOW_k = 107,
  /**l*/
  LOW_l = 108,
  /**m*/
  LOW_m = 109,
  /**n*/
  LOW_n = 110,
  /**o*/
  LOW_o = 111,
  /**p*/
  LOW_p = 112,
  /**q*/
  LOW_q = 113,
  /**r*/
  LOW_r = 114,
  /**s*/
  LOW_s = 115,
  /**t*/
  LOW_t = 116,
  /**u*/
  LOW_u = 117,
  /**v*/
  LOW_v = 118,
  /**w*/
  LOW_w = 119,
  /**x*/
  LOW_x = 120,
  /**y*/
  LOW_y = 121,
  /**z*/
  LOW_z = 122,
}

export const isAsciiNumber = (num: number) => {
  return num >= AsciiCode.NUM_0 && num <= AsciiCode.NUM_9;
};

export const isAsciiLetterUppercase = (letter: number) => {
  return letter >= AsciiCode.UPP_A && letter <= AsciiCode.UPP_Z;
};

export const isAsciiLetterLowercase = (letter: number) => {
  return letter >= AsciiCode.LOW_a && letter <= AsciiCode.LOW_z;
};

export const isAsciiLetter = (letter: number) => {
  return isAsciiLetterLowercase(letter) || isAsciiLetterUppercase(letter);
};

export const converUpperCaseAscii = (letter: number): TUppercaseChar => {
  if (isAsciiLetterUppercase(letter)) {
    return String.fromCharCode(letter) as TUppercaseChar;
  }
  throw new Error(ErrorEnum.BAD_USAGE);
};

export const numFromAscii = (num: number): number => {
  return num - AsciiCode.NUM_0;
};
