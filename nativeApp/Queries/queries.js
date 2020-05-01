import gql from "graphql-tag";

// creates a family and all of their survey answers in the database
const addFamilyAndAnswersMutation = gql`
  mutation(
    $familyName: String!
    $surveyId: ID!
    $employeeId: ID!
    $answerText: String!
    $questionId: ID!
  ) {
    createFamily(
      data: {
        family_name: $familyName
        completed_surveys: {
          create: {
            originalSurvey: { connect: { id: $surveyId } }
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
    }
  }
`;

const addPersonAndAnswersMutation = gql`
  mutation(
    $employeeId: ID!
    $personName: String!
    $surveyName: String!
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

// // checks a user's credentials upon logging in, then returns a JWT token & the user's info
const loginQuery = gql`
  query {
    families {
      id
    }
  }
`;


export { addPersonAndAnswersMutation, addFamilyAndAnswersMutation, loginQuery };

