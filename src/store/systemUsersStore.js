import {
    CREATE_SYSTEM_USER,
    CREATE_SYSTEM_USER_PROFILE,
    UPDATE_SYSTEM_USER,
    UPDATE_SYSTEM_USER_PROFILE,
    UPDATE_SYSTEM_USERS_STATUS,
} from '@/graphql/mutations/system-users'
import {
    GET_ALL_SYSTEM_USERS,
    GET_SYSTEM_USER_BY_ID,
} from '@/graphql/queries/system-user'
import apolloClient from '@/lib/apolloClient'
import { create } from 'zustand'
import { toast } from 'react-toastify'
import { GET_ROLES_ID, GET_USER_ID_BY_EMAIL } from '@/graphql/queries/user'
import { sanitizeObject } from '@/utils/sanitizer'
import { UPDATE_USER_NAME } from '@/graphql/mutations/user'

const useSystemUsersStore = create((set) => ({
    roleId: null,
    systemUsersData: [],
    systemUser: null,
    loading: false,
    user: null,
    error: null,

    // fetch all system user data
    fetchUsers: async (params = {}) => {
        const { email = '', status,role } = params
        try {
            const { data } = await apolloClient.query({
                query: GET_ALL_SYSTEM_USERS,
                fetchPolicy: 'network-only',
                variables: {
                    filters: {
                        email: {
                            containsi: email,
                        },
                        status: {
                            startsWith: status,
                        },
                        role: {
                            name: {
                                containsi: role,
                            },
                        },
                        or: [
                            {
                                role: {
                                    name: {
                                        eqi: 'Clinic Admin',
                                    },
                                },
                            },
                            {
                                role: {
                                    name: {
                                        eqi: 'HBI admin',
                                    },
                                },
                            },
                            {
                                role: {
                                    name: {
                                        eqi: 'HBI Super admin',
                                    },
                                },
                            },
                            {
                                role: {
                                    name: {
                                        eqi: 'Doctor',
                                    },
                                },
                            },
                        ],
                    },
                },
            })
            const result =
                data?.usersPermissionsUsers?.data?.map(sanitizeObject)
            console.log(result)
            set({ systemUsersData: result || [], loading: false })
        } catch (err) {
            console.error('Error fetching system users:', err)

            let errorMessage = 'An error occurred while fetching system users.'

            if (err.networkError) {
                errorMessage =
                    'Network error: Please check your internet connection.'
            } else if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                errorMessage = `GraphQL error: ${err.graphQLErrors[0].message}`
            } else if (err.message) {
                errorMessage = `Error: ${err.message}`
            }

            set({ error: errorMessage, loading: false })
        }
    },

    // Fetch single system user data by id
    fetchSingleSystemUserById: async (id) => {
        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.query({
                query: GET_SYSTEM_USER_BY_ID,
                variables: { id: id?.id },
            })
            set({
                loading: false,
                systemUser: data?.usersPermissionsUser?.data,
            })
        } catch (err) {
            set({ loading: false, error: err })
        }
    },

    fetchSingleSystemUserById: async (id) => {
        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.query({
                query: GET_SYSTEM_USER_BY_ID,
                variables: { id: id?.id },
            })
            set({
                loading: false,
                systemUser: data?.usersPermissionsUser?.data,
            })
        } catch (err) {
            set({ loading: false, error: err })
        }
    },

    // create a system user
    createSystemUser: async (profileInput, userInput) => {
        set({ loading: true, error: null })
        console.log(profileInput)
        try {
            // First, create the profile
            const { data: profileData } = await apolloClient.mutate({
                mutation: CREATE_SYSTEM_USER_PROFILE,
                variables: {
                    profile: {
                        ...profileInput,
                    },
                },
            })

            // Check for profile creation was successful
            if (!profileData?.createProfile?.data?.id) {
                throw new Error('Profile creation failed: No ID returned')
            }

            // Extract the profile ID from the response
            const profileId = profileData.createProfile.data.id

            // Now, create the user with the profile ID
            const { data } = await apolloClient.mutate({
                mutation: CREATE_SYSTEM_USER,
                variables: { ...userInput, profileId },
            })

            // Check if user creation was successful
            if (!data?.createUsersPermissionsUser?.data) {
                throw new Error('User creation failed')
            }

            // Update the state with the new user data
            set((state) => ({
                loading: false,
                systemUsersData: [
                    ...state.systemUsersData,
                    data.createUsersPermissionsUser.data,
                ],
            }))

            return data.createUsersPermissionsUser.data
        } catch (err) {
            set({ loading: false, error: err })
            console.log(err)
            toast.dismiss()
            toast.error(`Error: ${err.message}`, { autoClose: 5000 })
        }
    },

    // Update a system user profile

    updateSystemUser: async (userId, profileId, profileInput, userInput) => {
        set({ loading: true })

        try {
            // Update user profile
            const { data: userProfile } = await apolloClient.mutate({
                mutation: UPDATE_SYSTEM_USER_PROFILE,
                variables: { id: profileId, input: profileInput },
            })

            // Update system user
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_SYSTEM_USER,
                variables: { id: userId, ...userInput, profile: profileId },
            })

            // Update state with the new user data
            set((state) => ({
                systemUsersData: state.systemUsersData.map((user) =>
                    user.id === userId
                        ? data.updateUsersPermissionsUser.data
                        : user
                ),
                loading: false,
            }))
            return data.updateUsersPermissionsUser.data;
        } catch (error) {
            // Handle error
            set({ error, loading: false })
            console.error(error)
        }
    },

    // update status value
    updateSystemUsersStatus: async (id, isNotified, status) => {
        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_SYSTEM_USERS_STATUS,
                variables: { id, isNotified, status },
            })

            set((state) => ({ isSuccess: true }))

            await useSystemUsersStore.getState().fetchUsers()
            toast.dismiss()
            set({ loading: false, isSuccess: false })
            toast.success('System user Updated successfully!', {
                autoClose: 3000,
            })
        } catch (error) {
            set({ error, loading: false })
        }
    },
    fetchUserByEmail: async (email) => {
        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.query({
                query: GET_USER_ID_BY_EMAIL,
                variables: { email },
            })
            const user = data?.usersPermissionsUsers?.data?.map(sanitizeObject)
            set({ user: user, loading: false })
            return user
        } catch (error) {
            set({ error, loading: false })
        }
    },
    fetchRoleId: async (role) => {
        set({ loading: true, error: null })

        try {
            const { data } = await apolloClient.query({
                query: GET_ROLES_ID,
                variables: {
                    filters: {
                        name: { containsi: role },
                    },
                },
            })
            if (data.usersPermissionsRoles.data.length > 0) {
                const roleId = data.usersPermissionsRoles.data[0].id
                set({ roleId: roleId, loading: false })
                return roleId
            } else {
                throw new Error('No matching role found')
            }
        } catch (error) {
            set({ error, loading: false })
            console.error('Error fetching partner role ID:', error)
        }
    },
}))

export default useSystemUsersStore
