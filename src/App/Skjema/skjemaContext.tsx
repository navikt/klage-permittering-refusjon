import React, { createContext, FunctionComponent, useState } from 'react';

export interface SkjemaState {
    referansekode: string;
    tekst: string;
    navn: string;
    epost: string;
    telefonnr: string;
}

interface SkjemaContext {
    skjema: SkjemaState;
    setSkjema: (state: SkjemaState) => void;
}

const tomtSkjema: SkjemaState = {
    referansekode: '',
    tekst: '',
    navn: '',
    epost: '',
    telefonnr: '',
};

const defaultSkjemaContext = {
    skjema: tomtSkjema,
    setSkjema: (state: SkjemaState) => {},
};

export const skjemaContext = createContext<SkjemaContext>(defaultSkjemaContext);

export const SkjemaContextProvider: FunctionComponent = (props) => {
    const ContextProvider = skjemaContext.Provider;

    const [skjema, setSkjema] = useState<SkjemaState>(tomtSkjema);

    return <ContextProvider value={{ skjema, setSkjema }}>{props.children}</ContextProvider>;
};
