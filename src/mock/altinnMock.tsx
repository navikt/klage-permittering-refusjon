import fetchMock from 'fetch-mock';
import { testRespons, tilgangTilAtinntjenesteRespons } from './mockresponsFraAltinn';
import { basename } from '../lenker';

const delay = new Promise((res) => setTimeout(res, 500));

fetchMock
    .get(
        basename + '/api/organisasjoner',
        delay.then(() => {
            return testRespons;
        })
    )
    .spy();

fetchMock
    .get(
        basename + '/api/organisasjoner/refusjon',
        delay.then(() => {
            return tilgangTilAtinntjenesteRespons;
        })
    )
    .spy();
