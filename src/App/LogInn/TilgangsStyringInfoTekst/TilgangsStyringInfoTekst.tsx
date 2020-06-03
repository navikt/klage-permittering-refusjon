import React from 'react';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import alertikon from './infomation-circle-2.svg';
import './TilgangsStyringInfoTekst.less';

export const TilgangsStyringInfoTekst = () => {
    const basename = '/klage-permittering-refusjon';

    return (
        <div className={'informasjonsboks'}>
            <img
                src={alertikon}
                alt="ikon for å vise at det kommer informasjon om tilgangsstyring"
                className="informasjonsboks__ikon"
            />
            <div className="informasjonsboks__tekst">
                <Element className="informasjonsboks__overskrift">
                    Tildeling av roller foregår i Altinn
                </Element>
                <Lenke
                    className="informasjonsboks__lenke"
                    href={basename + '/informasjon-om-tilgangsstyring'}
                >
                    Les mer om roller og tilganger.
                </Lenke>
            </div>
        </div>
    );
};
