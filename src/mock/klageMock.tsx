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
        telefonnr: '90087345',
        tekst: 'Jeg klager på ditten og datten',
        klagetype: 'ENDRING',
        opprettet: '2020-06-09T13:41:59.792247',
    },
    {
        orgnr: '12345678',
        referansekode: 'abc123',
        navn: 'Kari Nordmann',
        epost: 'kari.nordmann@nav.no',
        telefonnr: '90855435',
        tekst: 'Klage og endring og bla bla',
        klagetype: 'KLAGE',
        opprettet: '2020-04-21T13:41:59.792247',
    },
    {
        orgnr: '12345678',
        referansekode: 'abc123',
        navn: 'Kari Nordmann',
        epost: 'kari.nordmann@nav.no',
        telefonnr: '90855435',
        tekst: 'Klage og endring og bla bla',
        klagetype: 'KLAGE',
        opprettet: '2020-05-16T13:41:59.792247',
    },
];
