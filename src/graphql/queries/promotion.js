import { gql } from '@apollo/client';

export const GET_ALL_PROMOTIONS = gql`
query Promotions($filters: PromotionFiltersInput, $page: Int
    $pageSize: Int) {
  promotions(filters: $filters, pagination: { page: $page, pageSize: $pageSize }) {
      data {
        id
        attributes {
          createdAt
          percentOff
          productName
          tier
          updatedAt
        }
      }
       meta {
          pagination {
            page
            pageCount
            pageSize
            total
          }
        }
    }
  }`

  export const GET_SINGLE_PROMOTION = gql`
  query Promotion($id: ID) {
  promotion(id: $id) {
    data {
      attributes {
        percentOff
        productName
        tier
      }
      id
    }
  }
}
  
  `