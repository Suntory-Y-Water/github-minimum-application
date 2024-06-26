import { envConfig } from '@/app/lib/envConfig';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { headers } from 'next/headers';
import { fetchData } from '@/app/lib/api';
import { GetRepositoryIssuesQuery } from '@/app/gql/graphql';
import Issues from '@/app/features/Issues/Issues';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    name: string;
  };
};

const Home = async ({ params }: Props) => {
  const host = headers().get('host');
  if (!host) {
    throw new Error('Host not found');
  }

  const data = await fetchData<GetRepositoryIssuesQuery>({
    host: host,
    url: 'issues',
    method: 'POST',
    body: {
      name: params.name,
      owner: envConfig.USER_NAME,
    },
  });

  if (!data?.repository?.name) {
    notFound();
  }

  return (
    <div className='mx-auto my-4 max-w-4xl'>
      <div className='relative my-4 flex w-full items-center justify-center'>
        <Link href='/' className='absolute left-4'>
          <IoIosArrowBack />
        </Link>
        <h2 className='text-center'>{data?.repository?.name}</h2>
      </div>
      <ul className='divide-y'>
        <Issues params={data} />
      </ul>
    </div>
  );
};

export default Home;
