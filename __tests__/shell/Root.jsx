import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from '../../src/client/js/shell/Root';

test('renders without throwing an error', () => {
  const renderTarget = document.createElement('div');
  ReactDOM.render(<Root />, renderTarget);
});
