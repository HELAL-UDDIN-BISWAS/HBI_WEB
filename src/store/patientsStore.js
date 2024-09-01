import { sanitizeObject } from "@/utils/sanitizer";
import {
  UPDATE_PATIENT,
  UPDATE_PATIENT_USER,
} from "@/graphql/mutations/patient";
import {
  GET_ALL_PATIENTS,
  GET_PATIENTBYID,
  GET_PATIENT_APPOINTMENT_HISTORY,
} from "@/graphql/queries/patients";
import apolloClient from "@/lib/apolloClient";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePatientStore = create((set) => ({
  patients: [],
  patient: null,
  updatedPatient: null,
  appointmentHistory: [],
  nationalities: [],
  loading: false,
  error: null,

  //============fetch all patient user datas with filter
  fetchPatients: async (searchTarm) => {
    // console.log("searchTarm", searchTarm);
    set({ loading: true, error: null });
    try {
      const filters = {
        role: {
          name: {
            containsi: "Patient",
          },
        },
      };

      if (searchTarm) {
        filters.profile = {
          name: {
            containsi: searchTarm,
          },
        };
      }

      const { data } = await apolloClient.query({
        query: GET_ALL_PATIENTS,
        variables: { filters },
      });
      const patientData = data?.usersPermissionsUsers?.data;
      set({ loading: false, patients: patientData });
    } catch (err) {
      set({ loading: false, error: err });
    }
  },

  //============ fetch single patient user data
  fetchPatientById: async (id) => {
    set({ loading: true, error: null });

    try {
      const { data } = await apolloClient.query({
        query: GET_PATIENTBYID,
        variables: { id },
      });

      const singlePatientData = data?.usersPermissionsUser?.data;
      console.log(singlePatientData);
      set({ loading: false, patient: singlePatientData });
    } catch (err) {
      set({ loading: false, error: err });
    }
  },
  //================update single patient user info and profile datas
  updatePatientById: async (id, profileInput, userInput, userId) => {
    set({ loading: true, error: false });
    try {
      const { data: updateUser } = await apolloClient.mutate({
        mutation: UPDATE_PATIENT_USER,
        variables: { id: userId, email: userInput.email },
      });

      if (updateUser) {
        const { data: updateProfile } = await apolloClient.mutate({
          mutation: UPDATE_PATIENT,
          variables: { id: id, input: profileInput },
        });
        console.log(updateProfile);
        const updatePatientData = updateProfile;
        set({ loading: false, updatedPatient: updatePatientData });
        if (updateProfile) {
          toast.success("Patient update Successfuly!");
        }
      }
    } catch (err) {
      toast.error("Patient update fail.");
      set({ loading: false, error: err });
    }
  },
  
  //================fetch single patient's appointment histiry
  fetchAppointmentHistory: async (id) => {
    set({ loading: true, error: false });
    try {
      const { data } = await apolloClient.query({
        query: GET_PATIENT_APPOINTMENT_HISTORY,
        variables: { id },
      });
      const appointments =
        data?.usersPermissionsUser?.data?.attributes?.appointments?.data;
      set({ loading: false, appointmentHistory: appointments });
    } catch (err) {
      set({ loading: false, error: err });
    }
  },
  
}));

export default usePatientStore;


