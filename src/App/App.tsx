import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Skjema from './Skjema/Skjema';
import LoginBoundary from './LogInn/LoginBoundary';
import './App.less';

import environment from '../utils/environment';
import { opprett } from '../api/klagePermitteringRefusjonApi';

const App = () => {
    useEffect( () => {
        if (environment.MILJO) {
            opprett({innhold: 'Jeg vil klage'})
        }

    })

    return (
        <LoginBoundary>
            <BrowserRouter basename="/klage-permittering-refusjon">
                <Switch>
                    <Route path="/" exact={true} component={Skjema} />
                </Switch>
            </BrowserRouter>
        </LoginBoundary>

    );
};

export default App;
