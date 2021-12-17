import { ISequence, ISubSequenceKey } from '../interfaces/sequence-interface';

export const getDurationString = (
  sequence: ISequence,
  reps: number,
  breakScheduled: boolean
): string => {
  const subSequenceDurationSum = Object.keys(sequence.subsequence).reduce(
    (sum, key) => sum + sequence.subsequence[key as ISubSequenceKey].duration,
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
