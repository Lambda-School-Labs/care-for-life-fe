import React from 'react';
import { gql, graphql } from 'react-apollo';

const UploadData = ({ mutate }) => {
  return (
    <button onClick={() => console.log('Hello world')}>Upload Data</button>
  );
};

const uploadDataMutation = gql`
  mutation uploadData($family_id: Integer!) {
    uploadData(family_id: $family_id) {
      // create mutations here
    }
  }
`;

const UploadDataWithMutation = graphql(uploadDataMutation)(UploadData);

export default UploadDataWithMutation;
