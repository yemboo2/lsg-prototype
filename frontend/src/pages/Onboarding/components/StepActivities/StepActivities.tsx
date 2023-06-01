import { useState } from 'react';
import { Text } from '@chakra-ui/layout';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { CheckIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

import { Container } from './styles';

interface IItem {
  label: string;
  value: string;
}

const mapStringsToItems = (strings: string[]) =>
  strings.map((str: string) => ({ label: str, value: str } as IItem));

interface IStepActivitiesProps {
  activities: string[];
}

const StepActivities = ({ activities }: IStepActivitiesProps) => {
  const [pickerItems, setPickerItems] = useState(mapStringsToItems(activities));
  const [selectedItems, setSelectedItems] = useState<IItem[]>([]);

  const { t } = useTranslation();

  const handleCreateItem = (item: IItem) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: IItem[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const createItemRenderer = (value: string) => (
    <Text>
      <span>Create</span> <span style={{ fontWeight: 'bold' }}>"{value}"</span>
    </Text>
  );

  const itemRenderer = (item: IItem) => t(`activities.${item.value}`);

  return (
    <Container>
      <CUIAutoComplete
        label="Choose some activities or create your own:"
        labelStyleProps={{ color: 'white' }}
        // @ts-ignore
        placeholder="Type ..."
        listItemStyleProps={{ color: 'white', maxHeight: '100px' }}
        listStyleProps={{
          backgroundColor: 'rgba(255, 250, 240, 0.05)',
          color: 'white',
          maxH: '35vh',
          overflow: 'scroll',
        }}
        highlightItemBg="CornflowerBlue"
        inputStyleProps={{ color: 'white', colorScheme: 'white' }}
        onCreateItem={handleCreateItem}
        items={pickerItems}
        selectedItems={selectedItems}
        onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
        createItemRenderer={createItemRenderer}
        itemRenderer={itemRenderer}
        icon={CheckIcon}
        // @ts-ignore
        selectedIconProps={{ color: 'rgba(0,0,0,0.8)' }}
        hideToggleButton
        tagStyleProps={{
          color: 'white',
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: 'white',
        }}
      />
    </Container>
  );
};

export default StepActivities;
