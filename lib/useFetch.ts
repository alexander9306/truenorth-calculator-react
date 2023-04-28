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
        // Never retry on Insufficient Balance Error
        if (
          error.message ===
          'Insufficient balance to perform this operation'
        ) {
          return;
        }

        switch (error.status) {
          case 401:
            if (retryCount >= 3) return signOut();
            break;
          // Never retry on these error codes
          case 404:
          case 400:
          case 409:
          case 469:
            return;

          default:
            break;
        }

        if (
          (key as any)?.url === '/v1/operations' &&
          error.status !== 401
        )
          return;

        if (retryCount >= 5)
          // Only retry up to 5 times to avoid being Throttle.
          return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
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
