import { ECategory } from '../../enums/category';
import { CssColors } from '../../styles/colors';

interface IBlockProps {
  type: ECategory;
  width: string;
}

const Block = ({ type, width }: IBlockProps) => (
  <div
    style={{ backgroundColor: CssColors.Category[type], width, height: '5vh', maxHeight: '60px' }}
  />
);

export default Block;
