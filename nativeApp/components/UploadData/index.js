import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const UploadDataBtn = ({ mutate }) => {
  return (
    <button
      onClick={() =>
        console.log('Update this onClick to send mutation to gql endpoint')
      }
    >
      Upload Data
    </button>
  );
};

const uploadDataMutation = gql`
  mutation($familyName: String!) {
    createFamily(data: { family_name: $familyName }) {
      id
      family_name
    }
  }
  mutation($personName: String!, $familyId: ID!) {
    createPerson(
      data: { person_name: $personName, family: { connect: { id: $familyId } } }
    ) {
      person_name
      id
      family {
        id
        family_name
      }
    }
  }
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

const UploadDataWithMutation = graphql(uploadDataMutation)(UploadData);

export default UploadDataWithMutation;
