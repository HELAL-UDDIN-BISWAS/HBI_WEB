import { gql } from "@apollo/client";

export const CREATE_PROMOTION = gql`
	mutation CreatePromotion($data: PromotionInput!) {
		createPromotion(data: $data) {
			data {
				id
			}
		}
	}
`;
export const DELETE_PROMOTION = gql`
	mutation Mutation($deletePromotionId: ID!) {
		deletePromotion(id: $deletePromotionId) {
			data {
				id
			}
		}
	}
`;

export const UPDATE_PROMOTION = gql`

mutation Mutation($updatePromotionId: ID!, $data: PromotionInput!) {
  updatePromotion(id: $updatePromotionId, data: $data) {
    data {
      id
      attributes {
        percentOff
        productName
        tier
      }
    }
  }
}
`;

