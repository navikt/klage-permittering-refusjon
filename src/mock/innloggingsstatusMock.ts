import fetchMock from 'fetch-mock';
import { Innloggingstatus } from '../api/innloggingsstatusApi';

export const innloggingsstatusMock: Innloggingstatus = {
    erInnlogget: false,
    harGyldigOidcToken: false,
    brukerId: null,
    niva: null,
    nivaOidc: null,
};

fetchMock.get('/klage-permittering-refusjon/veilarbstepup/status', innloggingsstatusMock);
