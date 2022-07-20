import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import '@navikt/ds-css';

interface CustomLenkepanel {
    tittel: string;
    infoTekst: string;
    lenke: string;
}

export const ManglerTilgangLenkePanel = (props: CustomLenkepanel) => {
    return (
        <div className="mangler-tilgang-lenkepanel">
            <LinkPanel href={props.lenke} border>
                <LinkPanel.Title>{props.tittel}</LinkPanel.Title>
                <LinkPanel.Description>{props.infoTekst}</LinkPanel.Description>
            </LinkPanel>
        </div>
    );
};
