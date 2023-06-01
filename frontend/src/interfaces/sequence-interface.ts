import { ECategory } from '../enums/category';

export interface IBlock {
  type: ECategory;
  duration: number; // minutes
}

export interface ISequenceBlock {
  position: number;
  block: IBlock;
}

export interface ISequence {
  id: string;
  title: string;
  subsequences: ISequenceBlock[];
  break: number;
}
