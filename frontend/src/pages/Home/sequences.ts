import { ECategory } from '../../enums/category';
import { ISequence } from '../../interfaces/sequence-interface';

export const SEQUENCES: ISequence[] = [
  {
    id: 'bb1e9bb8-0e6a-16e3-e702-2d6e12723c6d',
    title: 'Neijia Sequence',
    break: 15,
    subsequences: [
      { position: 0, block: { duration: 1, type: ECategory.ACTIVITY } },
      { position: 1, block: { duration: 1, type: ECategory.MENTAL } },
      { position: 2, block: { duration: 30, type: ECategory.WORK } },
      { position: 3, block: { duration: 1, type: ECategory.RECAP } },
    ],
  },
  {
    id: '5bddd187-8555-d54c-f8d9-1a8ca9a4cc6e',
    title: 'Yoga Sequence',
    break: 20,
    subsequences: [
      { position: 0, block: { duration: 5, type: ECategory.ACTIVITY } },
      { position: 1, block: { duration: 2, type: ECategory.MENTAL } },
      { position: 2, block: { duration: 40, type: ECategory.WORK } },
      { position: 3, block: { duration: 1, type: ECategory.RECAP } },
    ],
  },
  {
    id: '4b412c97-21bf-ff07-be9b-6ff527b61827',
    title: 'Office Sequence',
    break: 25,
    subsequences: [
      { position: 0, block: { duration: 3, type: ECategory.ACTIVITY } },
      { position: 1, block: { duration: 2, type: ECategory.MENTAL } },
      { position: 2, block: { duration: 50, type: ECategory.WORK } },
      { position: 3, block: { duration: 1, type: ECategory.RECAP } },
    ],
  },
  {
    id: '84c0bddd-9f5b-9c88-30ef-302ec75c8cfe',
    title: 'Creative Sequence',
    break: 30,
    subsequences: [
      { position: 0, block: { duration: 2, type: ECategory.MENTAL } },
      { position: 1, block: { duration: 6, type: ECategory.ACTIVITY } },
      { position: 2, block: { duration: 60, type: ECategory.WORK } },
      { position: 3, block: { duration: 2, type: ECategory.RECAP } },
    ],
  },
];
