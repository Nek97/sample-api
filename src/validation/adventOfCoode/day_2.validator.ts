import {
  IElvesTournamentMatch,
  IElvesTournamentPlay,
} from 'src/dto/adventOfCode/day2.type';

export function playGoodAsMatch(
  obj: IElvesTournamentPlay | IElvesTournamentMatch,
): obj is IElvesTournamentMatch {
  return !!(obj.p2 && obj.p1);
}

export const PlayValidator = (
  obj: IElvesTournamentPlay | IElvesTournamentMatch,
) => {
  return playGoodAsMatch(obj);
};
