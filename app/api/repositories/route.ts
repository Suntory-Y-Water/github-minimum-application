import { GetRepositoriesQuery } from '@/app/gql/graphql';
import client from '@/app/lib/apolloClient';
import { gql } from '@apollo/client';
import { NextRequest, NextResponse } from 'next/server';

const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int!) {
    viewer {
      repositories(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          name
          description
        }
      }
    }
  }
`;

// TODO: POSTなのでは？
export const GET = async () => {
  try {
    const { data } = await client.query<GetRepositoriesQuery>({
      query: GET_REPOSITORIES,
      variables: { first: 10 },
    });
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({
      status: 500,
      message: `システムで予期せぬエラーが発生しました。 ${error}`,
    });
  }
};
