import React, { FunctionComponent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import environment from '../../utils/environment';
import LoggInnBanner from './LoggInnBanner/LoggInnBanner';
import { basename } from '../../lenker';
import './Logginn.less';

export const redirectTilLogin = () => {
    if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
        window.location.href = basename + '/redirect-til-login';
    } else {
        window.location.href = 'http://localhost:8080/klage-permittering-refusjon-api/local/cookie?redirect=http://localhost:3000/klage-permittering-refusjon'
    }
};

export const LoggInn: FunctionComponent = () => {
    return (
        <div className="innloggingsside">
            <LoggInnBanner />
            <div className="innloggingsside__innhold">
                <Normaltekst className="innloggingsside__sidetittel">
                    Her kan du som arbeidsgiver endre innsendte opplysninger eller klage på vedtaket knyttet til refusjon av forskuttert lønn ved permittering.
                </Normaltekst>

                <Hovedknapp className="innloggingsside__loginKnapp" onClick={redirectTilLogin}>
                    Logg inn
                </Hovedknapp>

                <div className="innloggingsside__besok-ditt-nav">
                    <Normaltekst>Ønsker du å se dine tjenester som privatperson? </Normaltekst>
                    <Lenke href="https://www.nav.no/person/dittnav/">Logg inn på Ditt NAV</Lenke>
                </div>
            </div>
        </div>
    );
};
