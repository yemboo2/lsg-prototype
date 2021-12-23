import { Text } from '@chakra-ui/layout';
import { Button, Icon } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdPause, MdPlayArrow, MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import classNames from 'classnames';

import { IBlock } from '../../../../interfaces/sequence-interface';
import { CssColors } from '../../../../styles/colors';
import { Containter } from './styles';

const TRANSITION_TIMEOUT = 15; // seconds
const SNOOZE_EXTEND_TIME = 60; // seconds
const EXTEND_TRESHOLD = 5 * 60; // seconds

const secondsToString = (seconds: number) => {
  const isNegative: boolean = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const mins = Math.floor(absSeconds / 60);
  const secs = Math.floor(absSeconds % 60);

  return `${isNegative ? '-' : ''}${mins <= 9 ? '0' : ''}${mins}:${secs <= 9 ? '0' : ''}${secs}`;
};

interface INowBlockProps {
  chunk?: IBlock;
  activity?: string;
  onFinished: () => void;
}

const NowBlock = ({ chunk, activity, onFinished }: INowBlockProps) => {
  const { t } = useTranslation();

  // States
  const [time, setTime] = useState<number | undefined>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [runningChunk, setRunningChunk] = useState<IBlock | undefined>(undefined);
  const [isTransition, setIsTransition] = useState<boolean>(false);

  // Refs
  const audioRef = useRef<any>();
  const intervalRef = useRef<number>();
  const transitionAvailableRef = useRef<boolean>(false);
  const transitionTimeoutRef = useRef<number>();
  const endTime = useRef<number | undefined>();
  const chunkFinished = useRef<boolean>(false);

  /**
   * Init audio.
   * Callback clears interval.
   */
  useEffect(() => {
    audioRef.current = new Audio('./audio/beep.mp3');

    return () => {
      if (intervalRef && intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const start = useCallback(() => {
    intervalRef.current = window.setInterval(() => {
      setTime(
        endTime && endTime.current !== undefined
          ? endTime.current - Math.floor(Date.now() / 1000)
          : 0
      );
    }, 1000);
  }, []);

  const resume = useCallback(() => {
    if (isTransition) return; // No pause-play functionnality in the transition state

    if (endTime) endTime.current = Math.floor(Date.now() / 1000) + (time || 0);
    setIsPaused(false);
    start();
  }, [isTransition, time]);

  const pause = useCallback(() => {
    if (isTransition) return; // No pause-play functionnality in the transition state

    setIsPaused(true);
    if (intervalRef && intervalRef.current) window.clearInterval(intervalRef.current);
  }, [isTransition]);

  const snoozeExtend = useCallback(() => {
    if (endTime && endTime.current !== undefined) endTime.current += SNOOZE_EXTEND_TIME;
    setTime(
      endTime && endTime.current !== undefined ? endTime.current - Math.floor(Date.now() / 1000) : 0
    );

    if (transitionTimeoutRef && transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = undefined;
    }
    chunkFinished.current = false;
  }, []);

  const timesUp = useCallback(() => {
    setIsTransition(true);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransition(false);
      setRunningChunk(chunk);
      if (endTime && endTime.current !== undefined) {
        endTime.current = chunk ? endTime.current + chunk.duration * 60 : undefined;
        setTime(
          endTime && endTime.current !== undefined
            ? endTime.current - Math.floor(Date.now() / 1000)
            : 0
        );
      }
      transitionTimeoutRef.current = undefined;
      chunkFinished.current = false;
    }, TRANSITION_TIMEOUT * 1000);
  }, [chunk]);

  /**
   * Set new duration & start interval if first chunk
   */
  useEffect(() => {
    // First chunk
    if (!transitionAvailableRef || !transitionAvailableRef.current) {
      transitionAvailableRef.current = true;
      setRunningChunk(chunk);
      if (endTime) {
        endTime.current = chunk ? Math.floor(Date.now() / 1000) + chunk.duration * 60 : undefined;
        setTime(
          endTime && endTime.current !== undefined
            ? endTime.current - Math.floor(Date.now() / 1000)
            : 0
        );
      }
    }

    if (chunk && !intervalRef?.current) {
      start();
    }
  }, [chunk]);

  /**
   * Handle when new chunk arrives.
   */
  useEffect(() => {
    if (chunk && runningChunk && chunk.type !== runningChunk?.type) {
      timesUp();
    }
  }, [chunk, runningChunk]);

  /**
   * Check if chunk is done. If yes and not in tranistion
   * state trigger callback & notification (sound). If yes
   * and in transistion state fire timesUp.
   */
  useEffect(() => {
    // We need 'chunkFinished' as additional term here
    // because if the application is in an inactive
    // browser-tab its computing is prioritzed lower leading
    // to a tick taking a bit more than 1000ms. As our logic
    // is with each tick to calc the difference between now
    // and the endtime it is possible that at one tick the
    // calculated time is > 1 (Math.floor leading to 1) an
    // the next tick the calculated time is < 0 (Math.abs &
    // Math.floor leading to (-)1) and as a result time is
    // never 0.
    if (
      time !== undefined &&
      (time === 0 || time === -1) &&
      chunkFinished &&
      !chunkFinished.current
    ) {
      chunkFinished.current = true;

      if (!muted) {
        const audioPromise = audioRef.current.play();
        if (audioPromise !== undefined) {
          audioPromise.catch((err: any) => {
            console.log('Error when playing timer audio', err);
          });
        }
      }

      if (!isTransition) {
        setTimeout(() => onFinished(), 1000);
      } else {
        timesUp();
      }
    }
  }, [time, muted, isTransition, chunk]);

  const getStyle = () => {
    if (!runningChunk || !chunk) return {};

    if (isTransition) {
      return {
        background: `linear-gradient(to right, ${CssColors.Category[runningChunk.type]}, ${
          CssColors.Category[chunk.type]
        })`,
      };
    }

    return {
      background: `linear-gradient(to right, ${CssColors.Category[runningChunk.type]}, ${
        CssColors.Category[runningChunk.type]
      })`,
    };
  };

  const getTitle = () => {
    if (isTransition) {
      return `${t(`category.${runningChunk!.type}`)} -> ${t(`category.${chunk!.type}`)}`;
    }

    return t(`category.${runningChunk!.type}`);
  };

  return (
    <Containter style={getStyle()}>
      {runningChunk !== undefined && (
        <>
          <div className="mute-unmute" onClick={toggleMute}>
            <Icon as={muted ? MdVolumeOff : MdVolumeUp} color="white" boxSize={8} />
          </div>
          <div
            className={classNames('pause-play', { disabled: isTransition })}
            onClick={isPaused ? resume : pause}
          >
            <Icon
              as={isPaused ? MdPlayArrow : MdPause}
              color={isTransition ? 'grey' : 'white'}
              boxSize={8}
            />
          </div>
          <div className="heading">
            <Text fontSize="3xl" color="white" width="100%" textAlign="center">
              {getTitle()}
            </Text>
          </div>
          <Text
            fontSize="7xl"
            color="white"
            width="100%"
            textAlign="center"
            mr={(time || 0) < 0 ? '30px' : undefined}
          >
            {time !== undefined && secondsToString(time)}
          </Text>
          {(isTransition || (time !== undefined && time < EXTEND_TRESHOLD)) && (
            <Button
              className="snooze"
              onClick={snoozeExtend}
              variant="outline"
              color="white"
              _hover={{ color: 'black', bg: 'white' }}
            >
              {t(`now-block.${isTransition ? 'snooze' : 'extend'}`)}
            </Button>
          )}
          {activity && (
            <Text fontSize="md" color="white" width="100%" textAlign="center" mt="3vh   ">
              {activity}
            </Text>
          )}
        </>
      )}
    </Containter>
  );
};

export default NowBlock;
