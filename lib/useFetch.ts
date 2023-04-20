import useSWR from 'swr';
import { signOut, useSession } from 'next-auth/react';
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
        ) {
          return;
        }

        // Only retry up to 3 times on Unauthorized then signOut
        if (error.status === 401 && retryCount >= 3) return signOut();

        // Never retry on 404.
        if (error.status === 404 || error.status === 400) return;

        // Only retry up to 5 times to avoid being Throttle.
        if (retryCount >= 5) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  return { data, error, isLoading };
};
