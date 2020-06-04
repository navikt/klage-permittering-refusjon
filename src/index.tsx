import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { sendKlage } from './api/klageApi';

ReactDOM.render(<App />, document.getElementById('root'));
