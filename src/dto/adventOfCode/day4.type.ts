export interface ISectionElve {
  start?: number;
  end?: number;
}

export interface ISectionRow {
  p1?: number[];
  p2?: number[];
}

export interface ISectionRowOverlap {
  p1: number[];
  p2: number[];
  overlap: boolean;
}
export type TSectionRowOverlapList = ISectionRowOverlap[];
