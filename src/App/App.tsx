import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Hovedside from './Hovedside/Hovedside';
// import amplitude from '../utils/amplitude';
import './App.less';

const App = () => {
    // amplitude.logEvent('bla bla bla', bla);

    return (
        <div className="app">
            <BrowserRouter basename="/klage-permittering-refusjon">
                <Switch>
                    <Route path="/" exact={true} component={Hovedside} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
