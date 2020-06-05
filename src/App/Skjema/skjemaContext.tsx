import React, { createContext, FunctionComponent, useState } from 'react';

export interface Klageskjema {
    referansekode: string;
    tekst: string;
    navn: string;
    epost: string;
    telefonnr: string;
}

const tomtSkjema: Klageskjema = {
    referansekode: '',
    tekst: '',
    navn: '',
    epost: '',
    telefonnr: '',
};

interface SkjemaContext {
    skjema: Klageskjema;
    settSkjemaVerdi: (felt: keyof Klageskjema, verdi: any) => void;
    avbryt: () => void;
}

export const SkjemaContext = createContext<SkjemaContext>({} as SkjemaContext);

export const SkjemaContextProvider: FunctionComponent = (props) => {
    const ContextProvider = SkjemaContext.Provider;
    const [skjema, setSkjema] = useState<Klageskjema>(tomtSkjema);

    const context: SkjemaContext = {
        settSkjemaVerdi: (felt, verdi) => {
            setSkjema({ ...skjema, [felt]: verdi });
        },
        avbryt: () => {
            setSkjema(tomtSkjema);
        },
        skjema,
    };
    return <ContextProvider value={context}>{props.children}</ContextProvider>;
};
