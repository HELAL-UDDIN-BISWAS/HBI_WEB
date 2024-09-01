import { gql } from '@apollo/client'

// profile created for system user create
export const CREATE_SYSTEM_USER_PROFILE = gql`
    mutation createProfile($profile: ProfileInput!) {
        createProfile(data: $profile) {
            data {
                id
            }
        }
    }
`

// system user create
export const CREATE_SYSTEM_USER = gql`
    mutation createSystemUser(
        $email: String!
        $username: String!
        $password: String!
        $role: ID!
        $profileId: ID!
    ) {
        createUsersPermissionsUser(
            data: {
                email: $email
                username: $username
                password: $password
                role: $role
                profile: $profileId
            }
        ) {
            data {
                id
                attributes {
                    username
                    email
                    isNotified
                    status
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

// update the profile for updating system user
export const UPDATE_SYSTEM_USER_PROFILE = gql`
    mutation updateProfile($id: ID!, $input: ProfileInput!) {
        updateProfile(id: $id, data: $input) {
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
`

// update system user
export const UPDATE_SYSTEM_USER = gql`
    mutation updateSystemUser(
        $id: ID!
        $username: String
        $email: String
        $password: String
        $role: ID
        $profile: ID
        $isNotified: Boolean
        $blocked: Boolean
        $status: ENUM_USERSPERMISSIONSUSER_STATUS
    ) {
        updateUsersPermissionsUser(
            id: $id
            data: {
                username: $username
                email: $email
                password: $password
                role: $role
                profile: $profile
                isNotified: $isNotified
                blocked: $blocked
                status: $status
            }
        ) {
            data {
                id
                attributes {
                    username
                    email
                    status
                    isNotified
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

export const UPDATE_SYSTEM_USERS_STATUS = gql`
    mutation updateMemberStatus(
        $id: ID!
        $isNotified: Boolean
        $status: ENUM_USERSPERMISSIONSUSER_STATUS!
    ) {
        updateUsersPermissionsUser(
            id: $id
            data: { isNotified: $isNotified, status: $status }
        ) {
            data {
                id
                attributes {
                    status
                    isNotified
                }
            }
        }
    }
`
