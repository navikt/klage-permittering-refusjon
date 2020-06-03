import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Skjema from './Skjema/Skjema';
import LoginBoundary from './LogInn/LoginBoundary';
import './App.less';

const App = () => {
    return (
        <div className="app">
            <LoginBoundary>
                <BrowserRouter basename="/klage-permittering-refusjon">
                    <Switch>
                        <Route path="/" exact={true} component={Skjema} />
                    </Switch>
                </BrowserRouter>
            </LoginBoundary>
        </div>
    );
};

export default App;
