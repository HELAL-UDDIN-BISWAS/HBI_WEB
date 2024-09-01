import { create } from 'zustand'
import { sanitizeObject } from '@/utils/sanitizer'
import apolloClient from '../lib/apolloClient'
import { GET_ALL_TIERS, GET_TIER_BY_ID } from '@/graphql/queries/tier'
import { toast } from 'react-toastify'
import { CREATE_TIER, DELETE_TIER, UPDATE_TIER } from '@/graphql/mutations/tier'

const useTierStore = create((set) => ({
    tiers: [],
    tier: null,
    paginationData: null,
    loading: false,
    error: '',
    isSuccess: false,

    fetchTiers: async (params = {}) => {
        const { name = '' } = params

        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.query({
                query: GET_ALL_TIERS,
                fetchPolicy: 'network-only',
                variables: {
                    filters: {
                        name: {
                            containsi: name,
                        },
                    },
                },
            })

            const result = data?.tiers?.data?.map(sanitizeObject)

            set({ tiers: result || [], loading: false })
        } catch (error) {
            set({ error, loading: false })
        }
    },

    fetchTiersById: async ({ id }) => {
        set({ loading: true, error: null })

        try {
            const { data } = await apolloClient.query({
                query: GET_TIER_BY_ID,
                variables: { id },
            })

            const result = sanitizeObject(data?.tier?.data)

            set({ tier: result, loading: false })
        } catch (error) {
            set({ error, loading: false })
        }
    },

    createTier: async (tierInput) => {
        set({ loading: true, error: null, isSuccess: false })
        toast.info('Loading...', { autoClose: false })
        try {
            const { data } = await apolloClient.mutate({
                mutation: CREATE_TIER,
                variables: {
                    data: tierInput,
                },
            })

            const result =
                data?.usersPermissionsUsers?.data?.map(sanitizeObject)

            set((state) => ({
                tiers: [...state.tiers, result],
                isSuccess: true,
            }))

            // Refetch members after creating a new member
            await useTierStore.getState().fetchTiers()
            toast.dismiss()
            set({ loading: false, isSuccess: false })
            toast.success('Tier created successfully!', { autoClose: 3000 })
        } catch (error) {
            set({ error, loading: false, isSuccess: false })
            toast.dismiss()
            toast.error(`Error: ${error.message}`, { autoClose: 5000 })
        }
    },

    updateTier: async (id, tierInput) => {
        set({ loading: true, error: null, isSuccess: false })
        toast.info('Updating...', { autoClose: false })

        try {
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_TIER,
                variables: { id, data: tierInput },
            })

            const result = sanitizeObject(data?.tier?.data)

            set((state) => ({
                tiers: state.tiers.map((tier) =>
                    tier.id === id ? result : tier
                ),
                isSuccess: true,
            }))

            // Refetch members after creating a new member
            await useTierStore.getState().fetchTiers()
            toast.dismiss()
            set({ loading: false, isSuccess: false })
            toast.success('Tier Updated successfully!', { autoClose: 3000 })
        } catch (error) {
            toast.dismiss()
            set({ error, loading: false })
            toast.error(`Error: ${error.message}`)
        }
    },

    deleteTier: async (id) => {
        set({ loading: true, error: null })
        try {
            await apolloClient.mutate({
                mutation: DELETE_TIER,
                variables: { id },
            })

            set((state) => ({
                isSuccess: true,
            }))

            await useTierStore.getState().fetchTiers()
            toast.dismiss()
            set({ loading: false, isSuccess: false })
            toast.success('Tier deleted successfully!', { autoClose: 3000 })
        } catch (error) {
            set({ error, loading: false, isSuccess: false })
            toast.dismiss()
            toast.error(`Error: ${error.message}`, { autoClose: 5000 })
        }
    },
}))

export default useTierStore
