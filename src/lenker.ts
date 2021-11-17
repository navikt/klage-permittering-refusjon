import environment from './utils/environment';

export const basename = '/klage-permittering-refusjon';

export const minSideArbeidsgiverUrl = (orgnr: string) => {
    const orgNrDel = orgnr.length > 0 ? '?bedrift=' + orgnr : '';
    if (environment.MILJO === 'prod-sbs') {
        return 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/' + orgNrDel;
    } else {
        return 'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/' + orgNrDel;
    }
};

export const backendUrl = () => {
    if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
        return '/klage-permittering-refusjon/api/'
    } else {
        return 'http://localhost:3000/klage-permittering-refusjon/api/'
    }

};
