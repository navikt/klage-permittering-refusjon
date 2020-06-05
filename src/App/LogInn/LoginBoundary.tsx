import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentInnloggingstatus } from '../../api/innloggingsstatusApi';
import { LoggInn } from './LoggInn';
import environment from '../../utils/environment';

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

const LoginBoundary: FunctionComponent = (props) => {
    const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

    function localLogin() {
        if (document.cookie.includes('localhost-idtoken')) {
            setInnlogget(Tilgang.TILGANG);
        } else {
            setInnlogget(Tilgang.IKKE_TILGANG);
        }
    }

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        const getLoginStatus = async () => {
            if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
                let innloggingsstatus = await hentInnloggingstatus();
                if (innloggingsstatus.harGyldigOidcToken && innloggingsstatus.nivaOidc === 4) {
                    setInnlogget(Tilgang.TILGANG);
                } else if (!innloggingsstatus.harGyldigOidcToken) {
                    setInnlogget(Tilgang.IKKE_TILGANG);
                }
            } else {
                localLogin();
            }
        };
        getLoginStatus();
    }, []);

    if (innlogget === Tilgang.TILGANG) {
        return <> {props.children} </>;
    }
    if (innlogget === Tilgang.IKKE_TILGANG) {
        return <LoggInn />;
    } else {
        return null;
    }
};

export default LoginBoundary;
