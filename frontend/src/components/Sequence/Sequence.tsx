import React from 'react';

import Block from '../Block/Block';
import { ECategory } from '../../enums/category';
import { ISubSequence, ISubSequenceKey } from '../../interfaces/sequence-interface';
import { Container } from './styles';

interface ISequenceProps {
  subSequence: ISubSequence;
  reps?: number;
  breakDuration?: number;
}

const Sequence = ({ breakDuration, subSequence, reps = 3 }: ISequenceProps) => {
  const subSequenceDurationSum = Object.keys(subSequence).reduce(
    (sum, key) => sum + subSequence[key as ISubSequenceKey].duration,
    0
  );
  const sumDuration = reps * subSequenceDurationSum + (breakDuration || 0);
  const onePercent = sumDuration / 100;
  const firstWidth = `${subSequence.first.duration / onePercent}%`;
  const secondWidth = `${subSequence.second.duration / onePercent}%`;
  const thirdWidth = `${subSequence.third.duration / onePercent}%`;
  const breakWidth = `${(breakDuration || 0) / onePercent}%`;

  const subSequences = [];
  for (let i = 0; i < reps; i += 1) {
    subSequences.push(
      <React.Fragment key={`fragment_${i}`}>
        <Block
          key={`sequence_${subSequence.first.type}_${i}`}
          type={subSequence.first.type}
          width={firstWidth}
        />
        <Block
          key={`sequence_${subSequence.second.type}_${i}`}
          type={subSequence.second.type}
          width={secondWidth}
        />
        <Block
          key={`sequence_${subSequence.third.type}_${i}`}
          type={subSequence.third.type}
          width={thirdWidth}
        />
      </React.Fragment>
    );
  }

  return (
    <Container>
      {subSequences}

      {breakDuration && <Block type={ECategory.BREAK} width={breakWidth} />}
    </Container>
  );
};

export default Sequence;
