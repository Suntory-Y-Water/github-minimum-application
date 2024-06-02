import { notFound } from 'next/navigation';
import { envConfig } from './envConfig';

type FetchDataParams = {
  host: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      notFound();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${apiUrl}: ${error}`);
    throw error;
  }
};
