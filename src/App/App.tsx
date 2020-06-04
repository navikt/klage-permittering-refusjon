import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginBoundary from './LogInn/LoginBoundary';
import Skjema from './Skjema/Skjema';
import Kvitteringsside from './Kvitteringsside/Kvitteringsside';
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
                    <Route exact path="/kvitteringsside">
                        <Kvitteringsside />
                    </Route>
                </Switch>
            </BrowserRouter>
        </LoginBoundary>
    );
};

export default App;
