import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

if (process.env.REACT_APP_MOCK) {
    console.log('==========================================');
    console.log('=============== MED MOCK =================');
    console.log('=== DETTE SKAL DU IKKE SE I PRODUKSJON ===');
    console.log('==========================================');

    require('./mock/altinnMock');
    require('./mock/klageMock');
}

ReactDOM.render(<App />, document.getElementById('root'));
