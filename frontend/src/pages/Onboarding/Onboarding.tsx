import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { ERoutes } from '../../routes/types';

interface IOnboardingProps extends RouteComponentProps {}

const Onboarding = ({ history }: IOnboardingProps) => {
  return (
    <div className="App">
      <span>Here we come, let's create your first sequence.</span>
      <div>
        <Link to={ERoutes.DEFAULT}>Done? Alright, let's be productive!</Link>
      </div>
    </div>
  );
};

export default Onboarding;
