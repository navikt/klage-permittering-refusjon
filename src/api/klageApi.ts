export const sendKlage = async (data: {
    orgnr: string;
    referansekode: string;
    navn: string;
    epost: string;
    telefonnr: string;
    tekst: string;
}) => {
    const respons = await fetch(`/klage-permittering-refusjon/api/${data.orgnr}/klage`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return respons.status;
};
