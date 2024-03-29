import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Input, RadioPanelGruppe, Textarea } from 'nav-frontend-skjema';
import { basename, minSideArbeidsgiverUrl } from '../../lenker';
import { Organisasjon } from '../../api/altinnApi';
import { Klage, sendKlage } from '../../api/klageApi';
import VeilederSnakkeboble from '../Komponenter/Snakkeboble/VeilederSnakkeboble';
import { Klagetype, SkjemaContext } from './skjemaContext';
import AlertStripe from 'nav-frontend-alertstriper';
import { erGyldigEpost, erGyldigTelefonNr, erSkjemaGyldig } from './SkjemaValidering';
import './Skjema.less';

interface Props {
    valgtOrganisasjon: Organisasjon;
    skjemaer: Klage[];
}

const Skjema = ({ valgtOrganisasjon, skjemaer }: Props) => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const [feilmeldingSendInn, setFeilmeldingSendInn] = useState('');
    const [feilMeldingEpost, setFeilmeldingEpost] = useState('');
    const [feilMeldingTelefonNr, setFeilmeldingTelefonNr] = useState('');
    const [innsendingMislyktes, setInnsendingMislyktes] = useState(false);

    const snakkebobletekst = (
        <>
            <Normaltekst className="skjema__snakkeboble-avsnitt">
                Hvis du ønsker å ettersende opplysninger om permitteringen til en enkelt ansatt trenger vi
                fødselsnummer på den ansatte det gjelder.
            </Normaltekst>
            <Normaltekst>
                Hvis du ønsker å klage, legg merke til at du ikke kan klage på selve regelverket for
                refusjon av lønn ved permittering. Din klage må gjelde vedtaket NAV fattet i saken.
            </Normaltekst>
        </>
    );

    const onSendInnClick = async () => {
        if (erSkjemaGyldig(context.skjema)) {
            const thisKnapp = document.getElementById('send-inn-hovedknapp');
            thisKnapp && thisKnapp.setAttribute('disabled', 'disabled');
            setInnsendingMislyktes(false);
            setFeilmeldingSendInn('');
            sendKlage({
                orgnr: valgtOrganisasjon.OrganizationNumber,
                ...context.skjema,
            })
                .then((status) => {
                    if (status === 201 || status === 200) {
                        history.push(
                            `/skjema/kvitteringsside/?bedrift=${valgtOrganisasjon.OrganizationNumber}`
                        );
                    } else {
                        setInnsendingMislyktes(true);
                        const thisKnapp = document.getElementById('send-inn-hovedknapp');
                        thisKnapp && thisKnapp.removeAttribute('disabled');
                    }
                })
                .catch((e) => {
                    setInnsendingMislyktes(true);
                    thisKnapp && thisKnapp.removeAttribute('disabled');
                });
        } else setFeilmeldingSendInn('Du må fylle ut alle feltene');
    };

    const skjemaInnhold = () => 
        <>
            <div className="skjema__vedtakskode">
                <Input
                    className="skjema__input-felt"
                    label="Referansekode for vedtak (hvis du har fått et vedtak)"
                    description="Du finner referansekoden øverst på vedtaket du fikk i Altinn. Kopier og lim inn her. Har den ansatte fått vedtaket? La feltet stå tomt."
                    value={context.skjema.referansekode}
                    onChange={(event: any) =>
                        context.settSkjemaVerdi('referansekode', event.currentTarget.value)
                    }
                />
            </div>

            <div className="skjema__beskrivelse">
                <Textarea
                    maxLength={0}
                    label="Beskriv hva saken gjelder"
                    description="Skal du ettersende opplysninger, oppgi fødselsnummer for de ansatte det gjelder. Hvis det er en klage, beskriv hva du ønsker å klage på. Ikke del sensitive opplysninger her."
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
                    Send inn
                </Hovedknapp>
                <Flatknapp
                    onClick={() => {
                        context.avbryt();
                        setFeilmeldingSendInn('');
                        setFeilmeldingEpost('');
                        setFeilmeldingTelefonNr('');
                        if (skjemaer.length > 0) {
                            window.location.href = `${basename}/skjema/kvitteringsside/?bedrift=${valgtOrganisasjon.OrganizationNumber}`;
                        } else
                            window.location.href = minSideArbeidsgiverUrl(
                                valgtOrganisasjon.OrganizationNumber
                            );
                    }}
                >
                    Avbryt
                </Flatknapp>
            </div>
        </>

    return (
        <div className="skjema">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl(valgtOrganisasjon.OrganizationNumber)}>
                    Min side – arbeidsgiver
                </Lenke>
                {
                    ' / Ettersende opplysninger eller klage på vedtak om lønnkompensasjon'
                }
            </Normaltekst>

            <VeilederSnakkeboble tekst={snakkebobletekst} />
            <div className="skjema__bedriftinfo">
                <Normaltekst className="bedriftinfo-tittel bold">Virksomhet</Normaltekst>
                <Normaltekst className="bedriftinfo-navn">{valgtOrganisasjon.Name}</Normaltekst>
                <Normaltekst className="bedriftinfo-orgnr">
                    {`Org. nr. ${valgtOrganisasjon.OrganizationNumber}`}
                </Normaltekst>
            </div>

            <div className="skjema__type">
                <RadioPanelGruppe
                    name="samplename"
                    legend="Dette gjelder"
                    radios={[
                        {
                            label: 'Ettersende opplysninger til et vetdak om lønnskompensasjon',
                            value: Klagetype.ENDRING,
                            id: Klagetype.ENDRING,
                        },
                        {
                            label: 'Klage på vedtak',
                            value: Klagetype.KLAGE,
                            id: Klagetype.KLAGE,
                        },
                        {
                            label: 'Annet',
                            value: Klagetype.ANNET,
                            id: Klagetype.ANNET,
                        },
                    ]}
                    checked={context.skjema.klagetype}
                    onChange={(event, value) => {
                        context.settSkjemaVerdi('klagetype', value);
                    }}
                />
            </div>
            { context.skjema.klagetype && context.skjema.klagetype !== Klagetype.ANNET
                ? skjemaInnhold()
                : context.skjema.klagetype === Klagetype.ANNET
                    ? <AlertStripe className="skjema__alertstripe" type="info">
                        Hvis henvendelsen gjelder noe annet må du ta kontakt med arbeidsgivertelefonen på 55 55 33 36
                      </AlertStripe>
                    : <></>
            }
            {feilmeldingSendInn && (
                <div className="feilmelding-send-inn">
                    <Feilmelding>{feilmeldingSendInn}</Feilmelding>
                </div>
            )}
            {innsendingMislyktes && (
                <AlertStripe className="skjema__alertstripe" type="feil">
                    Vi har tekniske problemer og jobber med å løse saken. Prøv på nytt senere.
                </AlertStripe>
            )}
        </div>
    );
};

export default Skjema;
