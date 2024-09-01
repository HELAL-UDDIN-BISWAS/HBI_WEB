import { sanitizeObject } from '@/utils/sanitizer';
import apolloClient from '../lib/apolloClient';
import { create } from 'zustand';
import { GET_ALL_POINTS } from '@/graphql/queries/point';
import { CREATE_REWARD_POINT, DELETE_REWARD_POINT, UPDATE_REWARD_POINT } from '@/graphql/mutations/rewordPoint';


const usePointStore = create((set, get) => ({
    points: [],
    loading: false,
    error: null,

    getAllPoints: async () => {
        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.query({
                query:
                    GET_ALL_POINTS,
                fetchPolicy: 'network-only',
            })
            const result = data?.points?.data?.map(sanitizeObject)
            set({ loading: false, points: result });
        } catch (error) {
            set({ error, loading: false })
        }
    },

    createPoint: async (pointData) => {
        set({ loading: true, error: null });
        try {
            const { data } = await apolloClient.mutate({
                mutation: CREATE_REWARD_POINT,
                fetchPolicy: 'network-only',
                variables: {
                    data: pointData,   
                },
            });
            await get().getAllPoints();
            set({ loading: false, error: null });
        } catch (error) {
            console.log(error, "catch error");
            set({ loading: false, error: error });
        }
    },

    updatePoint: async (pointData) => {
        set({ loading: true, error: null });

        try {
            const response = await apolloClient.mutate({
                mutation: UPDATE_REWARD_POINT,
                variables: { id: pointData.id, data: pointData.data },
            });
            await get().getAllPoints();
            set({ loading: false, data: response.data.updatePoint.data });
        } catch (err) {
            console.error('Error updating point:', err);
            set({ loading: false, error: err });
        }
    },

    deletePoint: async (id) => {
        set({ loading: true, error: null });
        try {
            await apolloClient.mutate({
                mutation: DELETE_REWARD_POINT,
                variables: { id },
            });
            await get().getAllPoints(); 
            set({ loading: false, error: null });
        } catch (err) {
            console.error('Error deleting point:', err);
            set({ loading: false, error: err });
        }
    },
}))

export default usePointStore;
