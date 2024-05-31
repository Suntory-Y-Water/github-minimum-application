import Link from 'next/link';
import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { GetRepositoriesQuery } from '@/app/gql/graphql';
import { MdNavigateNext } from 'react-icons/md';

const Repositories = ({ params }: { params: GetRepositoriesQuery }) => {
  return (
    <>
      <div>
        <Input className='mb-4' type='search' />
      </div>
      {params.viewer.repositories.nodes?.map((repository) => (
        <li
          key={repository?.name}
          className='flex p-4 items-center justify-between hover:bg-muted/50 '
        >
          <Link href='/'>
            <p className='font-bold'>{repository?.name}</p>
            <p className='text-sm text-gray-600'>{repository?.description}</p>
          </Link>
          <MdNavigateNext />
        </li>
      ))}
      {/* TODO: ボタン押下時にAPIを発火する処理が必要 */}
      <Button className='mt-4 w-full'>リポジトリを探す！</Button>
    </>
  );
};

export default Repositories;
