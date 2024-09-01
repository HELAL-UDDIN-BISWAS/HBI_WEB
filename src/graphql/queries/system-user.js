import { gql } from '@apollo/client'

export const GET_ALL_SYSTEM_USERS = gql`
    query getSystemUsers($filters: UsersPermissionsUserFiltersInput) {
        usersPermissionsUsers(filters: $filters, pagination: { limit: 100 }) {
            data {
                id
                attributes {
                    email
                    status
                    isNotified
                    blocked
                    role {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    profile {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_SYSTEM_USER_BY_ID = gql`
    query getSystemUserById($id: ID!) {
        usersPermissionsUser(id: $id) {
            data {
                id
                attributes {
                    email
                    isNotified
                    status
                    blocked
                    role {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    profile {
                        data {
                            id
                            attributes {
                                name
                                phoneNo
                                gender
                                dateOfBirth
                                nationality
                                passport
                            }
                        }
                    }
                }
            }
        }
    }
`
