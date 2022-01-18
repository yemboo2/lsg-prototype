import { useState, useCallback } from 'react';

import { ListItem } from './ListItem';
import { ListContainer } from './styles';
import { ECategory } from '../../../../enums/category';
import { IBlockOrder } from '../../types';

interface IListBlock {
  id: number;
  type: ECategory;
}

const INITIAL_BLOCK_ORDER: IListBlock[] = [
  { id: 1, type: ECategory.ACTIVITY },
  { id: 2, type: ECategory.MENTAL },
  { id: 3, type: ECategory.WORK },
];

const compareBlocks = (bA: IListBlock[], bB: IListBlock[]): boolean =>
  bA.length === bB.length && bA.every((b, i) => bA[i].id === bB[i].id);

export interface IListProps {
  orderChanged: (blockOrder: IBlockOrder) => void;
}

export const List = ({ orderChanged }: IListProps) => {
  const [blocks, setBlocks] = useState<IListBlock[]>(INITIAL_BLOCK_ORDER);

  const moveBlockListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = blocks[dragIndex];
      const hoverItem = blocks[hoverIndex];

      // Swap places of dragItem and hoverItem in the pets array
      const updatedBlocks = [...blocks];
      updatedBlocks[dragIndex] = hoverItem;
      updatedBlocks[hoverIndex] = dragItem;

      if (!compareBlocks(blocks, updatedBlocks)) {
        orderChanged({
          first: updatedBlocks[0].type,
          second: updatedBlocks[1].type,
          third: updatedBlocks[2].type,
        } as IBlockOrder);
        setBlocks(updatedBlocks);
      }
    },
    [blocks]
  );

  const [dragIndex, setDragIndex] = useState<ECategory | undefined>(undefined);

  return (
    <ListContainer>
      {blocks.map((block, index) => (
        <ListItem
          key={block.id}
          index={index}
          type={block.type}
          moveListItem={moveBlockListItem}
          isOtherItemDragging={dragIndex !== undefined && dragIndex !== block.type}
          drags={setDragIndex}
        />
      ))}
    </ListContainer>
  );
};
