export type Klageskjema = {
    innhold: string;
}

export type OpprettKlageSkjema = Pick<Klageskjema, 'innhold'>;