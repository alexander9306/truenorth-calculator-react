export type FetcherProps = {
  url: string;
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  accessToken?: string;
};

type FetchRequestInit = Parameters<typeof fetch>[1];

export const fetcher = async (req: FetcherProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

  const url = baseUrl + req.url;

  const fetchOptions: FetchRequestInit = {
    method: 'GET',
    ...req,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...(req.accessToken && {
        Authorization: `Bearer ${req.accessToken}`,
      }),
    },
  };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  console.log('result', result);
  return result;
};
