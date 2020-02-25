import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LoggedOutRoot } from './ts/shell/LoggedOutRoot';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <LoggedOutRoot />
  </BrowserRouter>,
  document.getElementById('mount-node'),
);
