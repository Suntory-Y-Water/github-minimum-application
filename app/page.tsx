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
    method: 'POST',
  });

  return (
    <div className='mx-auto my-10 max-w-4xl'>
      <ul className='divide-y'>
        <Repositories params={data} />
      </ul>
    </div>
  );
}
