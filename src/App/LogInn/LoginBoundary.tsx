import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentInnloggingstatus, Innloggingstatus } from '../../api/innloggingsstatusApi';
import { LoggInn } from './LoggInn';
import { veilarbstepupUrl } from '../../lenker';
import environment from '../../utils/environment';

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

function setEssoCookieLocally() {
    document.cookie = 'nav-esso=0123456789..*; path=/; domain=localhost;';
}
function getEssoToken(veilarbStatusRespons: Innloggingstatus) {
    if (!veilarbStatusRespons.erInnlogget) {
        window.location.href = veilarbstepupUrl();
    }
}
const LoginBoundary: FunctionComponent = (props) => {
    const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

    function localLogin() {
        if (document.cookie.includes('selvbetjening-idtoken')) {
            setInnlogget(Tilgang.TILGANG);
        } else {
            setInnlogget(Tilgang.IKKE_TILGANG);
        }
        setEssoCookieLocally();
    }

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        const getLoginStatus = async () => {
            if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
                let veilarbStatusRespons = await hentInnloggingstatus();
                if (
                    veilarbStatusRespons.harGyldigOidcToken &&
                    veilarbStatusRespons.nivaOidc === 4
                ) {
                    getEssoToken(veilarbStatusRespons);
                    setInnlogget(Tilgang.TILGANG);
                } else {
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
