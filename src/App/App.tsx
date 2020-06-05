import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import {
    hentOrganisasjonerFraAltinn,
    hentOrganisasjonerMedTilgangTilAltinntjeneste,
    Organisasjon,
    tomaAltinnOrganisasjon,
} from '../api/altinnApi';
import { basename } from '../lenker';
import { APISTATUS } from '../api/api-utils';
import LoginBoundary from './LogInn/LoginBoundary';
import HovedBanner from './HovedBanner/HovedBanner';
import Skjema from './Skjema/Skjema';
import Kvitteringsside from './Kvitteringsside/Kvitteringsside';
import IngenTilgangInfo from './IngenTilgangInfo/IngenTilgangInfo';
import './App.less';
import { loggBrukerLoggetPa } from '../utils/amplitudefunksjonerForLogging';
import { SkjemaContextProvider } from './Skjema/skjemaContext';

enum TILGANGSSTATE {
    LASTER,
    TILGANG,
    IKKE_TILGANG,
}

const App = () => {
    const SERVICEKODEINNTEKTSMELDING = '4936';
    const SERVICEEDITIONINNTEKTSMELDING = '1';
    const [organisasjonerLasteState, setOrganisasjonerLasteState] = useState<APISTATUS>(
        APISTATUS.LASTER
    );
    const [organisasjoner, setorganisasjoner] = useState(Array<Organisasjon>());
    const [organisasjonerMedTilgang, setOrganisasjonerMedTilgang] = useState<Array<
        Organisasjon
    > | null>(null);
    const [tilgangState, setTilgangState] = useState(TILGANGSSTATE.LASTER);
    const [valgtOrganisasjon, setValgtOrganisasjon] = useState<Organisasjon>(
        tomaAltinnOrganisasjon
    );

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        hentOrganisasjonerFraAltinn(signal)
            .then((organisasjonsliste) => {
                setorganisasjoner(
                    organisasjonsliste.filter(
                        (organisasjon) =>
                            organisasjon.OrganizationForm === 'BEDR' ||
                            organisasjon.Type === 'Enterprise'
                    )
                );
                hentOrganisasjonerMedTilgangTilAltinntjeneste(
                    SERVICEKODEINNTEKTSMELDING,
                    SERVICEEDITIONINNTEKTSMELDING,
                    signal
                )
                    .then((organisasjonerMedTilgangFraAltinn) => {
                        setOrganisasjonerMedTilgang(organisasjonerMedTilgangFraAltinn);
                        setOrganisasjonerLasteState(APISTATUS.OK);
                    })
                    .catch(() => {
                        setOrganisasjonerLasteState(APISTATUS.FEILET);
                    });
            })
            .catch(() => {
                setOrganisasjonerLasteState(APISTATUS.FEILET);
            });
        return function cleanup() {
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        setTilgangState(TILGANGSSTATE.LASTER);
        if (organisasjonerMedTilgang && valgtOrganisasjon !== tomaAltinnOrganisasjon) {
            if (
                organisasjonerMedTilgang.filter((organisasjonMedTilgang) => {
                    return (
                        organisasjonMedTilgang.OrganizationNumber ===
                        valgtOrganisasjon.OrganizationNumber
                    );
                }).length >= 1
            ) {
                setTilgangState(TILGANGSSTATE.TILGANG);
            } else {
                setTilgangState(TILGANGSSTATE.IKKE_TILGANG);
            }
        }
        if (organisasjonerMedTilgang && organisasjonerMedTilgang.length === 0) {
            setTilgangState(TILGANGSSTATE.IKKE_TILGANG);
        }
    }, [valgtOrganisasjon, organisasjonerMedTilgang]);

    useEffect(() => {
        loggBrukerLoggetPa();
    });

    return (
        <LoginBoundary>
            <SkjemaContextProvider>
                <Router basename={basename}>
                    {organisasjonerLasteState !== APISTATUS.LASTER && (
                        <HovedBanner
                            byttOrganisasjon={setValgtOrganisasjon}
                            organisasjoner={
                                organisasjonerLasteState === APISTATUS.OK ? organisasjoner : []
                            }
                        />
                    )}
                    {organisasjonerLasteState === APISTATUS.OK ? (
                        <>
                            {tilgangState !== TILGANGSSTATE.LASTER && (
                                <>
                                    <Route exact path="/">
                                        {tilgangState === TILGANGSSTATE.TILGANG && (
                                            <Skjema valgtOrganisasjon={valgtOrganisasjon} />
                                        )}
                                        {tilgangState === TILGANGSSTATE.IKKE_TILGANG && (
                                            <IngenTilgangInfo
                                                valgtOrganisasjon={valgtOrganisasjon}
                                                bedrifterMedTilgang={
                                                    organisasjonerMedTilgang &&
                                                    organisasjonerMedTilgang.filter(
                                                        (organisasjonMedTilgang) => {
                                                            return (
                                                                organisasjonMedTilgang.OrganizationForm ===
                                                                'BEDR'
                                                            );
                                                        }
                                                    )
                                                }
                                            />
                                        )}
                                    </Route>
                                    <Route exact path="/kvitteringsside">
                                        <Kvitteringsside valgtOrganisasjon={valgtOrganisasjon} />
                                    </Route>
                                </>
                            )}
                        </>
                    ) : organisasjonerLasteState === APISTATUS.LASTER ? (
                        <NavFrontendSpinner type="S" />
                    ) : (
                        <div className="feilmelding-altinn">
                            <AlertStripeFeil>
                                Vi opplever ustabilitet med Altinn. Hvis du mener at du har roller i
                                Altinn kan du prøve å laste siden på nytt.
                            </AlertStripeFeil>
                        </div>
                    )}
                </Router>
            </SkjemaContextProvider>
        </LoginBoundary>
    );
};

export default App;
