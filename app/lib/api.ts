import { envConfig } from './envConfig';

type FetchDataParams = {
  host: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
};

// TODO: ISRの対応ができていない
// TODO: cacheの対応ができていない
export const fetchData = async <T>({
  host,
  url,
  method = 'POST',
  body,
}: FetchDataParams): Promise<T> => {
  const apiUrl = `${envConfig.API_PREFIX}${host}/api/${url}`;
  try {
    const response = await fetch(apiUrl, {
      method,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
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
