import { gql } from '@apollo/client'

export const GET_ALL_TIERS = gql`
    query getAllTier($filters: TierFiltersInput, $page: Int, $pageSize: Int) {
        tiers(
            filters: $filters
            sort: ["updatedAt:desc"]
            pagination: { page: $page, pageSize: $pageSize, limit: 50 }
        ) {
            meta {
                pagination {
                    page
                    pageSize
                    pageCount
                    total
                }
            }
            data {
                id
                attributes {
                    name
                    image {
                        data {
                            id
                            attributes {
                                name
                                width
                                height
                                size
                                url
                                provider
                            }
                        }
                    }
                    pointRangeFrom
                    pointRangeTo
                    updatedAt
                }
            }
        }
    }
`

export const GET_TIER_BY_ID = gql`
    query getTierById($id: ID) {
        tier(id: $id) {
            data {
                id
                attributes {
                    name
                    image {
                        data {
                            id
                            attributes {
                                name
                                width
                                height
                                size
                                url
                                provider
                            }
                        }
                    }
                    pointRangeFrom
                    pointRangeTo
                    updatedAt
                }
            }
        }
    }
`
