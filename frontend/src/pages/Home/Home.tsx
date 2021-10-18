import { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { ERoutes } from '../../routes/types';

interface IHomeProps extends RouteComponentProps {}

const Home = ({ history }: IHomeProps) => {
  const [count, setCount] = useState<number>(0);

  function onClick() {
    setCount((prev) => (prev += 1));
  }

  return (
    <div className="App">
      <div style={{ marginBottom: '50px' }}>
        <Link to={ERoutes.ONBOARDING}>No sequence yet? Let's get started.</Link>
      </div>
      {count !== 0 && <p>You clicked me {count} times.</p>}
      <button onClick={onClick}>Click Me!</button>
    </div>
  );
};

export default Home;
