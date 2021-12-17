import { ECategory } from '../enums/category';

export interface IBlock {
  type: ECategory;
  duration: number; // minutes
}

export type ISubSequenceKey = 'first' | 'second' | 'third';

export interface ISubSequence {
  first: IBlock;
  second: IBlock;
  third: IBlock;
}

export interface ISequence {
  id: string;
  title: string;
  subsequence: ISubSequence;
  break: number;
  recap?: number;
}
