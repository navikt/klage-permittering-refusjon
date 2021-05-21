import React, { FunctionComponent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import environment from '../../utils/environment';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
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
                <Innholdstittel style={{ marginBottom: "40px" }}>Ettersende opplysninger eller klage på vedtak om lønnskompensasjon</Innholdstittel>
                <AlertStripeInfo>
                    <div style={{ textAlign: 'left' }}>
                        <Undertittel>
                            Fristen for å søke lønnskompensasjon eller refusjon for kompensert lønnskompensasjon har gått ut
                        </Undertittel>
                        <ul>
                            <li>Fristen for å søke lønnskompensasjon var 31. desember 2020</li>
                            <li>Fristen for å søke refusjon var 31. august 2020</li>
                        </ul>
                        <Element style={{ marginBottom: "5px"}}>
                            Fikk du ikke søkt for dine permitterte?
                        </Element>
                        <Normaltekst>
                            De permitterte kan ha rett på dagpenger i den perioden de ikke fikk lønnskompensasjon. Du kan be dem
                            sende oss en melding på Ditt NAV der de ber oss om å vurdere innvilgelsesdatoen for dagpenger på nytt.
                        </Normaltekst>
                    </div>
                </AlertStripeInfo>
                <Normaltekst className="innloggingsside__sidetittel">
                    Her kan du som arbeidsgiver ettersende opplysninger eller klage på vedtak om lønnskompensasjon.
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
