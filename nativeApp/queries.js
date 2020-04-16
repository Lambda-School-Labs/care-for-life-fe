import gql from 'graphql-tag';

const addFamilyMutation = gql`
  mutation($familyName: String!) {
    createFamily(data: { family_name: $familyName }) {
      id
      family_name
    }
  }
`;

export { addFamilyMutation };
