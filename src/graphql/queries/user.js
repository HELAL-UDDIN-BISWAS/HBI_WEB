import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
    query getAllUser($filters: UsersPermissionsUserFiltersInput) {
        usersPermissionsUsers(filters: $filters, pagination: { limit: 100 }) {
            data {
                id
                attributes {
                    username
                    referById
                    referralId
                    fcmToken
                    profile {
                        data {
                            id
                            attributes {
                                name
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
                    userRequestTo {
                        data {
                            id
                            attributes {
                                fromUser {
                                    data {
                                        id
                                        attributes {
                                            username
                                        }
                                    }
                                }
                                toUser {
                                    data {
                                        id
                                        attributes {
                                            username
                                        }
                                    }
                                }
                                status
                            }
                        }
                    }
                    userRequestFrom {
                        data {
                            id
                            attributes {
                                fromUser {
                                    data {
                                        id
                                        attributes {
                                            username
                                        }
                                    }
                                }
                                toUser {
                                    data {
                                        id
                                        attributes {
                                            username
                                        }
                                    }
                                }
                                status
                            }
                        }
                    }
                }
            }
            meta {
                pagination {
                    total
                }
            }
        }
    }
`

export const GET_USER_ID_BY_EMAIL = gql`
    query GetUserIdByEmail($email: String!) {
        usersPermissionsUsers(filters: { email: { eq: $email } }) {
            data {
                id
            }
        }
    }
`

export const GET_ROLES_ID = gql`
    query getRole($filters: UsersPermissionsRoleFiltersInput) {
        usersPermissionsRoles(filters: $filters) {
            data {
                id
            }
        }
    }
`
