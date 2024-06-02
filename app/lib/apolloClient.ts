import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { envConfig } from './envConfig';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${envConfig.GITHUB_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ['login'],
      },
      Repository: {
        keyFields: ['name'],
      },
      Query: {
        fields: {
          viewer: {
            read(existing, { toReference }) {
              return existing || toReference({ __typename: 'User', login: envConfig.USER_NAME });
            },
          },
          repository: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            },
          },
        },
      },
    },
  }),
});

export default client;
