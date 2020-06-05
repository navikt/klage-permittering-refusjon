import { basename } from '../lenker';

interface Klage {
    orgnr: string;
    referansekode: string;
    navn: string;
    epost: string;
    telefonnr: string;
    tekst: string;
}

export const sendKlage = async (data: Klage) => {
    const respons = await fetch(`${basename}/klage-permittering-refusjon/api/${data.orgnr}/klage`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return respons.status;
};
