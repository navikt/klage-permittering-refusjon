import React, { useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import { minSideArbeidsgiverUrl } from '../../lenker';
import { Organisasjon } from '../../api/altinnApi';
import { sendKlage } from '../../api/klageApi';
import VeilederSnakkeboble from '../Komponenter/Snakkeboble/VeilederSnakkeboble';
import './Skjema.less';

const erGyldigTelefonNr = (nr: string) => {
    const bestarAvSiffer = nr.match(/^[0-9]+$/);
    const erStandard = nr.match(/^[0-9]+$/) != null && nr.length === 8;
    const begynnerMed0047 = nr.substring(0, 4) === '0047' && bestarAvSiffer && nr.length === 12;
    const begynnerMedPluss =
        nr.substr(0, 3) === '+47' &&
        nr.length === 11 &&
        nr.substring(3, 11).match(/^[0-9]+$/) != null;
    return erStandard || begynnerMed0047 || begynnerMedPluss;
};

const erGyldigEpost = (epost: string) => {
    // kilde for regex https://emailregex.com (RFC 5322 Official Standard)
    const regexp = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const isValidEmail = regexp.test(epost);

    return isValidEmail;
};

interface Props {
    valgtOrganisasjon: Organisasjon;
}

const Skjema = ({ valgtOrganisasjon }: Props) => {
    const [feilMeldingEpost, setFeilmeldingEpost] = useState('');
    const [feilMeldingTelefonNr, setFeilmeldingTelefonNr] = useState('');
    const snakkebobletekst = `Legg merke til at du ikke kan klage på selve regelverket for refusjon av lønn ved
         permittering. Din klage må gjelde vedtaket NAV fattet i saken.`;

    // TODO Populer med data fra skjema
    const onSendInnClick = async () =>
        console.log(
            await sendKlage({
                orgnr: valgtOrganisasjon.OrganizationNumber,
                referansekode: 'Testreferanse',
                navn: 'Test Testesen',
                epost: 'test@test.no',
                telefonnr: '12345678',
                tekst: 'Dette er en testklage.',
            })
        );

    return (
        <div className="skjema">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl('12345678')}>Min side – arbeidsgiver</Lenke>
                {' / Klage på vedtak for refusjon ved permittering'}
            </Normaltekst>

            <VeilederSnakkeboble tekst={snakkebobletekst} />

            <div className="skjema__bedriftinfo">
                <Normaltekst className="bedriftinfo-tittel bold">
                    Klage på vedtak for virksomhet
                </Normaltekst>
                <Normaltekst className="bedriftinfo-navn">
                    {valgtOrganisasjon.Name}
                </Normaltekst>
                <Normaltekst className="bedriftinfo-orgnr">
                    {`Org. nr. ${valgtOrganisasjon.OrganizationNumber}`}
                </Normaltekst>
            </div>

            <div className="skjema__vedtakskode">
                <Input
                    className="skjema__input-felt"
                    label="Referansekode for vedtak"
                    description="Du finner referansekoden øverst på vedtaket du fikk i Altinn. Kopier og lim inn her."
                    defaultValue=""
                    onChange={() => {}}
                />
            </div>

            <div className="skjema__beskrivelse">
                <Textarea
                    label="Hva i vedtaket ønsker du å klage på?"
                    description="Ikke del sensitive opplysninger her."
                    value=""
                    maxLength={1000}
                    onChange={() => {}}
                />
            </div>

            <div className="skjema__kontaktopplysninger">
                <Normaltekst className="kontaktopplysninger-tittel bold">
                    Dine kontaktopplysninger
                </Normaltekst>
                <Input
                    className="skjema__input-felt navn"
                    label="Navn"
                    defaultValue=""
                    onChange={() => {}}
                />
                <Input
                    className="skjema__input-felt epost"
                    label="E-post"
                    defaultValue=""
                    feil={feilMeldingEpost}
                    onBlur={(event) => {
                        if (erGyldigEpost(event.currentTarget.value)) {
                            // context.endreSkjemaVerdi('kontaktEpost', event.currentTarget.value);
                            setFeilmeldingEpost('');
                        } else {
                            setFeilmeldingEpost('Vennligst oppgi en gyldig e-post');
                        }
                    }}
                    onChange={() => setFeilmeldingEpost('')}
                />
                <Input
                    className="skjema__input-felt"
                    label="Telefonnummer"
                    defaultValue=""
                    feil={feilMeldingTelefonNr}
                    onBlur={(event: any) => {
                        if (erGyldigTelefonNr(event.currentTarget.value)) {
                            // const telefonNummer = event.currentTarget.value;

                            /* const riktigFormat = telefonNummer.substr(
                                telefonNummer.length - 8,
                                telefonNummer.length
                            ); */

                            // context.endreSkjemaVerdi('kontaktTlf', riktigFormat);
                            setFeilmeldingTelefonNr('');
                        } else setFeilmeldingTelefonNr('Vennligst oppgi et gyldig telefonnummer');
                    }}
                    onChange={() => setFeilmeldingTelefonNr('')}
                />
            </div>

            <div className="skjema__knapper">
                <Hovedknapp onClick={onSendInnClick}>Send inn klage</Hovedknapp>
                <Flatknapp onClick={() => {}}>Avbryt</Flatknapp>
            </div>
        </div>
    );
};

export default Skjema;
