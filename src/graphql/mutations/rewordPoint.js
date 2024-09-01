import { gql } from "@apollo/client";

export const CREATE_REWARD_POINT = gql`
mutation CreateRewardPoint($data: PointInput!){
  createPoint(data: $data){
    data {
      attributes {
        appointedAmount
        earnedPoints
      }
    }
  }
}
`;

export const UPDATE_REWARD_POINT = gql`
mutation pointUpdate($id: ID!, $data: PointInput!) {
  updatePoint(id: $id, data: $data) {
    data {
      id
      attributes {
        appointedAmount
        earnedPoints
      }
    }
  }
}
`;

export const DELETE_REWARD_POINT = gql`
  mutation deletePoint($id: ID!) {
    deletePoint(id: $id) {
      data {
        id
      }
    }
  }
`;


