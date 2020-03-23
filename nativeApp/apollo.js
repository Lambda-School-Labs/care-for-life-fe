import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const GRAPHQL_ENDPOINT = 'Our GraphQL endpoint goes here';

const apolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT
      // // on production, we need to store the token with storage or redux persist
      // headers: {
      //   authorization: 'TOKEN_HERE'
      // }
    })
  });
};

export default apolloClient;
