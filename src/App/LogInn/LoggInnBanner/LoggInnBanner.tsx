import React from 'react';
import { Sidetittel, Ingress } from 'nav-frontend-typografi';
import medhjelm from './Ikoner/med-hjelm.svg';
import telefon from './Ikoner/telefon-person.svg';
import kokk from './Ikoner/kokk.png';
import './LoggInnBanner.less';

const LoggInnBanner = () => {
    return (
        <div className="logg-inn-banner">
            <div className="logg-inn-banner__container">
                <div className="logg-inn-banner__tittel-og-tekst">
                    <Sidetittel className="tittel">
                        Lønnskompensasjon for permitterte
                    </Sidetittel>
                    <Ingress className="ingress">For arbeidsgivere</Ingress>
                </div>
                <div className="logg-inn-banner__bilder">
                    <img src={medhjelm} alt="" />
                    <img src={telefon} alt="" />
                    <img src={kokk} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LoggInnBanner;
