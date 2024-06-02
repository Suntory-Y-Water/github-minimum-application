import { Constants } from '@/app/constants';
import {
  GetRepositoriesQuery,
  GetRepositoryIssuesQuery,
  GetRepositoryIssuesQueryVariables,
} from '@/app/gql/graphql';
import client from '@/app/lib/apolloClient';
import { ExtendNextRequest, IssuesRequest } from '@/app/types';
import { gql } from '@apollo/client';
import { NextResponse } from 'next/server';

/**
 * @description
 */
const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($name: String!, $owner: String!, $first: Int!, $after: String!) {
    repository(name: $name, owner: $owner) {
      name
      issues(first: $first, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          title
          createdAt
          labels(first: $first) {
            nodes {
              name
            }
          }
          state
          number
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const POST = async (request: ExtendNextRequest<IssuesRequest>) => {
  try {
    const body = await request.json();
    let after = '';
    let repositories: GetRepositoryIssuesQuery | null = null;
    let hasNextPage = true;
    const variables: GetRepositoryIssuesQueryVariables = {
      first: Constants.FETCH_COUNT,
      name: body.name,
      owner: body.owner,
      after: after,
    };

    while (hasNextPage) {
      const { data } = await client.query<GetRepositoryIssuesQuery>({
        query: GET_REPOSITORY_ISSUES,
        variables: variables,
      });
      if (!data) {
        return NextResponse.json({
          status: 500,
          message: 'データを取得できませんでした。',
        });
      }
      const fetchedRepositoryIssues = data.repository;

      // 取得してきたデータと初期値データの統合を行う
      if (
        repositories &&
        repositories.repository?.issues.nodes &&
        fetchedRepositoryIssues?.issues.nodes
      ) {
        repositories.repository.issues.nodes = [
          ...repositories.repository.issues.nodes,
          ...fetchedRepositoryIssues.issues.nodes,
        ];
      } else {
        // 初回のみ全体を代入
        repositories = {
          repository: {
            name: fetchedRepositoryIssues?.name || '',
            issues: {
              nodes: fetchedRepositoryIssues?.issues.nodes
                ? [...fetchedRepositoryIssues.issues.nodes]
                : [],
              pageInfo: fetchedRepositoryIssues!.issues.pageInfo,
            },
          },
        };
      }

      hasNextPage = data.repository?.issues.pageInfo.hasNextPage || false;
      after = data.repository?.issues.pageInfo.endCursor || '';

      if (!hasNextPage) {
        break;
      }
    }

    return NextResponse.json(repositories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: `システムで予期せぬエラーが発生しました。 ${error}`,
    });
  }
};
