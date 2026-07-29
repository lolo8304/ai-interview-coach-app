import useSWR from 'swr';
import {getMe, type Me} from '../lib/api';

interface UseMeState {
    data: Me | undefined;
    error: Error | undefined;
    isLoading: boolean;
}

export function useMe(): UseMeState {
    const {data, error, isLoading} = useSWR<Me, Error>('/api/rest/settings/me', getMe);

    return {
        data,
        error,
        isLoading,
    };
}
