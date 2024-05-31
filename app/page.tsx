import Repositories from './features/Repositories/Repositories';
import { GetRepositoriesQuery } from './gql/graphql';
import { fetchData } from './lib/api';
import { headers } from 'next/headers';

export default async function Home() {
  const host = headers().get('host');
  if (!host) {
    throw new Error('Host not found');
  }
  const data = await fetchData<GetRepositoriesQuery>({
    host: host,
    url: 'repositories',
    cache: 'no-store',
    method: 'GET',
  });
  return (
    <div className='max-w-4xl mx-auto my-10'>
      <ul className='divide-y'>
        <Repositories params={data} />
      </ul>
    </div>
  );
}
