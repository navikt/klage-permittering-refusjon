import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { ManglerTilgangLenkePanel } from './ManglerTilgangLenkePanel/ManglerTilgangLenkePanel';
import './ManglerTilgangContainer.less';

const lenkeTilDittNavPerson = 'https://www.nav.no/person/dittnav/';
const lenkeTilTilgangsstyringsInfo =
    'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring';

export const ManglerTilgangContainer = () => {
    return (
        <div className="mangler-tilgang">
            <Innholdstittel>Du mangler tilganger</Innholdstittel>
            <span className="mangler-tilgang-container">
                <ManglerTilgangLenkePanel
                    tittel="Se tjenester som privatperson"
                    infoTekst="Gå til Ditt NAV"
                    lenke={lenkeTilDittNavPerson}
                />
                <ManglerTilgangLenkePanel
                    tittel="Hvordan får jeg tilgang?"
                    infoTekst="Lær om roller og tilganger i Altinn"
                    lenke={lenkeTilTilgangsstyringsInfo}
                />
            </span>
        </div>
    );
};
