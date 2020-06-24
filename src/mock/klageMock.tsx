import fetchMock from 'fetch-mock';
import { basename } from '../lenker';
import { Klage } from '../api/klageApi';

const delay = new Promise((res) => setTimeout(res, 500));

fetchMock
    .get(
        `express:${basename}/api/:orgnr/klage`,
        delay.then(() => {
            return klageRespons;
        })
    )
    .spy();

// const klageRespons: Klage[] = [];

const klageRespons: Klage[] = [
    {
        orgnr: '12345678',
        referansekode: 'string123',
        navn: 'Ole Hansen',
        epost: 'ole.hansen@telenor.no',
        telefonnr: '12345678',
        tekst: 'Jeg klager på ditten og datten',
        klagetype: 'ENDRING',
        opprettet: '010780',
    },
    {
        orgnr: '12345678',
        referansekode: 'abc123',
        navn: 'Kari Nordmann',
        epost: 'kari.nordmann@nav.no',
        telefonnr: '12345678',
        tekst: 'Klage og endring og bla bla',
        klagetype: 'KLAGE',
        opprettet: '010780',
    },
];
