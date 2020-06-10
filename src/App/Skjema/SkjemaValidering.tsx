import { Klageskjema } from "./skjemaContext";

export const erGyldigTelefonNr = (nr: string) => {
    const bestarAvSiffer = nr.match(/^[0-9]+$/);
    const erStandard = nr.match(/^[0-9]+$/) != null && nr.length === 8;
    const begynnerMed0047 = nr.substring(0, 4) === '0047' && bestarAvSiffer && nr.length === 12;
    const begynnerMedPluss =
        nr.substr(0, 3) === '+47' &&
        nr.length === 11 &&
        nr.substring(3, 11).match(/^[0-9]+$/) != null;
    return erStandard || begynnerMed0047 || begynnerMedPluss;
};

export const erGyldigEpost = (epost: string) => {
    // kilde for regex https://emailregex.com (RFC 5322 Official Standard)
    const regexp = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const isValidEmail = regexp.test(epost);

    return isValidEmail;
};

export const erIkkeTomString = (str: string) => str !== '' && !!str;

export const erSkjemaGyldig = (skjema: Klageskjema): boolean => {
    return (
        erGyldigTelefonNr(skjema.telefonnr) &&
        erGyldigEpost(skjema.epost) &&
        erIkkeTomString(skjema.telefonnr) &&
        erIkkeTomString(skjema.epost) &&
        erIkkeTomString(skjema.tekst) &&
        erIkkeTomString(skjema.navn)
    );
};

