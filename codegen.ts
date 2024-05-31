import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'app/gql/schema.graphql',
  documents: 'app/**/*.{ts,tsx}',
  generates: {
    'app/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
