export const basename = '/klage-permittering-refusjon';

export const veilarbstepupUrl = () => {
    return 'https://tjenester.nav.no/veilarbstepup/oidc?url=https://arbeidsgiver.nav.no/klage-permittering-refusjon';
};

export const minSideArbeidsgiverUrl = (orgnr: string) => {
    const orgNrDel = orgnr.length > 0 ? '?bedrift=' + orgnr : '';
    return 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/' + orgNrDel;
};

export const backendUrl = () => {
    return '/klage-permittering-refusjon/api/'
};
