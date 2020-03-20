import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const GRAPHQL_ENDPOINT = 'Our GraphQL endpoint goes here';

const apolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT
    })
  });
};

export default apolloClient;
