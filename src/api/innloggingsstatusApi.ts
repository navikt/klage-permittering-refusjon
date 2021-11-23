import {basename} from "../lenker";

export interface Innloggingstatus {
    erInnlogget: boolean;
    harGyldigOidcToken: boolean;
    brukerId?: any;
    niva?: any;
    nivaOidc?: any;
}

export const hentInnloggingstatus = async(): Promise<Innloggingstatus> => {
    let responsBody = {} as Innloggingstatus;
    const respons = await fetch(basename + '/veilarbstepup/status', {
        method: 'GET',
        credentials: 'include',
    });
    if (respons.ok) {
        responsBody = await respons.json();
    }
    return responsBody;
};
