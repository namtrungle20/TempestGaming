import { QueryClient, notifyManager } from '@tanstack/react-query';

notifyManager.setBatchNotifyFunction(callback => callback());
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            gcTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            structuralSharing: false,
            networkMode: 'always',
        },
    },
});