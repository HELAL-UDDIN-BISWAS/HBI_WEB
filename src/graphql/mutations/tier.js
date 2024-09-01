import { gql } from '@apollo/client'

export const CREATE_TIER = gql`
    mutation createTier($data: TierInput!) {
        createTier(data: $data) {
            data {
                id
                attributes {
                    name
                    pointRangeFrom
                    pointRangeTo
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
                }
            }
        }
    }
`

export const UPDATE_TIER = gql`
    mutation updateTier($id: ID!, $data: TierInput!) {
        updateTier(id: $id, data: $data) {
            data {
                id
                attributes {
                    name
                    pointRangeFrom
                    pointRangeTo
                    image {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`

export const DELETE_TIER = gql`
    mutation deleteTier($id: ID!) {
        deleteTier(id: $id) {
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
