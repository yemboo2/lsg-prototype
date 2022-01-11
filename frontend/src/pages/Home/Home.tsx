import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Select } from '@chakra-ui/react';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Checkbox } from '@chakra-ui/checkbox';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { Container } from './styles';
import { selectSequences, useUser } from '../../state/user';
import { ERoutes } from '../../routes/types';
import NowBlock from './components/NowBlock/NowBlock';
import { ECategory } from '../../enums/category';
import Sequence from '../../components/Sequence/Sequence';
import { IBlock, ISequence } from '../../interfaces/sequence-interface';
import { getDurationString } from '../../helpers/time-helper';
import { SEQUENCES } from './sequences';
import Header from '../../components/Header/Header';

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();

  // States
  const [isSequenceActive, setIsSequenceActive] = useState<boolean>(false);
  const [selectedSequence, setSelectedSequence] = useState<ISequence | undefined>(undefined);
  const [reps, setReps] = useState<number>(3);
  const [scheduleBreak, setScheduleBreak] = useState(true);
  const [currentChunk, setCurrentChunk] = useState<IBlock | undefined>(undefined);
  const [chunkCounter, setChunkCounter] = useState<number | undefined>();

  // Zustand
  const userSequences = useUser(selectSequences);

  useEffect(() => {
    if (userSequences && userSequences.length > 0) {
      setSelectedSequence(userSequences[0]);
    }
  }, [userSequences]);

  const onRepsChange = (value: string) => {
    setReps(Number(value));
  };

  const sequences: ISequence[] = useMemo(() => [...userSequences, ...SEQUENCES], [userSequences]);

  const onStartCancleButtonPress = useCallback(() => {
    if (isSequenceActive) {
      setIsSequenceActive(false);
      setChunkCounter(undefined);
      setCurrentChunk(undefined);
    } else {
      setIsSequenceActive(true);
      setChunkCounter(0);
      setCurrentChunk(
        selectedSequence?.subsequences ? selectedSequence.subsequences[0].block : undefined
      );
    }
  }, [isSequenceActive]);

  const onFinishedChunk = useCallback(() => {
    setChunkCounter((prev) => (prev === undefined ? undefined : prev + 1));
  }, []);

  const handleChangeSelectSequence = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const idx = sequences.findIndex((val) => val.id === event.target.value);
      setSelectedSequence(sequences[idx]);
    },
    [sequences]
  );

  /**
   * Reset sequence-active once there is no current-chunk
   * any more.
   */
  useEffect(() => {
    if (!currentChunk) {
      setIsSequenceActive(false);
    }
  }, [currentChunk]);

  useEffect(() => {
    if (!selectedSequence) return;

    const subSequenceLength = selectedSequence.subsequences.length;

    // Sequence not active
    if (
      chunkCounter === undefined ||
      (chunkCounter === subSequenceLength * reps && !scheduleBreak) ||
      chunkCounter > subSequenceLength * reps
    ) {
      setCurrentChunk(undefined);
      setChunkCounter(undefined);
      return;
    }

    // Break
    if (chunkCounter === subSequenceLength * reps) {
      setCurrentChunk({ type: ECategory.BREAK, duration: selectedSequence.break });
      return;
    }

    setCurrentChunk(selectedSequence.subsequences[chunkCounter % subSequenceLength].block);
  }, [chunkCounter, reps, scheduleBreak, selectedSequence]);

  return (
    <>
      <Header />
      <Container>
        <div className="content-container">
          <Heading color="white" mt="4vh" mb="3vh">
            {t('home.heading')}
          </Heading>
          <div className="sequence-selector">
            <Select
              onChange={handleChangeSelectSequence}
              colorScheme="white"
              color="white"
              defaultValue={userSequences && userSequences.length > 0 ? sequences[0].id : undefined}
              placeholder={selectedSequence ? undefined : t('home.sequence.select-placeholder')}
              disabled={isSequenceActive}
              minW="150px"
            >
              {sequences.map((seq) => (
                <option key={seq.id} value={seq.id}>
                  {seq.title}
                </option>
              ))}
            </Select>
            <Text color="white" ml="1vw" mr="1vw">
              {t('home.sequence.or')}
            </Text>
            <div>
              <Text
                className={classNames('create-sequence', { disabled: isSequenceActive })}
                size="md"
                onClick={() => {
                  if (!isSequenceActive) history.push(ERoutes.CREATE);
                }}
                width="180px"
              >
                {t('home.sequence.create')}
              </Text>
            </div>
          </div>
          <div className="rep-container">
            <Text color="white" mr="1vw">
              {t('home.chooseRep')}
            </Text>

            <RadioGroup onChange={onRepsChange} value={`${reps}`}>
              <Stack direction="row" spacing="6">
                <Radio value="1" isDisabled={isSequenceActive}>
                  <Text color="white">1/3</Text>
                </Radio>
                <Radio value="2" isDisabled={isSequenceActive}>
                  <Text color="white">2/3</Text>
                </Radio>
                <Radio value="3" isDisabled={isSequenceActive}>
                  <Text color="white">3/3</Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </div>
          <Checkbox
            onChange={() => setScheduleBreak((prev) => !prev)}
            isChecked={scheduleBreak}
            isDisabled={isSequenceActive}
            color="white"
            mb="3vh"
          >
            {t('home.scheduleBreak')}
          </Checkbox>
          <div className="sequence">
            {selectedSequence && (
              <Sequence
                subSequences={selectedSequence.subsequences}
                breakDuration={scheduleBreak ? selectedSequence.break : undefined}
                reps={reps}
              />
            )}
          </div>

          {currentChunk && (
            <div className="now-container">
              <NowBlock
                chunk={currentChunk}
                onFinished={onFinishedChunk}
                //  activity={`${'Neijia'}`} TODO:
              />
            </div>
          )}
          <Button
            variant="outline"
            onClick={onStartCancleButtonPress}
            border="2px"
            color="white"
            _hover={{ color: 'black', bg: 'white' }}
            mt="5vh"
            disabled={!selectedSequence}
          >
            {t(`home.${isSequenceActive ? 'cancle' : 'startNow'}`)}
            {!isSequenceActive &&
              selectedSequence &&
              ` (${getDurationString(selectedSequence, reps, scheduleBreak)})`}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
