import {backendUrl, basename} from '../lenker';
import { FetchError } from './api-utils';

export interface Klage {
    orgnr: string;
    referansekode: string;
    navn: string;
    epost: string;
    telefonnr: string;
    tekst: string;
    opprettet: Date;
}

export const sendKlage = async (data: Klage) => {
    const backendurl: string = backendUrl();
    const respons = await fetch(`${backendurl}${data.orgnr}/klage`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return respons.status;
};

export async function hentKlager(orgnr: string): Promise<Klage[]> {
    let respons = await fetch(`${basename}/api/${orgnr}/klage`);
    if (respons.ok) {
        return await respons.json();
    } else {
        throw new FetchError(respons.statusText || respons.type, respons);
    }
}
