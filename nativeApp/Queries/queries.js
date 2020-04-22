import gql from 'graphql-tag';

const addFamilyMutation = gql`
  mutation($familyName: String!) {
    createFamily(data: { family_name: $familyName }) {
      id
      family_name
    }
  }
`;

const addAnswersMutation = gql`
  mutation($answer: String!, $questionId: ID!, $familyId: ID!, $surveyId: ID!) {
    createAnswer(
      data: {
        answer: $answer
        question: { connect: { id: $questionId } }
        family: { connect: { id: $familyId } }
        survey: { connect: { id: $surveyId } }
      }
    ) {
      answer
      dateTaken
      id
    }
  }
`;

const signUpMutation = gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export { addFamilyMutation, addAnswersMutation, signUpMutation, loginMutation };
