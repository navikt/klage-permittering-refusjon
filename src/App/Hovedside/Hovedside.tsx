import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import './Hovedside.less';

const Hovedside = () => {
    return (
        <div className="hovedside">
            <Undertittel>Syte og klage</Undertittel>
            <Lenke href="https://nav.no">Nav.no</Lenke>
        </div>
    );
};

export default Hovedside;
