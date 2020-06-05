import amplitude from "../utils/amplitude";
import environment from "../utils/environment";

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