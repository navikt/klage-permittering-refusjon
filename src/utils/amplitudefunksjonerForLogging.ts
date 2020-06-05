import amplitude from '../utils/amplitude';
import environment from '../utils/environment';

export const loggBrukerLoggetPa = () => {
    if (environment.MILJO) {
        amplitude.logEvent('#klage-permittering-refusjon bruker logget på');
    }
};

export const loggKlageSendtInn = () => {
    if (environment.MILJO) {
        amplitude.logEvent('#klage-permittering-refusjon klage sendt inn');
    }
};

export const loggKlageSendtMislyktes = () => {
    if (environment.MILJO) {
        amplitude.logEvent('#klage-permittering-refusjon klage sendt inn mislyktes');
    }
};

export const loggAntallTegn = (antallTegn: number) => {
    switch (true) {
        case antallTegn < 100:
            amplitude.logEvent('#klage-permittering-refusjon under 100 tegn');
            break;
        case antallTegn < 1000:
            amplitude.logEvent('#klage-permittering-refusjon under 1000');
            break;
        case antallTegn < 2000:
            amplitude.logEvent('#klage-permittering-refusjon under 2000');
            break;
        case antallTegn < 3000:
            amplitude.logEvent('#klage-permittering-refusjon under 3000');
            break;
        case antallTegn >= 3000:
            amplitude.logEvent('#klage-permittering-refusjon over 3000');
            break;
        default:
        // code block
    }
};

export const loggBrukerBrukerForMangeTegn = () => {
    amplitude.logEvent('#klage-permittering-refusjon bruker taster inn mer enn 4000 tegn');
};
