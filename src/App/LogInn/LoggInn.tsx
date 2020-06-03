import React, { FunctionComponent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import environment from '../../utils/environment';
import LoggInnBanner from "./LoggInnBanner/LoggInnBanner";
import {TilgangsStyringInfoTekst} from "./TilgangsStyringInfoTekst/TilgangsStyringInfoTekst";
import './Logginn.less';

export const LoggInn: FunctionComponent = () => {

    const redirectTilLogin = () => {
        if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
            window.location.href = '/klage-permittering-refusjon/redirect-til-login';
        } else {
            document.cookie = 'nav-esso=0123456789..*; path=/;';
            document.cookie = 'selvbetjening-idtoken=0123456789..*; path=/;';
            window.location.href = '/klage-permittering-refusjon';
        }
    };

    return (
            <div className="innloggingsside">
                <LoggInnBanner />
                <div className="innloggingsside__innhold">
                    <Systemtittel className="innloggingsside__sidetittel">
                        På denne siden kan du:
                    </Systemtittel>

                    <ul className="innloggingsside__punktliste">
                        <li className="innloggingsside__punkt">
                            klage
                        </li>
                        <li className="innloggingsside__punkt">
                            Klage mer
                        </li>
                    </ul>
                    <TilgangsStyringInfoTekst />

                    <Hovedknapp
                        className="innloggingsside__loginKnapp"
                        onClick={redirectTilLogin}
                    >
                        Logg inn
                    </Hovedknapp>

                    <div className="innloggingsside__besok-ditt-nav">
                        <Normaltekst>Ønsker du å se dine tjenester som privatperson? </Normaltekst>
                        <Lenke href="https://www.nav.no/person/dittnav/">
                            Logg inn på Ditt NAV
                        </Lenke>
                    </div>
                </div>
            </div>
    );
};
