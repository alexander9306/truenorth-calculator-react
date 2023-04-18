import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { FetcherProps, fetcher } from './fetcher';

export const useFetch = <T = unknown>(
  req: FetcherProps | string | null
) => {
  const fetchOptions = {
    ...(typeof req === 'string' && { url: req }),
    ...(req !== null && typeof req !== 'string' && req),
  };

  const { data: session }: { data: any } = useSession();
  const accessToken = session?.accessToken;

  const { data, error, isLoading } = useSWR<T>(
    req === null ? req : { ...fetchOptions, accessToken },
    fetcher,
    {
      onErrorRetry: (
        error,
        key,
        config,
        revalidate,
        { retryCount }
      ) => {
        // Never retry on Insufficient Balance Error
        if (
          error.message ===
          'Insufficient balance to perform this operation'
        )
          return;
        if (error.status === 404)
          // Never retry on 404.
          return;

        // Never retry for a specific key.
        if (key === '/api/user') return;

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  return { data, error, isLoading };
};
