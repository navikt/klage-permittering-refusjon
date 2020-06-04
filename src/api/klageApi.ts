
export const sendKlage = async () => {
    const respons = await fetch('/klage-permittering-refusjon/api/skjema', {
        method: 'GET',
        credentials: 'include',
    });
};
