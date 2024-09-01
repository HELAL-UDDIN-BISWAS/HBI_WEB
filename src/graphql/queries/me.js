import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    me {
      id
      username
      referById
      referralId
      email
      profile
      role {
        id
        name
      }
    }
  }
`;
export const GET_USER_PROFILE = gql`
  query getUserProfile($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          email
          username
          referById
          referralId
          profile {
            data {
              id
              attributes {
                profilePicture {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
