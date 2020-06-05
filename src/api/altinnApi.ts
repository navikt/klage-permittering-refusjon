import { FetchError } from './api-utils';
import {basename} from "../lenker";

export interface Organisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: any;
}

export const tomaAltinnOrganisasjon: Organisasjon = {
    Name: '',
    Type: '',
    OrganizationNumber: '',
    OrganizationForm: '',
    Status: '',
    ParentOrganizationNumber: '',
};

export async function hentOrganisasjonerFraAltinn(signal: any): Promise<Organisasjon[]> {
    let respons = await fetch(basename + '/api/organisasjoner', { signal: signal });
    if (respons.ok) {
        console.log('organisasjoner Altinn:', respons);
        return await respons.json();
    } else {
        throw new FetchError(respons.statusText || respons.type, respons);
    }
}

export async function hentOrganisasjonerMedTilgangTilAltinntjeneste(
    serviceKode: string,
    serviceEdition: string,
    signal: any
): Promise<Organisasjon[]> {
    let respons = await fetch(
        basename + '/api/rettigheter-til-skjema/?serviceKode=' +
            serviceKode +
            '&serviceEdition=' +
            serviceEdition,
        { signal: signal }
    );
    if (respons.ok) {
        console.log('tilgangAltinn:', respons);
        return await respons.json();
    } else {
        throw new FetchError(respons.statusText || respons.type, respons);
    }
}
