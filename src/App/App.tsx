import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import NavFrontendSpinner from 'nav-frontend-spinner';
import {
    hentOrganisasjonerFraAltinn,
    hentOrganisasjonerMedTilgangTilAltinntjeneste,
    Organisasjon,
    tomaAltinnOrganisasjon,
} from '../api/altinnApi';
import {basename} from '../lenker';
import {APISTATUS} from '../api/api-utils';
import {hentKlager, Klage} from '../api/klageApi';
import LoginBoundary from './LogInn/LoginBoundary';
import HovedBanner from './HovedBanner/HovedBanner';
import Skjema from './Skjema/Skjema';
import Kvitteringsside from './Kvitteringsside/Kvitteringsside';
import IngenTilgangInfo from './IngenTilgangInfo/IngenTilgangInfo';
import {loggBrukerLoggetPa} from '../utils/amplitudefunksjonerForLogging';
import {SkjemaContextProvider} from './Skjema/skjemaContext';
import './App.less';
import {ManglerTilgangContainer} from "./ManglerTilgangContainer/ManglerTilgangContainer";
import {AlertStripeFeil} from "nav-frontend-alertstriper";

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
    const [lasteStateKlager, setLasteStateKlager] = useState<APISTATUS>(APISTATUS.LASTER);
    const [skjemaer, setSkjemaer] = useState<Klage[]>([]);
    const orgNrDel = valgtOrganisasjon.OrganizationNumber ? '/?bedrift=' + valgtOrganisasjon.OrganizationNumber : '';

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        hentOrganisasjonerFraAltinn(signal)
            .then((organisasjonsliste) => {
                setorganisasjoner(
                    organisasjonsliste.filter(
                        (organisasjon) =>
                            organisasjon.OrganizationForm === 'BEDR' ||
                            organisasjon.OrganizationForm === 'AAFY' ||
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
        setLasteStateKlager(APISTATUS.LASTER);

        const valgtOrgHarTilgang = () =>
            organisasjonerMedTilgang &&
            organisasjonerMedTilgang.filter((organisasjonMedTilgang) => {
                return (
                    organisasjonMedTilgang.OrganizationNumber ===
                    valgtOrganisasjon.OrganizationNumber
                );
            }).length >= 1;

        if (
            organisasjonerMedTilgang &&
            organisasjonerMedTilgang.length > 0 &&
            valgtOrganisasjon !== tomaAltinnOrganisasjon
        ) {
            if (valgtOrgHarTilgang()) {
                hentKlager(valgtOrganisasjon.OrganizationNumber)
                    .then((skjemaer) => {
                        setSkjemaer(skjemaer);
                        setLasteStateKlager(APISTATUS.OK);
                    })
                    .catch(() => setLasteStateKlager(APISTATUS.FEILET));
                setTilgangState(TILGANGSSTATE.TILGANG);
            } else {
                setTilgangState(TILGANGSSTATE.IKKE_TILGANG);
                setLasteStateKlager(APISTATUS.OK);
            }
        } else setLasteStateKlager(APISTATUS.OK)
    }, [valgtOrganisasjon, organisasjonerMedTilgang]);

    useEffect(() => {
        loggBrukerLoggetPa();
    });

    return (
        <div className="app typo-normal">
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
                        {organisasjonerLasteState === APISTATUS.OK && organisasjoner.length ? (
                            <>
                                {tilgangState !== TILGANGSSTATE.LASTER &&
                                lasteStateKlager !== APISTATUS.LASTER ? (
                                    <>
                                        {tilgangState === TILGANGSSTATE.TILGANG ? (
                                            <>
                                                <Route exact path="/">
                                                    <>
                                                        {skjemaer.length > 0 ? (
                                                            <Redirect to={`/skjema/kvitteringsside${orgNrDel}`} />
                                                        ) : (
                                                            <Redirect to={`/skjema${orgNrDel}`} />
                                                        )}
                                                    </>
                                                </Route>

                                                <Route exact path="/skjema">
                                                    <Skjema valgtOrganisasjon={valgtOrganisasjon} skjemaer={skjemaer} />
                                                </Route>

                                                <Route exact path="/skjema/kvitteringsside">
                                                    <Kvitteringsside
                                                        valgtOrganisasjon={valgtOrganisasjon}
                                                        skjemaer={skjemaer}
                                                    />
                                                </Route>
                                            </>
                                        ) : tilgangState === TILGANGSSTATE.IKKE_TILGANG ? (
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
                                        ) : (
                                            <NavFrontendSpinner type="S" />
                                        )}
                                    </>
                                ) : (
                                    <NavFrontendSpinner type="S" />
                                )}
                            </>
                        ) : organisasjonerLasteState === APISTATUS.OK && organisasjoner.length === 0 ? (
                            <ManglerTilgangContainer />
                        ) : organisasjonerLasteState === APISTATUS.LASTER ? (
                            <NavFrontendSpinner type="S" />
                        ) : (
                            <div className="feilmelding-altinn">
                                <AlertStripeFeil>
                                    Vi opplever ustabilitet med Altinn. Hvis du mener at du har
                                    roller i Altinn kan du prøve å laste siden på nytt.
                                </AlertStripeFeil>
                            </div>
                        )}
                    </Router>
                </SkjemaContextProvider>
            </LoginBoundary>
        </div>
    );
};

export default App;
