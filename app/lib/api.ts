import { envConfig } from './envConfig';

type FetchDataParams = {
  host: string;
  url: string;
  cache: RequestCache;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

// TODO: ISRの対応ができていない
export const fetchData = async <T>({
  host,
  url,
  cache,
  method = 'POST',
  headers = {},
  body = null,
}: FetchDataParams): Promise<T> => {
  const apiUrl = `${envConfig.API_PREFIX}${host}/api/${url}`;
  try {
    const response = await fetch(apiUrl, {
      method,
      cache: cache,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
