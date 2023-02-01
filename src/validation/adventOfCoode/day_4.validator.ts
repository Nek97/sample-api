import {
  ISectionRow,
  ISectionRowOverlap,
} from 'src/dto/adventOfCode/day4.type';

export function rowIsValid(
  obj: ISectionRow | ISectionRowOverlap,
): obj is ISectionRowOverlap {
  return !!(obj.p2 && obj.p1);
}

export const SectionEowValidator = (obj: ISectionRow | ISectionRowOverlap) => {
  return rowIsValid(obj);
};
