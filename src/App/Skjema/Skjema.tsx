import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import { minSideArbeidsgiverUrl } from '../../lenker';
import { Organisasjon } from '../../api/altinnApi';
import { sendKlage } from '../../api/klageApi';
import VeilederSnakkeboble from '../Komponenter/Snakkeboble/VeilederSnakkeboble';
import { SkjemaContext } from './skjemaContext';
import { erGyldigEpost, erGyldigTelefonNr, erSkjemaGyldig } from './SkjemaValidering';
import {
    loggKlageSendtInn,
    loggKlageSendtMislyktes,
} from '../../utils/amplitudefunksjonerForLogging';
import './Skjema.less';

interface Props {
    valgtOrganisasjon: Organisasjon;
}

const Skjema = ({ valgtOrganisasjon }: Props) => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const [feilmeldingSendInn, setFeilmeldingSendInn] = useState('');
    const [feilMeldingEpost, setFeilmeldingEpost] = useState('');
    const [feilMeldingTelefonNr, setFeilmeldingTelefonNr] = useState('');

    const [innsendingMislyktes, setInnsendingMislyktes] = useState(false);

    const snakkebobletekst = `Legg merke til at du ikke kan klage på selve regelverket for refusjon av lønn ved
         permittering. Din klage må gjelde vedtaket NAV fattet i saken.`;

    const onSendInnClick = async () => {
        if (erSkjemaGyldig(context.skjema)) {
            const thisKnapp = document.getElementById('send-inn-hovedknapp');
            thisKnapp && thisKnapp.setAttribute('disabled', 'disabled');
            setFeilmeldingSendInn('');
                   sendKlage({
                        orgnr: valgtOrganisasjon.OrganizationNumber,
                        ...context.skjema,
                    }).then(status => {
                        if (status === 500) {
                            setInnsendingMislyktes(true);
                        }
                        if (status === 200) {
                            loggKlageSendtInn();
                            history.push(`/kvitteringsside/?bedrift=${valgtOrganisasjon.OrganizationNumber}`);
                        }
                   }).catch(e => {
                       setFeilmeldingSendInn('Du må fylle ut alle feltene');
                       setInnsendingMislyktes(true);
                       loggKlageSendtMislyktes();

                   })
                ;
        } else setFeilmeldingSendInn('Du må fylle ut alle feltene');
    };

    return (
        <div className="skjema">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl(valgtOrganisasjon.OrganizationNumber)}>
                    Min side – arbeidsgiver
                </Lenke>
                {' / Klage på vedtak for refusjon ved permittering'}
            </Normaltekst>

            <VeilederSnakkeboble tekst={snakkebobletekst} />

            <div className="skjema__bedriftinfo">
                <Normaltekst className="bedriftinfo-tittel bold">
                    Klage på vedtak for virksomhet
                </Normaltekst>
                <Normaltekst className="bedriftinfo-navn">{valgtOrganisasjon.Name}</Normaltekst>
                <Normaltekst className="bedriftinfo-orgnr">
                    {`Org. nr. ${valgtOrganisasjon.OrganizationNumber}`}
                </Normaltekst>
            </div>

            <div className="skjema__vedtakskode">
                <Input
                    className="skjema__input-felt"
                    label="Referansekode for vedtak"
                    description="Du finner referansekoden øverst på vedtaket du fikk i Altinn. Kopier og lim inn her."
                    value={context.skjema.referansekode}
                    onChange={(event: any) =>
                        context.settSkjemaVerdi('referansekode', event.currentTarget.value)
                    }
                />
            </div>

            <div className="skjema__beskrivelse">
                <Textarea
                    label="Hva i vedtaket ønsker du å klage på?"
                    description="Ikke del sensitive opplysninger her."
                    value={context.skjema.tekst}
                    onChange={(event: any) => {
                        context.settSkjemaVerdi('tekst', event.currentTarget.value);
                    }}
                />
            </div>

            <div className="skjema__kontaktopplysninger">
                <Normaltekst className="kontaktopplysninger-tittel bold">
                    Dine kontaktopplysninger
                </Normaltekst>
                <Input
                    className="skjema__input-felt navn"
                    label="Navn"
                    value={context.skjema.navn}
                    onChange={(event: any) =>
                        context.settSkjemaVerdi('navn', event.currentTarget.value)
                    }
                />
                <Input
                    className="skjema__input-felt epost"
                    label="E-post"
                    value={context.skjema.epost}
                    feil={feilMeldingEpost}
                    onBlur={(event: any) => {
                        if (erGyldigEpost(event.currentTarget.value)) {
                            context.settSkjemaVerdi('epost', event.currentTarget.value);
                            setFeilmeldingEpost('');
                        } else {
                            setFeilmeldingEpost('Vennligst oppgi en gyldig e-post');
                        }
                    }}
                    onChange={(event: any) => {
                        setFeilmeldingEpost('');
                        context.settSkjemaVerdi('epost', event.currentTarget.value);
                    }}
                />
                <Input
                    className="skjema__input-felt"
                    label="Telefonnummer"
                    value={context.skjema.telefonnr}
                    feil={feilMeldingTelefonNr}
                    onBlur={(event: any) => {
                        if (erGyldigTelefonNr(event.currentTarget.value)) {
                            const telefonNummer = event.currentTarget.value;

                            const riktigFormat = telefonNummer.substr(
                                telefonNummer.length - 8,
                                telefonNummer.length
                            );
                            context.settSkjemaVerdi('telefonnr', riktigFormat);
                            setFeilmeldingTelefonNr('');
                        } else setFeilmeldingTelefonNr('Vennligst oppgi et gyldig telefonnummer');
                    }}
                    onChange={(event: any) => {
                        setFeilmeldingTelefonNr('');
                        context.settSkjemaVerdi('telefonnr', event.currentTarget.value);
                    }}
                />
            </div>

            <div className="skjema__knapper">
                <Hovedknapp
                    onClick={onSendInnClick}
                    id="send-inn-hovedknapp"
                    className="send-inn-knapp"
                >
                    Send inn klage
                </Hovedknapp>
                <Flatknapp
                    onClick={() => {
                        context.avbryt();
                        setFeilmeldingSendInn('');
                        setFeilmeldingEpost('');
                        setFeilmeldingTelefonNr('');
                        window.location.href = minSideArbeidsgiverUrl(
                            valgtOrganisasjon.OrganizationNumber
                        );
                    }}
                >
                    Avbryt
                </Flatknapp>
            </div>
            {feilmeldingSendInn && (
                <div className="feilmelding-send-inn">
                    <Feilmelding>{feilmeldingSendInn}</Feilmelding>
                </div>
            )}
            {innsendingMislyktes && (
                <div className="feilmelding-send-inn">
                    <Feilmelding>'Noe gikk galt. Klarer ikke sende inn klageskjema'</Feilmelding>
                </div>
            )}
        </div>
    );
};

export default Skjema;
