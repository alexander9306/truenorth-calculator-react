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
    fetcher
  );

  return { data, error, isLoading };
};
