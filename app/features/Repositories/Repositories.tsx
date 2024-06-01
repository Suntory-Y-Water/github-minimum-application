'use client';

import Link from 'next/link';
import { LoadingButton } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { GetRepositoriesQuery } from '@/app/gql/graphql';
import { MdNavigateNext } from 'react-icons/md';
import { useState } from 'react';

type Props = {
  params: GetRepositoriesQuery;
};

const Repositories = ({ params }: Props) => {
  const [searchRepository, setSearchRepository] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // TODO: 初期表示するリポジトリの数を管理。初期値は定数で管理する
  const [displayCount, setDisplayCount] = useState<number>(10);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRepository(e.target.value.toLowerCase());
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      // TODO: 表示件数は定数で管理する
      setDisplayCount((prevCount) => prevCount + 10);
      setLoading(false);
    }, 1000);
  };

  // 最初に表示するリポジトリの数に基づいてリポジトリを制限
  const limitedRepositories = params?.viewer.repositories.nodes?.slice(0, displayCount);

  // 制限されたリポジトリの中で検索
  const filteredRepositories = limitedRepositories?.filter((repository) =>
    repository?.name.toLowerCase().includes(searchRepository),
  );

  const allDisplayed = limitedRepositories?.length === params?.viewer.repositories.nodes?.length;

  // inputに値が入っている場合、ボタンを表示させないため
  const isInputEmpty = searchRepository.length === 0;

  return (
    <>
      <div>
        <Input
          className='mb-4'
          placeholder='リポジトリ名で検索...'
          type='text'
          value={searchRepository}
          onChange={handleSearch}
        />
      </div>
      {filteredRepositories?.map((repository) => (
        <li
          key={repository?.name}
          className='flex p-4 items-center justify-between hover:bg-muted/50'
        >
          <Link href={`/issues/${repository?.name}`}>
            <p className='font-bold'>{repository?.name}</p>
            <p className='text-sm text-gray-600'>{repository?.description}</p>
          </Link>
          <MdNavigateNext size={20} />
        </li>
      ))}
      {!allDisplayed && isInputEmpty && (
        <LoadingButton loading={loading} className='mt-4 w-full' onClick={handleClick}>
          もっとリポジトリを見る
        </LoadingButton>
      )}
    </>
  );
};

export default Repositories;
