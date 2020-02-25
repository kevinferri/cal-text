import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LoggedInRoot } from './ts/shell/LoggedInRoot';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <LoggedInRoot />
  </BrowserRouter>,
  document.getElementById('mount-node'),
);
