import api from './api-client';
import { OpprettKlageSkjema } from '../typer/Klageskjema';
import { testLenkeBackend } from '../lenker';

export const opprett = async (data: OpprettKlageSkjema) => {
    const response = await api.post(testLenkeBackend(), data);
    return response.data;
};

