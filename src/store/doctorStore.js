import { UPDATE_DOCTOR } from '@/graphql/mutations/doctor';
import { GET_ALL_DOCTORS, GET_DOCTORBYID, GET_DOCTOR_BY_NAME, GET_DOCTOR_NAME_SPECIALIZATION } from '@/graphql/queries/doctor';
import apolloClient from '@/lib/apolloClient';
import { create } from 'zustand';
import { CREATE_DOCTOR } from '@/graphql/mutations/doctor';
import { GET_PATIENTBYID } from '@/graphql/queries/patients';
import { sanitizeObject } from '@/utils/sanitizer';
import { eq } from 'lodash';

export const useDoctorStore = create((set, get) => ({
	doctors: [],
	doctor: null,
	loading: false,
	error: null,
	doctorId: null,
	getDoctorData: [],
	doctorsNameSpecialization: [],
	selectedDoctor: null,
	selectedSpecialization: null,
	filters: {
		specialization: '',
		doctorName: '',
	},


	createDoctor: async (doctorData) => {
		set({ loading: true, error: null });
		console.log('data:', doctorData);
		try {
			const { data } = apolloClient.mutate({
				mutation: CREATE_DOCTOR,
				variables: {
					data: doctorData,
				},
			});
			set({ loading: false, error: null });
			console.log(data);
		} catch (error) {
			console.log(error);
			set({ loading: false, error: error });
		}
	},


	//========== get all doctors with filter and short data
	fetchAllDoctor: async ({ searchText = '', filterStatus = '' } = {}) => {
		set({ loading: true, error: null });
		try {
			const filters = {};

		if (searchText) {
			filters.email = { containsi: searchText };
		
		}
		if (filterStatus) {
			filters.status = { eq: filterStatus };
		
		}
			const { data } = await apolloClient.query({
				query: GET_ALL_DOCTORS,
				fetchPolicy: "network-only",
				variables: {filters},
			});
	
			const doctorsData = data?.doctors?.data?.map(sanitizeObject)
			set({ loading: false, doctors: doctorsData })
		} catch (err) {
			console.log(err);
			set({ loadong: false, error: err });
		}
	},

	//========== get single doctor data
	fetchSingleDoctor: async (id) => {
		console.log(id)
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.query({
				query: GET_DOCTORBYID,
				variables: { id: "1" },
			});
			const doctorData = sanitizeObject(data?.doctor?.data)
			set({ loading: false, doctor: doctorData })
		} catch (err) {
			console.log(err)
			set({ loading: false, error: err });
		}
	},

	//========== edit doctor data by id
	editDoctorData: async () => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.mutate({
				mutation: UPDATE_DOCTOR,
				variables: {}
			});
		} catch (err) {
			set({ loading: false, error: err });
		}
	},
	fetchDoctorsNameSpecialization: async () => {
		set({ loading: true, error: null });
		const filters = getFilters()

		try {
			const { data } = await apolloClient.query({
				query: GET_DOCTOR_NAME_SPECIALIZATION,
				variables: { filters },
			});
			const doctorsData = data?.doctors?.data?.map(sanitizeObject)
			set({ loading: false, doctorsNameSpecialization: doctorsData })
		} catch (err) {
			set({ loading: false, error: err });
		}
	},
	setFilters: (newFilters) => {
		set((state) => ({
			filters: { ...state.filters, ...newFilters }
		}))
	}


}));

export default useDoctorStore;


const getFilters = () => {
	const {
		doctorName,
		specialization
	} = useDoctorStore.getState().filters;


	let filters = {};
	if (specialization) {
		filters.specializations = {
			title: { eq: specialization },
		};
	}
	if (doctorName) {
		filters.name = { eq: doctorName }
	}
	return filters;
};
