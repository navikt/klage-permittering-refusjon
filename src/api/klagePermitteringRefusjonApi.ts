import api from './api-client';
import { testLenkeBackend } from '../lenker';

export const opprett = async (data: string) => {
    const response = await api.post(testLenkeBackend(), data);
    return response.data;
};

