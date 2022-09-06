import { IItemStructure, IValidItemStructure } from 'src/dto/item.type';

export function isValidItem(
  item: IItemStructure | IValidItemStructure,
): item is IValidItemStructure {
  return !!(item.title && item.image);
}

export const itemValidator = (item: IItemStructure) => {
  return isValidItem(item);
};
