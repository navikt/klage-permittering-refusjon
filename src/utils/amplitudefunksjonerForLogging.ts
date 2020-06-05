import amplitude from "../utils/amplitude";
import environment from "../utils/environment";

/*export const loggBedriftsInfo = async (organisasjonNr: string, juridiskOrgNr: string) => {
    let infoFraEereg: OrganisasjonFraEnhetsregisteret = tomEnhetsregOrg;
    await hentUnderenhet(organisasjonNr).then(underenhet => {
        infoFraEereg = underenhet;
    });

    if (infoFraEereg !== tomEnhetsregOrg) {
        let infoFraEeregJuridisk: OrganisasjonFraEnhetsregisteret = tomEnhetsregOrg;
        await hentOverordnetEnhet(juridiskOrgNr).then(enhet => {
            infoFraEeregJuridisk = enhet;
        });
        if (infoFraEereg.naeringskode1 && infoFraEereg.naeringskode1.kode.startsWith('84')) {
            amplitude.logEvent('#arbeidsforhold bedriftsinfo OFFENTLIG');
            if (
                infoFraEereg.institusjonellSektorkode.kode &&
                infoFraEereg.institusjonellSektorkode.kode === '6500'
            ) {
                amplitude.logEvent('#arbeidsforhold bedriftsinfo  Kommuneforvaltningen');
            }
            if (
                infoFraEereg.institusjonellSektorkode.kode &&
                infoFraEereg.institusjonellSektorkode.kode === '6100'
            ) {
                amplitude.logEvent('#arbeidsforhold bedriftsinfo  Statsforvaltningen');
            }
        } else {
            amplitude.logEvent('#arbeidsforhold bedriftsinfo  PRIVAT');
        }
        amplitude.logEvent('#arbeidsforhold bedriftsinfo feilet med org: ' + infoFraEereg.navn + ' med opplysningspliktig: ' + infoFraEeregJuridisk.navn);
        const antallAnsatte = Number(infoFraEereg.antallAnsatte);
        const antallAnsatteJuridiske = Number(infoFraEeregJuridisk.antallAnsatte);
        switch (true) {
            case antallAnsatte < 20:
                amplitude.logEvent('#arbeidsforhold bedriftsinfo under 20 ansatte');
                break;
            case antallAnsatte > 3000:
                amplitude.logEvent('#arbeidsforhold bedriftsinfo over 3000 ansatte');
                break;
            case antallAnsatte > 1000:
                amplitude.logEvent('#arbeidsforhold bedriftsinfo over 1000 ansatte');
                break;
            case antallAnsatte > 500:
                amplitude.logEvent('#arbeidsforhold bedriftsinfo over 500 ansatte');
                break;
            case antallAnsatte > 100:
                amplitude.logEvent('#arbeidsforhold bedriftsinfo over 100 ansatte');
                break;
            case antallAnsatte >= 20:
                amplitude.logEvent('#arbeidsforhold bedriftsinfo over 20 ansatte');
                break;
            default:
                break;
        }
        switch (true) {
            case antallAnsatteJuridiske < 20:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo under 20 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 10000:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo over 10000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 8000:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo over 8000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 5000:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo over 5000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 3000:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo over 3000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 1000:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo over 1000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 500:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo over 500 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 100:
                amplitude.logEvent(
                    '#arbeidsforhold bedriftsinfo over 100 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske >= 20:
                amplitude.logEvent('#arbeidsforhold bedriftsinfo over 20 ansatte i juridisk enhet');
                break;
            default:
                break;
        }
    }

};
 */

export const loggBrukerLoggetPa = () => {
    if (environment.MILJO) {
        amplitude.logEvent('#klage-permittering-refusjon bruker logget på')
    }
}

export const loggKlageSendtInn = () => {
    if (environment.MILJO) {
        amplitude.logEvent('#klage-permittering-refusjon klage sendt inn')
    }
}

export const loggKlageSendtMislyktes = () => {
    if (environment.MILJO) {
        amplitude.logEvent('#klage-permittering-refusjon klage sendt inn mislyktes')
    }
}