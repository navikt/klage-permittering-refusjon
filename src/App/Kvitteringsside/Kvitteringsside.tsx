import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { minSideArbeidsgiverUrl } from '../../lenker';
import { dato } from './datofunksjoner';
import './Kvitteringsside.less';
import KvitteringssideIkon from "./KvitteringssideIkon";
import VeilederSnakkeboble from "../Komponenter/Snakkeboble/VeilederSnakkeboble";

const Kvitteringsside = () => {
    const snakkebobletekst =
        `Takk for din klage. Du får beskjed per post til virksomhetens adresse når vi har
         behandlet klagen din. Vi kontakter deg hvis vi har noen spørsmål i saken.`;

    return (
        <div className="kvitteringsside">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl('12345678')}>Min side – arbeidsgiver</Lenke>
                {' / Klage på vedtak for refusjon ved permittering'}
            </Normaltekst>

            <VeilederSnakkeboble tekst={snakkebobletekst} />

            <div className="kvitteringsside__oppsummering">
                <div className="oppsummering-tittel">
                    <KvitteringssideIkon />
                    <Systemtittel className="oppsummering-overskrift">{'Klage sendt inn ' + dato()}</Systemtittel>
                </div>

                <Normaltekst className="bedriftinfo-tittel bold">Virksomhet:</Normaltekst>
                <Normaltekst className="bedriftinfo-navn">GAMLE FREDRIKSTAD OG RIKSDALEN</Normaltekst>
                <Normaltekst className="bedriftinfo-orgnr">Org.nr. 910 456 900</Normaltekst>

                <Normaltekst className="referansekode bold">Referansekode for vedtak:</Normaltekst>
                <Normaltekst>2020/01E9NTE8C4B7K96GZPMAKGP8ZT</Normaltekst>

                <Normaltekst className="kontaktopplysninger bold">Kontaktopplysninger:</Normaltekst>
                <Normaltekst className="kontaktopplysninger-navn">Ole Hansen</Normaltekst>
                <Normaltekst className="kontaktopplysninger-epost">ole.hansen@gmail.com</Normaltekst>
                <Normaltekst className="kontaktopplysninger-telefon">99887766</Normaltekst>
            </div>

            <div className="kvitteringsside__ny-klage-knapp">
                <Flatknapp onClick={() => {}}>Ny klage</Flatknapp>
            </div>
        </div>
    );
};

export default Kvitteringsside;
