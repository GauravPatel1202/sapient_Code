import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';

export default function Routes() {
  return (
    <div>
    <Switch>
      
      <Route path="/:page?" exact component={Home} />
    </Switch>
    </div>
  );
}
