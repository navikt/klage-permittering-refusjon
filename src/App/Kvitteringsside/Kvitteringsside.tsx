import React, { useContext, useEffect } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { basename, minSideArbeidsgiverUrl } from '../../lenker';
import { dato } from './datofunksjoner';
import KvitteringssideIkon from './KvitteringssideIkon';
import VeilederSnakkeboble from '../Komponenter/Snakkeboble/VeilederSnakkeboble';
import {Klagetype, SkjemaContext} from '../Skjema/skjemaContext';
import { Organisasjon } from '../../api/altinnApi';
import './Kvitteringsside.less';

interface Props {
    valgtOrganisasjon: Organisasjon;
}

const Kvitteringsside = ({ valgtOrganisasjon }: Props) => {
    const context = useContext(SkjemaContext);

    const snakkebobletekst = `Takk for din henvendelse. Du får beskjed per post til virksomhetens adresse når vi har
         behandlet saken din. Vi kontakter deg hvis vi har noen spørsmål i saken.`;

    const typeskjema = context.skjema.klagetype === Klagetype.KLAGE ? 'Klage' : 'Endring av opplysninger';

    const orgNr = valgtOrganisasjon.OrganizationNumber;

    useEffect( () => {
        window.scrollTo(0, 0);
    })

    return (
        <div className="kvitteringsside">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl(orgNr)}>Min side – arbeidsgiver</Lenke>
                {' / Endre opplysninger eller klage på vedtak for refusjon av lønn ved permittering'}
            </Normaltekst>

            <VeilederSnakkeboble tekst={snakkebobletekst} />

            <div className="kvitteringsside__oppsummering">
                <div className="oppsummering-tittel">
                    <KvitteringssideIkon />
                    <Systemtittel className="oppsummering-overskrift">
                        {`${typeskjema} sendt inn ${dato()}`}
                    </Systemtittel>
                </div>

                <Normaltekst className="bedriftinfo-tittel bold">Virksomhet:</Normaltekst>
                <Normaltekst className="bedriftinfo-navn">{valgtOrganisasjon.Name}</Normaltekst>
                <Normaltekst className="bedriftinfo-orgnr">{`Org. nr. ${valgtOrganisasjon.OrganizationNumber}`}</Normaltekst>

                <Normaltekst className="referansekode bold">Referansekode for vedtak:</Normaltekst>
                <Normaltekst>
                    {context.skjema.referansekode}
                </Normaltekst>

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

            <div className="kvitteringsside__ny-klage-knapp">
                <Flatknapp
                    onClick={() => {
                        context.avbryt();
                        window.location.href = basename + '/?bedrift=' + orgNr;
                    }}
                >
                    Ny henvendelse
                </Flatknapp>
            </div>
        </div>
    );
};

export default Kvitteringsside;
