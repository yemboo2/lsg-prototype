import { ERoutes, IRoute } from './types';
import Home from '../pages/Home/Home';
import Onboarding from '../pages/Onboarding/Onboarding';

export const routes: IRoute[] = [
  {
    path: ERoutes.ONBOARDING,
    component: Onboarding,
  },
  {
    path: ERoutes.DEFAULT,
    component: Home,
  },
];
