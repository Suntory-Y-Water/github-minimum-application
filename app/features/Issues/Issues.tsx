import { envConfig } from '@/app/lib/envConfig';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { GetRepositoryIssuesQuery } from '@/app/gql/graphql';
import { LABEL_TO_EMOJI, STATUS_TO_EMOJI } from '@/app/constants';
import NotElement from '@/app/features/Common/NotElement';

type Props = {
  params: GetRepositoryIssuesQuery;
};

const Issues = ({ params }: Props) => {
  return (
    <>
      {params?.repository?.issues.nodes?.length ?? 0 > 0 ? (
        params?.repository?.issues.nodes?.map((issue) => (
          <li
            key={issue?.title}
            className='flex items-center justify-between space-x-1 p-4 hover:bg-muted/50'
          >
            <div className='flex items-center space-x-1'>
              <p aria-label={issue?.state}>{STATUS_TO_EMOJI[issue!.state]}</p>
              <div className='flex flex-col'>
                {issue?.labels?.nodes?.map((label) => (
                  <p key={label?.name} aria-label={label?.name}>
                    {LABEL_TO_EMOJI[label!.name] || label?.name}
                  </p>
                ))}
              </div>
              <a
                href={`https://github.com/${envConfig.USER_NAME}/${params?.repository?.name}/issues/${issue?.number}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {issue?.title}
              </a>
            </div>
            <FaExternalLinkAlt />
          </li>
        ))
      ) : (
        <NotElement params={{ element: 'イシュー' }} />
      )}
    </>
  );
};

export default Issues;
