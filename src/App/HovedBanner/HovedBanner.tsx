import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { basename } from '../../lenker';
import { Organisasjon } from '../../api/altinnApi';
import './HovedBanner.less';

interface Props extends RouteComponentProps {
    byttOrganisasjon: (org: Organisasjon) => void;
    organisasjoner: Organisasjon[];
}

const Banner: FunctionComponent<Props> = (props) => {
    const { history } = props;

    const sjekkOmBrukerErPaaEnkeltArbeidsforholdSide = (organisasjon: Organisasjon) => {
        const url = window.location.href;
        if (url.indexOf('/enkeltarbeidsforhold') >= 0) {
            redirectTilListeVisning(organisasjon);
        }
    };

    const redirectTilListeVisning = (organisasjon: Organisasjon) => {
        window.location.href = basename + '/?bedrift=' + organisasjon.OrganizationNumber;
    };

    const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
        if (organisasjon) {
            sjekkOmBrukerErPaaEnkeltArbeidsforholdSide(organisasjon);
            props.byttOrganisasjon(organisasjon);
        }
    };

    return (
        <div className="hovebanner">
            <Bedriftsmeny
                sidetittel="Klage på vedtak for refusjon av lønn ved permittering"
                organisasjoner={props.organisasjoner.sort((a, b) => a.Name.localeCompare(b.Name))}
                onOrganisasjonChange={onOrganisasjonChange}
                history={history}
            />
        </div>
    );
};

export default withRouter(Banner);
