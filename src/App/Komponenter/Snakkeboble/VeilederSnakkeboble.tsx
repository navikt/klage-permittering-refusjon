import React from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import './VeilederSnakkeboble.less';

interface Props {
    tekst: React.ReactNode | string;
}

const VeilederSnakkeboble = ({ tekst }: Props) => {
    return (
        <div className="veileder-snakkeboble">
            <Snakkeboble>{tekst}</Snakkeboble>
        </div>
    );
};

export default VeilederSnakkeboble;
