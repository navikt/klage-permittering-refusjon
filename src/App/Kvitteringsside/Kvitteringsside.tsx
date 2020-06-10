import React, { useContext, useEffect } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { basename, minSideArbeidsgiverUrl } from '../../lenker';
import { dato } from './datofunksjoner';
import KvitteringssideIkon from './KvitteringssideIkon';
import VeilederSnakkeboble from '../Komponenter/Snakkeboble/VeilederSnakkeboble';
import { SkjemaContext } from '../Skjema/skjemaContext';
import { Organisasjon } from '../../api/altinnApi';
import { Klage } from '../../api/klageApi';
import './Kvitteringsside.less';

interface Props {
    valgtOrganisasjon: Organisasjon;
    skjemaer: Klage[];
}

const Kvitteringsside = ({ valgtOrganisasjon, skjemaer }: Props) => {
    const context = useContext(SkjemaContext);

    const snakkebobletekst = `Takk for din klage. Du får beskjed per post til virksomhetens adresse når vi har
         behandlet klagen din. Vi kontakter deg hvis vi har noen spørsmål i saken.`;

    const orgNr = valgtOrganisasjon.OrganizationNumber;
    let date = new Date();

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="kvitteringsside">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl(orgNr)}>Min side – arbeidsgiver</Lenke>
                {' / Klage på vedtak for refusjon ved permittering'}
            </Normaltekst>

            <VeilederSnakkeboble tekst={snakkebobletekst} />

            <div className="kvitteringsside__oppsummering">
                <div className="oppsummering-tittel">
                    <KvitteringssideIkon />
                    <Systemtittel className="oppsummering-overskrift">
                        {'Klage sendt inn ' + dato(date)}
                    </Systemtittel>
                </div>

                <Normaltekst className="bedriftinfo-tittel bold">Virksomhet:</Normaltekst>
                <Normaltekst className="bedriftinfo-navn">{valgtOrganisasjon.Name}</Normaltekst>
                <Normaltekst className="bedriftinfo-orgnr">{`Org. nr. ${valgtOrganisasjon.OrganizationNumber}`}</Normaltekst>

                <Normaltekst className="referansekode bold">Referansekode for vedtak:</Normaltekst>
                <Normaltekst>{context.skjema.referansekode}</Normaltekst>

                <Normaltekst className="kontaktopplysninger bold">Kontaktopplysninger:</Normaltekst>
                <Normaltekst className="kontaktopplysninger-navn">
                    {context.skjema.navn}
                </Normaltekst>
                <Normaltekst className="kontaktopplysninger-epost">
                    {context.skjema.epost}
                </Normaltekst>
                <Normaltekst className="kontaktopplysninger-telefon">
                    {context.skjema.telefonnr}
                </Normaltekst>
            </div>

            {skjemaer.length > 0 &&
            <div className="kvitteringsside__oppsummering">
                <div className="oppsummering-tittel">
                    <KvitteringssideIkon/>
                    <Systemtittel className="oppsummering-overskrift">
                        {'Klage sendt inn ' + skjemaer.opprettet}
                    </Systemtittel>
                </div>

                <Normaltekst className="bedriftinfo-tittel bold">Virksomhet:</Normaltekst>
                <Normaltekst className="bedriftinfo-navn">{valgtOrganisasjon.Name}</Normaltekst>
                <Normaltekst
                    className="bedriftinfo-orgnr">{`Org. nr. ${valgtOrganisasjon.OrganizationNumber}`}</Normaltekst>

                <Normaltekst className="referansekode bold">Referansekode for vedtak:</Normaltekst>
                <Normaltekst>{context.skjema.referansekode}</Normaltekst>

                <Normaltekst className="kontaktopplysninger bold">Kontaktopplysninger:</Normaltekst>
                <Normaltekst className="kontaktopplysninger-navn">
                    {context.skjema.navn}
                </Normaltekst>
                <Normaltekst className="kontaktopplysninger-epost">
                    {context.skjema.epost}
                </Normaltekst>
                <Normaltekst className="kontaktopplysninger-telefon">
                    {context.skjema.telefonnr}
                </Normaltekst>
            </div>
            }

            <div className="kvitteringsside__ny-klage-knapp">
                <Flatknapp
                    onClick={() => {
                        context.avbryt();
                        window.location.href = basename + '/skjema/?bedrift=' + orgNr;
                    }}
                >
                    Ny klage
                </Flatknapp>
            </div>
        </div>
    );
};

export default Kvitteringsside;
