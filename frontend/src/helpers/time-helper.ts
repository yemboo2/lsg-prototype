import { ISequence } from '../interfaces/sequence-interface';

export const getDurationString = (
  sequence: ISequence,
  reps: number,
  breakScheduled: boolean
): string => {
  const subSequenceDurationSum = sequence.subsequences.reduce(
    (sum, subsequenceBlock) => sum + subsequenceBlock.block.duration,
    0
  );

  const sumDuration = reps * subSequenceDurationSum + (breakScheduled ? sequence.break : 0);

  const hours = Math.floor(sumDuration / 60);
  const minutes = sumDuration % 60;

  let timeStr = '';
  if (hours) timeStr += `${hours}h `;
  timeStr += `${minutes}min`;

  return timeStr;
};
