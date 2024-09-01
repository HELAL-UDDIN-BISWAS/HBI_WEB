import { create } from 'zustand'
import { sanitizeObject } from '@/utils/sanitizer'
import { DELETE_SPECIALIZATION } from '../graphql/mutations/specialization'
import apolloClient from '../lib/apolloClient'
import { GET_ALL_PARTNERS, GET_PARTNER_BY_ID } from '@/graphql/queries/partner'
import { toast } from 'react-toastify'
import {
    CREATE_PARTNER,
    CREATE_PROFILE,
    GET_ALL_ROLES,
    UPDATE_PARTNER,
    UPDATE_PARTNER_STATUS,
    UPDATE_PROFILE,
} from '@/graphql/mutations/partner'

const usePartnerStore = create((set) => ({
    partnerRoleId: null,
    partners: [],
    partner: null,
    paginationData: null,
    loading: false,
    error: '',
    isSuccess: false,

    fetchPartners: async (params = {}) => {
        const { name = '' } = params

        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.query({
                query: GET_ALL_PARTNERS,
                fetchPolicy: 'network-only',
                variables: {
                    filters: {
                        blocked: {
                            eq: false,
                        },
                        profile: {
                            name: {
                                containsi: name,
                            },
                        },
                        role: {
                            name: {
                                eq: 'Partner',
                            },
                        },
                    },
                },
            })
            const result =
                data?.usersPermissionsUsers?.data?.map(sanitizeObject)

            set({ partners: result || [], loading: false })
        } catch (error) {
            set({ error, loading: false })
        }
    },

    fetchPartnersById: async ({ id }) => {
        set({ loading: true, error: null })

        try {
            const { data } = await apolloClient.query({
                query: GET_PARTNER_BY_ID,
                variables: { id },
            })

            const result = sanitizeObject(data?.usersPermissionsUser?.data)

            set({ partner: result, loading: false })
        } catch (error) {
            set({ error, loading: false })
        }
    },

    createPartner: async (profileInput, userInput) => {
        set({ loading: true, error: null, isSuccess: false })
        toast.info('Loading...', { autoClose: false })

        try {
            const { data: profileData } = await apolloClient.mutate({
                mutation: CREATE_PROFILE,
                variables: { profile: profileInput },
            })
            const profileId = profileData.createProfile.data.id

            const { data } = await apolloClient.mutate({
                mutation: CREATE_PARTNER,
                variables: { ...userInput, profileId },
            })

            const result =
                data?.usersPermissionsUsers?.data?.map(sanitizeObject)

            set((state) => ({
                partners: [...state.partners, result],
                isSuccess: true,
            }))

            // Refetch members after creating a new member
            await usePartnerStore.getState().fetchPartners()
            toast.dismiss()
            set({ loading: false, isSuccess: false })
            toast.success('Partner created successfully!', { autoClose: 3000 })
        } catch (error) {
            set({ error, loading: false, isSuccess: false })
            toast.dismiss()
            toast.error(`Error: ${error.message}`, { autoClose: 5000 })
        }
    },

    updatePartner: async (partnerId, profileId, profileInput, userInput) => {
        set({ loading: true, error: null, isSuccess: false })
        toast.info('Updating...', { autoClose: false })

        try {
            await apolloClient.mutate({
                mutation: UPDATE_PROFILE,
                variables: { id: profileId, input: profileInput },
            })

            const { data } = await apolloClient.mutate({
                mutation: UPDATE_PARTNER,
                variables: {
                    id: partnerId,
                    email: userInput?.email,
                    profile: profileId,
                },
            })

            set((state) => ({
                partners: state.partners.map((partner) =>
                    partner.id === partnerId
                        ? data.updateUsersPermissionsUser.data
                        : partner
                ),
                isSuccess: true,
            }))

            // Refetch members after creating a new member
            await usePartnerStore.getState().fetchPartners()
            toast.dismiss()
            set({ loading: false, isSuccess: false })
            toast.success('Partner Updated successfully!', { autoClose: 3000 })
        } catch (error) {
            toast.dismiss()
            set({ error, loading: false })
            toast.error(`Error: ${error.message}`)
        }
    },

    updatePartnerStatus: async (partnerId, isNotified, status) => {
        set({ loading: true, error: null, isSuccess: false })
        toast.info('Updating...', { autoClose: false })

        try {
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_PARTNER_STATUS,
                variables: { id: partnerId, isNotified, status },
            })

            set((state) => ({ isSuccess: true }))

            // Refetch members after creating a new member
            await usePartnerStore.getState().fetchPartners()
            toast.dismiss()
            set({ loading: false, isSuccess: false })
            toast.success('Partner Updated successfully!', { autoClose: 3000 })
        } catch (error) {
            toast.dismiss()
            set({ error, loading: false })
            toast.error(`Error: ${error.message}`)
        }
    },

    deleteSpecialization: async (id) => {
        set({ loading: true, error: null })
        try {
            await apolloClient.mutate({
                mutation: DELETE_SPECIALIZATION,
                variables: { id },
            })
            set((state) => ({
                specializations: state.specializations.filter(
                    (specialization) => specialization.id !== id
                ),
                loading: false,
            }))
        } catch (error) {
            set({ error, loading: false })
        }
    },

    fetchPartnerRoleId: async () => {
        set({ loading: true, error: null })

        try {
            const { data } = await apolloClient.query({
                query: GET_ALL_ROLES,
                variables: {
                    filters: {
                        name: { containsi: 'partner' },
                    },
                },
            })
            if (data.usersPermissionsRoles.data.length > 0) {
                const roleId = data.usersPermissionsRoles.data[0].id
                set({ partnerRoleId: roleId, loading: false })
                console.log('Partner Role ID:', roleId)
            } else {
                throw new Error('No matching role found')
            }
        } catch (error) {
            set({ error, loading: false })
            console.error('Error fetching partner role ID:', error)
        }
    },
}))

export default usePartnerStore
