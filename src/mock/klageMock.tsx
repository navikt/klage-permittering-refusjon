import fetchMock from 'fetch-mock';
import { basename } from '../lenker';
import { Klageskjema } from '../App/Skjema/skjemaContext';

const delay = new Promise((res) => setTimeout(res, 500));

fetchMock
    .get(
        `express:${basename}/api/:orgnr/klage`,
        delay.then(() => {
            return klageRespons;
        })
    )
    .spy();

const klageRespons: Klageskjema[] = [
    {
        epost: 'ole.hansen@telenor.no',
        navn: 'Ole Hansen',
        referansekode: 'REF2020123ABC54S456',
        tekst: 'Jeg klager på ditten og datten',
        telefonnr: '90847457',
    },
];
