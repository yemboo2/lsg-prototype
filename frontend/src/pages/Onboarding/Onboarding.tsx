import { Link } from 'react-router-dom';

import { ERoutes } from '../../routes/types';

// interface IOnboardingProps extends RouteComponentProps {}

const Onboarding = () => (
  <div className="App">
    <span>Here we come, lets create your first sequence.</span>
    <div>
      <Link to={ERoutes.DEFAULT}>Done? Alright, lets be productive!</Link>
    </div>
  </div>
);

export default Onboarding;
