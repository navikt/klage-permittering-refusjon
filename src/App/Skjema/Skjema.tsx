import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { minSideArbeidsgiverUrl } from '../../lenker';
import './Skjema.less';

const Skjema = () => {
    return (
        <div className="skjema">
            <Normaltekst className="brodsmule">
                <Lenke href={minSideArbeidsgiverUrl('12345678')}>Min side – arbeidsgiver</Lenke>
                {' / Klage på vedtak for refusjon ved permittering'}
            </Normaltekst>

            <Snakkeboble>
                Legg merke til at du ikke kan klage på selve regelverket, kun vedtaket NAV fattet om
                refusjon ved permittering.
            </Snakkeboble>
        </div>
    );
};

export default Skjema;
