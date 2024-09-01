import { gql } from '@apollo/client';

export const UPDATE_CLINIC = gql`
mutation updateClinic($id: ID!, $data: ClinicInput!) {
    updateClinic(id: $id, data: $data) {
      data {
        id
        attributes {
          name
          address
          city
          postalCode
          country
        }
      }
    }
  }
`;

export const CREATE_CLINIC = gql`
  mutation createClinic($data: ClinicInput!) {
    createClinic(data: $data) {
      data {
        id
        attributes {
          name
          address
          city
          postalCode
          country
        }
      }
    }
  }
`;