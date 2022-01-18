import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ECategory } from '../../../../enums/category';
import { ISequence } from '../../../../interfaces/sequence-interface';
import { CssColors } from '../../../../styles/colors';
import { Container } from './styles';

interface ICategoryBlocks {
  sequence?: ISequence;
  showBreak: boolean;
}

const CategoryBlocks = ({ sequence, showBreak }: ICategoryBlocks) => {
  const { t } = useTranslation();

  if (!sequence) return null;

  return (
    <Container>
      {sequence.subsequences.map((subSeq) => (
        <div key={`categoryblock-${subSeq.block.type}`} className="block-container">
          <div
            className="color-block"
            style={{ backgroundColor: CssColors.Category[subSeq.block.type] }}
          />
          <Text color="white">{`${t(`category.${subSeq.block.type}`)}: je ${
            subSeq.block.duration
          } min`}</Text>
        </div>
      ))}
      {showBreak && (
        <div key="categoryblock-break" className="block-container">
          <div
            className="color-block"
            style={{ backgroundColor: CssColors.Category[ECategory.BREAK] }}
          />
          <Text color="white">{`${t(`category.${ECategory.BREAK}`)}: je ${
            sequence.break
          } min`}</Text>
        </div>
      )}
    </Container>
  );
};

export default CategoryBlocks;
