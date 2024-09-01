import { CREATE_CLINIC, UPDATE_CLINIC } from "@/graphql/mutations/clinic";
import { GET_ALL_CLINICS, GET_CLINICBYID } from "@/graphql/queries/clinic";
import apolloClient from "@/lib/apolloClient";
import { reach } from "yup";
import { create } from "zustand";




const useClinicStore = create((set) => ({
    clinics: [],
    clinic: null,
	updatedClinic: null,
	createdClinic:null,
    loading: false,
    error: null,

    fetchClinics: async () => {
		set({ loading: true, error: null });
		try {
			const { data } = await apolloClient.query({
				query: GET_ALL_CLINICS,
				fetchPolicy: 'network-only',
			});
			const clinicData = data?.clinics?.data;
			set({ loading: false, clinics: clinicData });
		} catch (err) {
			set({ loading: false, error: err });
		}
	},

    fetchClinicId: async (id) => {
		set({ loading: true, error: null });

		try {
			const { data } = await apolloClient.query({
				query: GET_CLINICBYID,
				variables: { id },
			});

			const singleClinicData = data?.clinic?.data;
			set({ loading: false, clinic: singleClinicData });
		} catch (err) {
			set({ loading: false, error: err });
		}
	},

	updateClinicById: async (id, clinicInput) => {
		set({ loading: true, error: false });
		console.log(id, clinicInput);
		try {
			const { data } = await apolloClient.mutate({
				
				mutation: UPDATE_CLINIC,
				variables: { id: id, data: clinicInput },
			});
			
			
			
			set({ loading: false, updatedClinic: data });
			return data;
		} catch (err) {
			set({ loading: false, error: err });
		}
	},

	createClinic: async (clinicInput) => {
		set({ loading: true, error: false });
		try {
		  const { data } = await apolloClient.mutate({
			mutation: CREATE_CLINIC,
			variables: { data: clinicInput },
		  });
		  
		  set({ loading: false, });
		  return data
		} catch (err) {
		  set({ loading: false, error: err });
		}
	  },
}));


export default useClinicStore;