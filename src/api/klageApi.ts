import { backendUrl } from '../lenker';

interface Klage {
    orgnr: string;
    referansekode: string;
    navn: string;
    epost: string;
    telefonnr: string;
    tekst: string;
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
    console.log('respons status: ' + respons.status);
    return 500;
};
