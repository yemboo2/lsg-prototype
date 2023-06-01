import React, { useCallback, useState } from 'react';
import { Select } from '@chakra-ui/select';
import { useTranslation } from 'react-i18next';
import { Text } from '@chakra-ui/layout';

import { Container } from './styles';
import { IActivity } from '../../../../interfaces/activities-interface';

// TODO: Think: Maybe I can pass a zuustand here or a zustand-selector?
interface IStepPriorityProps {
  activities: IActivity[];
  onPriorityChanged: (activity: string, priority: number) => void;
}

const StepPriority = ({ activities: act, onPriorityChanged }: IStepPriorityProps) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [activities, setActivities] = useState<IActivity[]>(act); // FIXME: remove
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = activities.findIndex((activity) => activity.name === event.target.value);
    setCurrentIdx(idx);
  };

  const handleChangePrio = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onPriorityChanged(activities[currentIdx].name, Number(event.target.value));
      setActivities((prev) => {
        const current = [...prev];
        current[currentIdx].priority = Number(event.target.value);
        return current;
      }); // FIXME: remove
    },
    [currentIdx]
  );

  return (
    <Container>
      <Text color="white">Priorites are from 1 (low) to 10 (high)</Text>
      <div className="selectors">
        <div className="activity-selector">
          <Select
            onChange={handleChange}
            colorScheme="white"
            color="white"
            defaultValue={activities && activities.length > 0 ? activities[0].name : undefined}
          >
            {activities.map((activity, idx) => (
              <option key={activity.name} value={activity.name}>
                {t(`activities.${activity.name}`)}
              </option>
            ))}
          </Select>
        </div>
        <div className="priority-selector">
          <Select
            value={activities[currentIdx].priority}
            onChange={handleChangePrio}
            colorScheme="white"
            color="white"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((prio: number) => (
              <option key={`prio${prio}`} value={prio}>
                {prio}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Container>
  );
};

export default StepPriority;
