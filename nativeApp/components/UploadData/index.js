import React from 'react';
import { gql, graphql } from 'react-apollo';

const UploadData = ({ mutate }) => {
  return (
    <button onClick={() => console.log('Hello world')}>Upload Data</button>
  );
};

const uploadDataMutation = gql`
  mutation ($familyName: String!){
    createFamily(data:{
      family_name: $familyName
    }){
      id
      family_name
    }
  }
  mutation(
    $personName: String!
    $familyId: ID!
  ){
    createPerson(data: {
      person_name: $personName
      family: {
        connect:{
          id: $familyId
        }
      }
    }){
      person_name
      id
      family{
        id
        family_name
      }
    }
  }
  mutation(
    $surveyName: String!
    $employeeId: ID!
    $familyId: ID!
  ){
    createSurvey(data: {
      survey_name: $surveyName
      employee: {connect: {
        id: $employeeId
      }}
      family: {connect:{
        id: $familyId
      }}
    }){
      id
      survey_name
    }
  }
  
  // mutation($name: String!) {
  //   family1: createFamily(data:{
  //     family_name:$name
  //   }) 
  //   {
  //     id
  //   }
  //   family2: createFamily(data:{
  //     family_name:"another"
  //   }) 
  //   {
  //     id
  //   }
  //   family3: createFamily(data:{
  //     family_name:"another3"
  //   }) 
  //   {
  //     id
  //   }
  // }
  }
`;

const UploadDataWithMutation = graphql(uploadDataMutation)(UploadData);

export default UploadDataWithMutation;
