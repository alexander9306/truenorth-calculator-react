import useSWR from 'swr';
import { signOut, useSession } from 'next-auth/react';
import { FetcherProps, fetcher } from './fetcher';
import { useEffect } from 'react';

export const useSWRFetch = <T = unknown>(
  req: FetcherProps | string | null
) => {
  const fetchOptions = {
    ...(typeof req === 'string' && { url: req }),
    ...(req !== null && typeof req !== 'string' && req),
  };

  const { data: session }: { data: any } = useSession();
  const accessToken = session?.accessToken;

  const data = useSWR<T>(
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
        // Sign out after 2 retries of 401
        if (error.status === 401 && retryCount >= 2) return signOut();

        // Only retry up to 6 times to avoid being Throttle.
        if (retryCount >= 6) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 4000);
      },
    }
  );

  return data;
};

export const useFetch = () => {
  const { data: session }: { data: any } = useSession();
  const accessToken = session?.accessToken;

  const fetch = <T = unknown>(req: FetcherProps): Promise<T> =>
    fetcher({ ...req, accessToken });

  return { fetcher: fetch };
};
