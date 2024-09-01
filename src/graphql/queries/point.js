import { gql } from "@apollo/client";

export const GET_ALL_POINTS = gql`
    query point{
    points{
    data{
      id
      attributes{
        appointedAmount
        earnedPoints
      }
    }
  }
}`
