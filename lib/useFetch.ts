import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { FetcherProps, fetcher } from './fetcher';

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
