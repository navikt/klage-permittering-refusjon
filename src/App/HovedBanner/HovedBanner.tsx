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

    const sjekkLokasjon = (organisasjon: Organisasjon) => {
        const url = window.location.href;
        if (url.indexOf('/skjema/kvitteringsside') >= 0) {
            redirectTilStart(organisasjon);
        }
    };

    const redirectTilStart = (organisasjon: Organisasjon) => {
        window.location.href = basename + '/?bedrift=' + organisasjon.OrganizationNumber;
    };

    const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
        if (organisasjon) {
            sjekkLokasjon(organisasjon);
            props.byttOrganisasjon(organisasjon);
        }
    };

    return (
        <div className="hovebanner">
            <Bedriftsmeny
                sidetittel="Ettersende opplysninger eller klage på vedtak om lønnskompensasjon"
                organisasjoner={props.organisasjoner.sort((a, b) => a.Name.localeCompare(b.Name))}
                onOrganisasjonChange={onOrganisasjonChange}
                history={history}
            />
        </div>
    );
};

export default withRouter(Banner);
