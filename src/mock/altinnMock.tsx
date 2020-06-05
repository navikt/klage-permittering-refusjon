import fetchMock from 'fetch-mock';
import { testRespons, tilgangTilAtinntjenesteRespons } from './mockresponsFraAltinn';
import {basename} from "../lenker";

const delay = new Promise((res) => setTimeout(res, 500));

fetchMock
    .get(
        basename +'/api/organisasjoner',
        delay.then(() => {
            return testRespons;
        })
    )
    .spy();

fetchMock
    .get(
        basename + '/api/rettigheter-til-skjema/?serviceKode=4936&serviceEdition=1',
        delay.then(() => {
            return tilgangTilAtinntjenesteRespons;
        })
    )
    .spy();
