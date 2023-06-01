export const ERoutes = {
  DEFAULT: '/',
  CREATE: '/create',
  DASHBOARD: '/dashboard',
  WAIT_FOR_IT: '/wait-for-it',
};

export interface IRoute {
  path: string;
  component: any;
}
