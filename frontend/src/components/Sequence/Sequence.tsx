import React from 'react';

import Block from '../Block/Block';
import { ECategory } from '../../enums/category';
import { ISequenceBlock } from '../../interfaces/sequence-interface';
import { Container } from './styles';

interface ISequenceProps {
  subSequences: ISequenceBlock[];
  reps?: number;
  breakDuration?: number;
}

const Sequence = ({ breakDuration, subSequences, reps = 3 }: ISequenceProps) => {
  const subSequenceDurationSum = subSequences.reduce(
    (sum, subsequenceBlock) => sum + subsequenceBlock.block.duration,
    0
  );
  const sumDuration = reps * subSequenceDurationSum + (breakDuration || 0);
  const onePercent = sumDuration / 100;

  const widths = subSequences.map(
    (subSequenceBlock) => `${subSequenceBlock.block.duration / onePercent}%`
  );
  const breakWidth = `${(breakDuration || 0) / onePercent}%`;

  const renderSubSequence = (index: number) => {
    const renderedSubsequences = [];

    for (let i = 0; i < subSequences.length; i += 1) {
      renderedSubsequences.push(
        <Block
          key={`sequence_${subSequences[i].block.type}_${index}`}
          type={subSequences[i].block.type}
          width={widths[i]}
        />
      );
    }

    return renderedSubsequences;
  };

  const sequences = [];
  for (let i = 0; i < reps; i += 1) {
    sequences.push(<React.Fragment key={`fragment_${i}`}>{renderSubSequence(i)}</React.Fragment>);
  }

  return (
    <Container>
      {sequences}

      {breakDuration && <Block type={ECategory.BREAK} width={breakWidth} />}
    </Container>
  );
};

export default Sequence;
