export const envConfig = {
  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  USER_NAME: process.env.GITHUB_USER_NAME,
  API_PREFIX: process.env.API_PREFIX,
};

if (!envConfig.GITHUB_ACCESS_TOKEN) {
  throw new Error('GitHub Access Token is not found');
}

if (!envConfig.USER_NAME) {
  throw new Error('GitHub User Name is not found');
}

if (!envConfig.API_PREFIX) {
  throw new Error('API PREFIX is not found');
}
