import { memo } from 'react';
import { selectSetPopulation, useTestZustand } from './zustand';

const Test2 = () => {
  const setPopulation = useTestZustand(selectSetPopulation);

  console.log('# render Test2');

  return (
    <div>
      <span onClick={() => setPopulation(2)}>Test2 - set</span>
    </div>
  );
};

export default memo(Test2);
