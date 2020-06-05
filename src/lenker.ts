import environment from './utils/environment';

export const basename = '/klage-permittering-refusjon';

export const veilarbstepupUrl = () => {
    if (environment.MILJO === 'prod-sbs') {
        return 'https://tjenester.nav.no/veilarbstepup/oidc?url=https://arbeidsgiver.nav.no/klage-permittering-refusjon';
    } else {
        return 'https://tjenester-q1.nav.no/veilarbstepup/oidc?url=https://arbeidsgiver-q.nav.no/klage-permittering-refusjon';
    }
};

export const minSideArbeidsgiverUrl = (orgnr: string) => {
    const orgNrDel = orgnr.length > 0 ? '?bedrift=' + orgnr : '';
    if (environment.MILJO === 'prod-sbs') {
        return 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/' + orgNrDel;
    } else {
        return 'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/' + orgNrDel;
    }
};

export const testLenkeBackend = () => {
    return '/klage-permittering-refusjon/api/klage'
};
