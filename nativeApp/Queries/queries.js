import gql from "graphql-tag";

const addFamilyMutation = gql`
  mutation($familyName: String!) {
    createFamily(data: { family_name: $familyName }) {
      id
      family_name
    }
  }
`;
const addFamilyAnswers = gql`
  mutation($surveyName: String!, $employeeId: ID!, $familyId: ID!) {
    createSurvey(
      data: {
        survey_name: $surveyName
        employee: { connect: { id: $employeeId } }
        family: { connect: { id: $familyId } }
      }
    ) {
      id
      survey_name
    }
  }
`;

export { addFamilyMutation, addFamilyAnswers };
