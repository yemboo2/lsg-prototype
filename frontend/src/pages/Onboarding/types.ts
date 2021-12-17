import { ECategory } from '../../enums/category';

export interface IBlockOrder {
  first: ECategory;
  second: ECategory;
  third: ECategory;
}

export type IDurations = Record<ECategory, number>;
