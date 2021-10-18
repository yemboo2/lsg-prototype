import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './routes';

const RouterOutlet = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route) => (
        <Route path={route.path} component={route.component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default RouterOutlet;
