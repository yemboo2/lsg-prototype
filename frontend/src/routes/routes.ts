import { ERoutes, IRoute } from './types';
import Home from '../pages/Home/Home';
import Onboarding from '../pages/Onboarding/Onboarding';
import Dashboard from '../pages/Dashboard/Dashboard';
import WaitForIt from '../pages/Wait-for-it/WaitForIt';

export const routes: IRoute[] = [
  {
    path: ERoutes.DASHBOARD,
    component: Dashboard,
  },
  {
    path: ERoutes.CREATE,
    component: Onboarding,
  },
  {
    path: ERoutes.WAIT_FOR_IT,
    component: WaitForIt,
  },
  {
    path: ERoutes.DEFAULT,
    component: Home,
  },
];
