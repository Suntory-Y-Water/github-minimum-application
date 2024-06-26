import { Constants } from '@/app/constants';
import { GetRepositoriesQuery, GetRepositoriesQueryVariables } from '@/app/gql/graphql';
import client from '@/app/lib/apolloClient';
import { gql } from '@apollo/client';
import { NextResponse } from 'next/server';

/**
 * @description 公開されているリポジトリから最新n件を取得する
 */
const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int!, $after: String!) {
    viewer {
      repositories(
        first: $first
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
        privacy: PUBLIC
      ) {
        nodes {
          name
          description
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
      login
    }
  }
`;

/**
 * @description リポジトリの一覧を取得する。1回で取得しきれない場合はページネーションから全て取得する
 */
export const POST = async () => {
  try {
    let after = '';
    let repositories: GetRepositoriesQuery | null = null;
    let hasNextPage = true;

    const variables: GetRepositoriesQueryVariables = {
      first: Constants.FETCH_COUNT,
      after: after,
    };

    while (hasNextPage) {
      const { data } = await client.query<GetRepositoriesQuery>({
        query: GET_REPOSITORIES,
        variables: { ...variables, after },
      });
      if (!data) {
        return NextResponse.json({
          status: 500,
          message: 'データを取得できませんでした。',
        });
      }
      const fetchedRepositories = data.viewer;

      //  取得してきたデータと初期値データの統合を行う
      if (repositories) {
        repositories.viewer.repositories.nodes = [
          ...repositories.viewer.repositories.nodes!,
          ...fetchedRepositories.repositories.nodes!,
        ];
      } else {
        // 初回のみ全体を代入
        repositories = {
          viewer: {
            repositories: {
              nodes: [...fetchedRepositories.repositories.nodes!],
              pageInfo: fetchedRepositories.repositories.pageInfo,
            },
            login: fetchedRepositories.login,
          },
        };
      }

      hasNextPage = data.viewer.repositories.pageInfo.hasNextPage;
      after = data.viewer.repositories.pageInfo.endCursor || '';

      if (hasNextPage) {
        await new Promise((resolve) => setTimeout(resolve, 500));
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
