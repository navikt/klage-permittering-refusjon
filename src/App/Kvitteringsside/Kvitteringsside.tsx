import React, { useContext, useEffect } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { basename, minSideArbeidsgiverUrl } from '../../lenker';
import { dato } from './datofunksjoner';
import KvitteringssideIkon from './KvitteringssideIkon';
import VeilederSnakkeboble from '../Komponenter/Snakkeboble/VeilederSnakkeboble';
import { Klagetype, SkjemaContext, tomtSkjema } from '../Skjema/skjemaContext';
import { Organisasjon } from '../../api/altinnApi';
import { Klage } from '../../api/klageApi';
import './Kvitteringsside.less';

interface Props {
    valgtOrganisasjon: Organisasjon;
    skjemaer: Klage[];
}

const Kvitteringsside = ({ valgtOrganisasjon, skjemaer }: Props) => {
    const context = useContext(SkjemaContext);

    const snakkebobletekst = `Takk for din henvendelse. Vi tar kontakt med virksomheten når vi har behandlet saken din.`;

    const typeskjema =
        context.skjema.klagetype === Klagetype.KLAGE ? 'Klage' : 'Endring av opplysninger';

    const orgNr = valgtOrganisasjon.OrganizationNumber;

    const compare = (a: Klage, b: Klage) => {
        if (a.opprettet && b.opprettet) {
            if (a.opprettet < b.opprettet) {
                return 1;
            } else if (a.opprettet > b.opprettet) {
                return -1;
            }
        }
        return 0;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="kvitteringsside">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl(orgNr)}>Min side – arbeidsgiver</Lenke>
                {' / Ettersende opplysninger eller klage på vedtak om lønnskompensasjon'}
            </Normaltekst>

            <VeilederSnakkeboble tekst={snakkebobletekst} />

            {context.skjema !== tomtSkjema && (
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

                    <Normaltekst className="referansekode bold">
                        Referansekode for vedtak:
                    </Normaltekst>
                    <Normaltekst>{context.skjema.referansekode}</Normaltekst>

                    <Normaltekst className="kontaktopplysninger bold">
                        Kontaktopplysninger:
                    </Normaltekst>
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
            )}

            <div className="kvitteringsside__ny-klage-knapp">
                <Flatknapp
                    onClick={() => {
                        context.avbryt();
                        window.location.href = basename + '/skjema/?bedrift=' + orgNr;
                    }}
                >
                    Ny henvendelse
                </Flatknapp>
            </div>

            {skjemaer.length > 0 && (
                <div className="kvitteringsside__innsendte-skjema">
                    <Undertittel className="kvitteringsside__innsendte-skjema-tittel">
                        Tidligere innsendte skjema
                    </Undertittel>
                    {skjemaer.sort(compare).map((skjema) => {
                        const klagetypetekst = skjema.klagetype === 'ENDRING' ? 'Endring' : 'Klage';
                        return (
                            <div key={skjema.opprettet}>
                                <div className="kvitteringsside__oppsummering innsendte-skjema">
                                    <div className="oppsummering-tittel">
                                        <KvitteringssideIkon />
                                        <Systemtittel className="oppsummering-overskrift">
                                            {`${klagetypetekst} sendt inn ${dato(
                                                skjema.opprettet
                                            )}`}
                                        </Systemtittel>
                                    </div>

                                    <Normaltekst className="bedriftinfo-tittel bold">
                                        Virksomhet:
                                    </Normaltekst>
                                    <Normaltekst className="bedriftinfo-navn">
                                        {valgtOrganisasjon.Name}
                                    </Normaltekst>
                                    <Normaltekst className="bedriftinfo-orgnr">{`Org. nr. ${valgtOrganisasjon.OrganizationNumber}`}</Normaltekst>

                                    <Normaltekst className="referansekode bold">
                                        Referansekode for vedtak:
                                    </Normaltekst>
                                    <Normaltekst>{skjema.referansekode}</Normaltekst>

                                    <Normaltekst className="kontaktopplysninger bold">
                                        Kontaktopplysninger:
                                    </Normaltekst>
                                    <Normaltekst className="kontaktopplysninger-navn">
                                        {skjema.navn}
                                    </Normaltekst>
                                    <Normaltekst className="kontaktopplysninger-epost">
                                        {skjema.epost}
                                    </Normaltekst>
                                    <Normaltekst className="kontaktopplysninger-telefon">
                                        {skjema.telefonnr}
                                    </Normaltekst>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Kvitteringsside;
