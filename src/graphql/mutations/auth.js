import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
 mutation signin($email: String!, $password: String!){
  signin(email: $email, password: $password) {
    userError
    token
  }
}
`;

export const FORGET_PASSWORD_MUTATION = gql`
  mutation forgotpassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export const FORGET_PASSWORD_SMS_MUTATION = gql`
  mutation forgotpassword($phone: String!) {
    forgotPassword(phone: $phone)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $password: String!
    $passwordConfirmation: String!
    $code: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirmation: $passwordConfirmation
      code: $code
    ) {
      jwt
      user {
        email
        confirmed
      }
    }
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation Mutation(
    $currentPassword: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    changePassword(
      currentPassword: $currentPassword
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      jwt
      user {
        id
        email
        confirmed
      }
    }
  }
`;
