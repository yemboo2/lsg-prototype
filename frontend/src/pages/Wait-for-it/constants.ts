import { IWaitForItList } from './types';

export const waitForItList: IWaitForItList[] = [
  {
    heading: 'done',
    done: true,
    items: ['sequenceControlPanel', 'sequenceDefinitionFlow', 'waitForItList'],
  },
  {
    heading: 'soon',
    done: false,
    items: ['dashboard', 'sequenceScheduler', 'dynamicTasking', 'extendedSequenceControl'],
  },
];
