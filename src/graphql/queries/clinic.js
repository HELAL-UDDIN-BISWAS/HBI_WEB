import { gql } from "@apollo/client";

export const GET_ALL_CLINICS = gql`
query getAllClinic {
    clinics(pagination: { limit: 100 }){
      data{
        id
        attributes{
          name
          address
          city
          postalCode
          country
        }
      }
    }
  }
`
export const GET_CLINICBYID = gql`

query getAllClinic($id: ID!) {
    clinic(id:$id){
      data{
        id
        attributes{
          name
          address
          city
          postalCode
          country
        }
      }
    }
  }
`