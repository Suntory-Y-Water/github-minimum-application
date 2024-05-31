import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { envConfig } from './envConfig';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${envConfig.GITHUB_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
