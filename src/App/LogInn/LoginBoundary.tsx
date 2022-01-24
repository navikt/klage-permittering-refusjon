import React, { FunctionComponent, useEffect, useState } from 'react';
import { LoggInn } from './LoggInn';
import { sjekkInnlogget} from "../../api/altinnApi";

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

const LoginBoundary: FunctionComponent = (props) => {
    const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        const getLoginStatus = async () => {
            const abortController = new AbortController();
            const signal = abortController.signal;
            let innloggingsstatus = await sjekkInnlogget(signal);
            if (innloggingsstatus) {
                setInnlogget(Tilgang.TILGANG);
            } else {
                setInnlogget(Tilgang.IKKE_TILGANG);
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
