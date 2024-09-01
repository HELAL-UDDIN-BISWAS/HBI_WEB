import { gql } from "@apollo/client";

export const GET_REWARDS_SYSTEM_DATA = gql`
  query getSystemReward($filter: RewardFiltersInput) {
    rewards(filters: $filter) {
      data {
        id
        attributes {
          points
          user {
            data {
              id
              attributes {
                username
                email
                status
                role {
                  data {
                    attributes {
                      name
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

export const GET_SINGLE_REWARD = gql`
  query getSingleReward($id: ID!) {
    reward(id: $id) {
      data {
        id
        attributes {
          points
        }
      }
    }
  }
`;

export const UPDATE_REWARD_POINTS = gql`
  mutation editPoints($data: RewardInput!, $id: ID!) {
    updateReward(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
