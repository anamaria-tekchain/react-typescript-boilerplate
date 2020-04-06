//polyfills

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App/App';

require('./styles/global.css');

ReactDOM.render(
    <App name="World"/>,
    document.getElementById('appContainer')
);