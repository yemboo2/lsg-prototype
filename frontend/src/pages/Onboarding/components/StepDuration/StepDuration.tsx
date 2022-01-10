import { useEffect, useState } from 'react';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import { useTranslation } from 'react-i18next';

import Sequence from '../../../../components/Sequence/Sequence';
import { CssColors } from '../../../../styles/colors';
import { PRESETS } from './constants';
import { EPresetType } from './types';
import { ECategory } from '../../../../enums/category';
import { selectBlockOrder, selectSetDuration, useOnboarding } from '../../state';

const PRESET_DEFAULT = EPresetType.VAR1;

const StepDuration = () => {
  const { t } = useTranslation();

  const [workDuration, setWorkDuration] = useState<number>(PRESETS[PRESET_DEFAULT].work);
  const [activityDuration, setActivityDuration] = useState<number>(
    PRESETS[PRESET_DEFAULT].activity
  );
  const [mentalDuration, setMentalDuration] = useState<number>(PRESETS[PRESET_DEFAULT].mental);
  const [breakDuration, setBreakDuration] = useState<number>(PRESETS[PRESET_DEFAULT].break);
  const [recapDuration, setRecapDuration] = useState<number>(PRESETS[PRESET_DEFAULT].recap);
  const [preset, setPreset] = useState<EPresetType>(PRESET_DEFAULT);

  // zustand
  const blockOrder = useOnboarding(selectBlockOrder);
  const setDuration = useOnboarding(selectSetDuration);

  useEffect(() => {
    const key = preset as Exclude<EPresetType, EPresetType.INDIVIDUAL>;
    if (PRESETS[key]) {
      setWorkDuration(PRESETS[key].work);
      setActivityDuration(PRESETS[key].activity);
      setMentalDuration(PRESETS[key].mental);
      setBreakDuration(PRESETS[key].break);
      setRecapDuration(PRESETS[key].recap);
    }
  }, [preset]);

  const onWorkDurationChanged = (value: number) => {
    setBreakDuration(Math.floor(value / 2));
  };

  const onPresetChanged = (nextValue: string) => {
    setPreset(nextValue as EPresetType);
  };

  const onChange = () => setPreset(EPresetType.INDIVIDUAL);

  const onWorkDurationChange = (value: number) => {
    onChange();
    setDuration(ECategory.WORK, value);
    setWorkDuration(value);
  };

  const onActivityDurationChange = (value: number) => {
    onChange();
    setDuration(ECategory.ACTIVITY, value);
    setActivityDuration(value);
  };

  const onMentalDurationChange = (value: number) => {
    onChange();
    setDuration(ECategory.MENTAL, value);
    setMentalDuration(value);
  };

  const onBreakDurationChange = (value: number) => {
    onChange();
    setDuration(ECategory.BREAK, value);
    setBreakDuration(value);
  };

  const onRecapDurationChange = (value: number) => {
    onChange();
    setDuration(ECategory.RECAP, value);
    setRecapDuration(value);
  };

  const getDuration = (category: ECategory) => {
    switch (category) {
      case ECategory.ACTIVITY:
        return activityDuration;
      case ECategory.MENTAL:
        return mentalDuration;
      default:
        return workDuration;
    }
  };

  const sequence = [
    {
      position: 0,
      block: { type: blockOrder.first, duration: getDuration(blockOrder.first) },
    },
    {
      position: 1,
      block: { type: blockOrder.second, duration: getDuration(blockOrder.second) },
    },
    {
      position: 2,
      block: { type: blockOrder.third, duration: getDuration(blockOrder.third) },
    },
  ];

  const workIndex = sequence.findIndex((ss) => ss.block.type === ECategory.WORK);
  sequence.splice(workIndex + 1, 0, {
    position: 0,
    block: { type: ECategory.RECAP, duration: recapDuration },
  });

  for (let i = 0; i < sequence.length; i += 1) {
    sequence[i].position = i;
  }

  return (
    <>
      <Text color="white" w="100%" textAlign="left">
        {t('onboarding.duration.description')}
      </Text>

      <RadioGroup onChange={onPresetChanged} value={preset} mt="2vh" w="80%">
        <Stack direction="row" justifyContent="space-between">
          <Radio value={EPresetType.VAR1} colorScheme="cyan">
            <Text color="white">Var 1</Text>
          </Radio>
          <Radio value={EPresetType.VAR2} colorScheme="cyan">
            <Text color="white">Var 2</Text>
          </Radio>
          <Radio value={EPresetType.VAR3} colorScheme="cyan">
            <Text color="white">Var 3</Text>
          </Radio>
          <Radio value={EPresetType.INDIVIDUAL} colorScheme="cyan">
            <Text color="white">{t('onboarding.duration.individual')}</Text>
          </Radio>
        </Stack>
      </RadioGroup>

      <Heading color="white" w="100%" textAlign="left" size="sm" mt="3vh" mb="1%">
        {`${t(`category.${ECategory.WORK}`)} - ${workDuration}min`}
      </Heading>
      <Slider
        colorScheme={CssColors.Category.work}
        defaultValue={PRESETS[PRESET_DEFAULT].work}
        value={workDuration}
        min={20}
        max={90}
        width="100%"
        onChange={onWorkDurationChange}
        onChangeEnd={onWorkDurationChanged}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </Slider>

      <Heading color="white" w="100%" textAlign="left" size="sm" mt="2vh" mb="1%">
        {`${t(`category.${ECategory.ACTIVITY}`)} - ${activityDuration}min`}
      </Heading>
      <Slider
        colorScheme={CssColors.Category.activity}
        defaultValue={PRESETS[PRESET_DEFAULT].activity}
        value={activityDuration}
        min={1}
        max={15}
        width="100%"
        onChange={onActivityDurationChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </Slider>

      <Heading color="white" w="100%" textAlign="left" size="sm" mt="2vh" mb="1%">
        {`${t(`category.${ECategory.MENTAL}`)} - ${mentalDuration}min`}
      </Heading>
      <Slider
        colorScheme={CssColors.Category.mental}
        defaultValue={PRESETS[PRESET_DEFAULT].mental}
        value={mentalDuration}
        min={1}
        max={15}
        width="100%"
        onChange={onMentalDurationChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </Slider>

      <Heading color="white" w="100%" textAlign="left" size="sm" mt="2vh" mb="1%">
        {`${t(`category.${ECategory.BREAK}`)} - ${breakDuration}min`}
      </Heading>
      <Slider
        colorScheme={CssColors.Category.break}
        defaultValue={PRESETS[PRESET_DEFAULT].break}
        value={breakDuration}
        min={10}
        max={45}
        width="100%"
        onChange={onBreakDurationChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </Slider>

      <Heading color="white" w="100%" textAlign="left" size="sm" mt="2vh" mb="1%">
        {`${t(`category.${ECategory.RECAP}`)} - ${recapDuration}min`}
      </Heading>
      <Slider
        colorScheme={CssColors.Category.recap}
        defaultValue={PRESETS[PRESET_DEFAULT].recap}
        value={recapDuration}
        min={1}
        max={5}
        width="100%"
        onChange={onRecapDurationChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </Slider>

      <div style={{ marginTop: '5%' }}>
        <Sequence subSequences={sequence} breakDuration={breakDuration} />
      </div>
    </>
  );
};

export default StepDuration;
