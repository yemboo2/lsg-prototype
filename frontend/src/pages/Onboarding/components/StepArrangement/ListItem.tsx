import { useEffect, useRef } from 'react';
import { Text } from '@chakra-ui/layout';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { ECategory } from '../../../../enums/category';
import { CssColors } from '../../../../styles/colors';
import { ListItemContainer } from './styles';

interface IListItemProps {
  type: ECategory;
  index: number;
  moveListItem: any;
  isOtherItemDragging: boolean;
  drags: (type: ECategory | undefined) => void;
}

export const ListItem = ({
  type,
  index,
  moveListItem,
  isOtherItemDragging,
  drags,
}: IListItemProps) => {
  const ref = useRef<any>();
  const { t } = useTranslation();

  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      drags(type);
      document.body.classList.add('dragging');
    } else {
      drags(undefined);
      document.body.classList.remove('dragging');
    }
  }, [isDragging]);

  // useDrop - the list item is also a drop area
  const [_, dropRef] = useDrop({
    accept: 'item',
    hover: (item: any, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // @ts-ignore
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      // eslint-disable-next-line  no-param-reassign
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const dragDropRef = dragRef(dropRef(ref));

  console.log('INDEX', index, isOtherItemDragging);

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1;
  return (
    <ListItemContainer
      // @ts-ignore
      ref={dragDropRef}
      style={{
        opacity,
        backgroundColor: CssColors.Category[type],
      }}
    >
      <div className={classNames('container', { draggable: !isDragging && !isOtherItemDragging })}>
        <Text color="white" fontSize="xl">
          {t(`category.${type}`)}
        </Text>
      </div>
    </ListItemContainer>
  );
};
