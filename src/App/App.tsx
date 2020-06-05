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
import environment from '../utils/environment';
import { opprett } from '../api/klagePermitteringRefusjonApi';
import LoginBoundary from './LogInn/LoginBoundary';
import HovedBanner from './HovedBanner/HovedBanner';
import Skjema from './Skjema/Skjema';
import Kvitteringsside from './Kvitteringsside/Kvitteringsside';
import IngenTilgangInfo from './IngenTilgangInfo/IngenTilgangInfo';
import './App.less';
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
    const [tilgangArbeidsforholdState, setTilgangArbeidsforholdState] = useState(
        TILGANGSSTATE.LASTER
    );
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
        setTilgangArbeidsforholdState(TILGANGSSTATE.LASTER);
        if (organisasjonerMedTilgang && valgtOrganisasjon !== tomaAltinnOrganisasjon) {
            if (
                organisasjonerMedTilgang.filter((organisasjonMedTilgang) => {
                    return (
                        organisasjonMedTilgang.OrganizationNumber ===
                        valgtOrganisasjon.OrganizationNumber
                    );
                }).length >= 1
            ) {
                setTilgangArbeidsforholdState(TILGANGSSTATE.TILGANG);
            } else {
                setTilgangArbeidsforholdState(TILGANGSSTATE.IKKE_TILGANG);
            }
        }
        if (organisasjonerMedTilgang && organisasjonerMedTilgang.length === 0) {
            setTilgangArbeidsforholdState(TILGANGSSTATE.IKKE_TILGANG);
        }
    }, [valgtOrganisasjon, organisasjonerMedTilgang]);

    useEffect(() => {
        if (environment.MILJO) {
            opprett('jeg vil klage');
        }
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
                            {tilgangArbeidsforholdState !== TILGANGSSTATE.LASTER && (
                                <>
                                    <Route exact path="/">
                                        {tilgangArbeidsforholdState === TILGANGSSTATE.TILGANG && (
                                            <Skjema valgtOrganisasjon={valgtOrganisasjon} />
                                        )}
                                        {tilgangArbeidsforholdState ===
                                            TILGANGSSTATE.IKKE_TILGANG && (
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
                                        <Kvitteringsside />
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
