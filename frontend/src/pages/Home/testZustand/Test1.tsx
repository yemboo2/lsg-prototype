import { memo } from 'react';
import { selectIncreasePopulation, useTestZustand } from './zustand';

const Test1 = () => {
  const increasePopulation = useTestZustand(selectIncreasePopulation);

  console.log('# render Test1');

  return (
    <div>
      <span onClick={increasePopulation}>Test1 - increase</span>
    </div>
  );
};

export default memo(Test1);
