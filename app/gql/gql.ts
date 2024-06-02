/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetRepositoryIssues($name: String!, $owner: String!, $first: Int!, $after: String!) {\n    repository(name: $name, owner: $owner) {\n      name\n      issues(first: $first, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {\n        nodes {\n          title\n          createdAt\n          labels(first: $first) {\n            nodes {\n              name\n            }\n          }\n          state\n          number\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n": types.GetRepositoryIssuesDocument,
    "\n  query GetRepositories($first: Int!, $after: String!) {\n    viewer {\n      repositories(\n        first: $first\n        after: $after\n        orderBy: { field: CREATED_AT, direction: DESC }\n        privacy: PUBLIC\n      ) {\n        nodes {\n          name\n          description\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n      login\n    }\n  }\n": types.GetRepositoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRepositoryIssues($name: String!, $owner: String!, $first: Int!, $after: String!) {\n    repository(name: $name, owner: $owner) {\n      name\n      issues(first: $first, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {\n        nodes {\n          title\n          createdAt\n          labels(first: $first) {\n            nodes {\n              name\n            }\n          }\n          state\n          number\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRepositoryIssues($name: String!, $owner: String!, $first: Int!, $after: String!) {\n    repository(name: $name, owner: $owner) {\n      name\n      issues(first: $first, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {\n        nodes {\n          title\n          createdAt\n          labels(first: $first) {\n            nodes {\n              name\n            }\n          }\n          state\n          number\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRepositories($first: Int!, $after: String!) {\n    viewer {\n      repositories(\n        first: $first\n        after: $after\n        orderBy: { field: CREATED_AT, direction: DESC }\n        privacy: PUBLIC\n      ) {\n        nodes {\n          name\n          description\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n      login\n    }\n  }\n"): (typeof documents)["\n  query GetRepositories($first: Int!, $after: String!) {\n    viewer {\n      repositories(\n        first: $first\n        after: $after\n        orderBy: { field: CREATED_AT, direction: DESC }\n        privacy: PUBLIC\n      ) {\n        nodes {\n          name\n          description\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n      login\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;