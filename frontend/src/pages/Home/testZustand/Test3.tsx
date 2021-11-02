import { memo } from 'react';
import { selectBears, useTestZustand } from './zustand';

const Test3 = () => {
  const wolfs = useTestZustand(selectBears);

  console.log('# render Test3');

  return (
    <div>
      <span>{`Number of bears: ${wolfs}`}</span>
    </div>
  );
};

export default memo(Test3);
