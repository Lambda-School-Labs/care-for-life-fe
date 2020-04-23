import gql from 'graphql-tag';

// creates a family and all of their survey answers in the database
const addFamilyAndAnswersMutation = gql`
  mutation(
    $familyName: String!
    $surveyName: String!
    $employeeId: ID!
    $answerText: String!
    $questionId: ID!
  ) {
    createFamily(
      data: {
        family_name: $familyName
        surveys: {
          create: {
            survey_name: $surveyName
            employee: { connect: { id: $employeeId } }
            answers: {
              create: {
                answer: $answerText
                question: { connect: { id: $questionId } }
              }
            }
          }
        }
      }
    ) {
      id
      family_name
      family_members
    }
  }
`;

// creates an individual family member and all of their solo survey answers in the database
const addIndividualAndAnswersMutation = gql`
  mutation(
    $personName: String!
    $surveyName: String!
    $employeeId: ID!
    $answerText: String!
    $questionId: ID!
  ) {
    createPerson(
      data: {
        person_name: $personName
        surveys: {
          create: {
            survey_name: $surveyName
            employee: { connect: { id: $employeeId } }
            answers: {
              create: {
                answer: $answerText
                question: { connect: { id: $questionId } }
              }
            }
          }
        }
      }
    ) {
      id
      person_name
    }
  }
`;

// adds a new user (aka a CFL employee) to the database, then returns a JWT token & the user's info
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

// checks a user's credentials upon logging in, then returns a JWT token & the user's info
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

// const addFamilyMutation = gql`
//   mutation($familyName: String!) {
//     createFamily(data: { family_name: $familyName }) {
//       id
//       family_name
//     }
//   }
// `;

// const addAnswersMutation = gql`
//   mutation($answer: String!, $questionId: ID!, $familyId: ID!, $surveyId: ID!) {
//     createAnswer(
//       data: {
//         answer: $answer
//         question: { connect: { id: $questionId } }
//         family: { connect: { id: $familyId } }
//         survey: { connect: { id: $surveyId } }
//       }
//     ) {
//       answer
//       dateTaken
//       id
//     }
//   }
// `;

export {
  addFamilyAndAnswersMutation,
  addIndividualAndAnswersMutation,
  signUpMutation,
  loginMutation,
};
