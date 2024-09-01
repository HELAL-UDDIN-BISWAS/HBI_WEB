import { create } from 'zustand';
import { sanitizeObject } from '@/utils/sanitizer';

import {
	GET_ALL_SPECIALIZATIONS,
	GET_ALL_SPECIALIZATIONS_TITLE,
	GET_SPECIALIZATION_BY_ID,
	GET_SPECIALIZATION__BY_PAGINATION,
} from '../graphql/queries/specialization';

import {
	CREATE_SPECIALIZATION,
	UPDATE_SPECIALIZATION,
	DELETE_SPECIALIZATION,
	SPECIALIZATION_INPUT,
	CREATE_SPECIALIZATION_WITH_IMAGE,
	UPDATE_SPECIALIZATION_WITH_IMAGE,
} from '../graphql/mutations/specialization';
import apolloClient from '../lib/apolloClient';

const useSpecializationStore = create((set) => ({
	specializations: [],
	specialization: null,
	specializationTitle: [],
	paginationData: null,
	loading: false,
	error: null,


	fetchSpecializations: async () => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.query({
				query: GET_ALL_SPECIALIZATIONS,
				fetchPolicy: 'network-only',
			});
			const result = data?.specializations?.data?.map(sanitizeObject);

			set({ specializations: result || [], loading: false });
		} catch (error) {
			set({ error, loading: false });
		}
	},

	fetchSpecializationById: async (id) => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.query({
				query: GET_SPECIALIZATION_BY_ID,
				variables: { id },
			});
			const result = sanitizeObject(data?.specialization?.data);

			set({ specialization: result, loading: false });
		} catch (error) {
			set({ error, loading: false });
		}
	},

	fetchSpecializationsByPagination: async (page, limit) => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.query({
				query: GET_SPECIALIZATION__BY_PAGINATION,
				variables: { page, limit },
			});
			const result = data?.specializations?.data?.map(sanitizeObject);

			set({ paginationData: result, loading: false });
		} catch (error) {
			set({ error, loading: false });
		}
	},

	createSpecialization: async (newSpecialization) => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.mutate({
				mutation: CREATE_SPECIALIZATION_WITH_IMAGE,
				variables: { data: newSpecialization },
			});
			set((state) => ({
				specializations: [
					...state.specializations,
					sanitizeObject(data?.createSpecialization?.data),
				],
				loading: false,
			}));
		} catch (error) {
			set({ error, loading: false });
		}
	},

	updateSpecialization: async (id, updatedSpecialization) => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.mutate({
				mutation: UPDATE_SPECIALIZATION_WITH_IMAGE,
				variables: { id, data: updatedSpecialization },
			});
			set((state) => ({
				specializations: state.specializations.map((specialization) =>
					specialization.id === id
						? sanitizeObject(data?.updateSpecialization?.data)
						: specialization
				),
				loading: false,
			}));
		} catch (error) {
			set({ error, loading: false });
		}
	},

	deleteSpecialization: async (id) => {
		set({ loading: true, error: null });
		try {
			await apolloClient.mutate({
				mutation: DELETE_SPECIALIZATION,
				variables: { id },
			});
			set((state) => ({
				specializations: state.specializations.filter(
					(specialization) => specialization.id !== id
				),
				loading: false,
			}));
		} catch (error) {
			set({ error, loading: false });
		}
	},
fetchSpecializationTitle: async () => {
  set({ loading: true, error: null });
  try {
    const { data } = await apolloClient.mutate({
      mutation: GET_ALL_SPECIALIZATIONS_TITLE
    });
    const titles = data?.specializations?.data?.map(sanitizeObject);
    set({ specializationTitle: titles, loading: false });
  } catch (error) {
    set({ error, loading: false });
  }
}

}));

export default useSpecializationStore;
