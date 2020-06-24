import { backendUrl, basename } from '../lenker';
import { FetchError } from './api-utils';
import { Klageskjema } from '../App/Skjema/skjemaContext';

export interface Klage extends Klageskjema {
    orgnr: string;
    opprettet?: string;
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
