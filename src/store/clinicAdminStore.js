import {
    CREATE_CLINIC,
    CREATE_CLINIC_ADMIN,
    CREATE_CLINIC_ADMIN_PROFILE,
    UPDATE_CLINIC,
    UPDATE_CLINIC_ADMIN_PROFILE,
    UPDATE_CLINIC_USER,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_STATUS
} from '@/graphql/mutations/clinicadmin';
import { ALL_CLINIC_ADMIN, GET_CLINICADMIN_BYID } from '@/graphql/queries/clinic-admin';
import apolloClient from '@/lib/apolloClient';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useClinicAdminStore = create((set) => ({
    clinicAdmins: [],
    updatedClinicAdmin: null,
    clinicAdmin: null,
    loading: false,
    error: null,

    fetchClinicAdmin: async (params = {}) => {
        const { email = "", status = "" } = params;
        set({ loading: true, error: null });

        const filters = {
            email: { containsi: email },
            ...(status && { status: { eq: status } }),
            role: { name: { eq: 'Clinic Admin' } },

        };

        try {
            const { data } = await apolloClient.query({
                query: ALL_CLINIC_ADMIN,
                fetchPolicy: 'network-only',
                variables: { filters },
            });
            const clinicAdminData = data?.usersPermissionsUsers?.data;
            set({ loading: false, clinicAdmins: clinicAdminData });

        } catch (err) {
            set({ loading: false, error: err });
        }
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=--= SHOW ID DATA CLINIC ADMIN =-=-=-=-=-=-=-=-=-=-=-=-=-=--=

    fetchClinicAdminById: async (id) => {
        set({ loading: true, error: null });

        try {
            const { data } = await apolloClient.query({
                query: GET_CLINICADMIN_BYID,
                variables: { id },
            });

            const clinicAdminData = data?.usersPermissionsUser?.data;
            set({ loading: false, clinicAdmin: clinicAdminData });
        } catch (err) {
            set({ loading: false, error: err });
        }
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=--= CREATE CLINIC ADMIN =-=-=-=-=-=-=-=-=-=-=-=-=-=--=


    createClinicAdmin: async (profileInput, clinicInput, userInput) => {
        set({ loading: true, error: null });

        try {
            // First, create the profile
            const { data: profileData } = await apolloClient.mutate({
                mutation: CREATE_CLINIC_ADMIN_PROFILE,
                variables: { profile: profileInput },
            });

            // Check for profile creation was successful
            if (!profileData?.createProfile?.data?.id) {
                throw new Error('Profile creation failed: No ID returned');
            }

            // Extract the profile ID from the response
            const profileId = profileData?.createProfile?.data?.id;

            // Now, create the user with the profile ID
            const { data: clinicData } = await apolloClient.mutate({
                mutation: CREATE_CLINIC,
                variables: { data: clinicInput },
            });

            // Check if user creation was successful
            if (!clinicData?.createClinic?.data?.id) {
                throw new Error('Profile creation failed: No ID returned');
            }

            // Extract the profile ID from the response
            const clinicId = clinicData?.createClinic?.data?.id;

            // Introduce an error by omitting the required 'name' variable
            const { data } = await apolloClient.mutate({
                mutation: CREATE_CLINIC_ADMIN,
                variables: { ...userInput, profileId, clinicId }, // Omitting the 'name' variable
            });
            console.log('User data:', data);
            

            // Check if user creation was successful
            if (!data?.createUsersPermissionsUser?.data) {
                throw new Error('User creation failed');
            }

            // Update the state with the new user data
            set((state) => ({
                loading: false,
                clinicAdmins: [
                    ...state.clinicAdmins,
                    data.createUsersPermissionsUser.data,
                ],
            }));

            // Refetch users after creating a new user
            await useClinicAdminStore.getState().fetchClinicAdmin();
            toast.dismiss();
            toast.success('clinic Admin created successfully!', { autoClose: 3000 });
            return data.createUsersPermissionsUser.data

        } catch (err) {
            set({ loading: false, error: err });
            toast.dismiss();
            toast.error(`Error: ${err.message}`, { autoClose: 5000 });
        }
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=--= UPDATE CLINIC ADMIN =-=-=-=-=-=-=-=-=-=-=-=-=-=--=

    updateClinicAdmin: async (clinicId, userId, profileId, profileInput, clinicInput, userInput) => {
        console.log(userId, profileId, clinicId, profileInput, clinicInput, userInput);
        set({ loading: true });
        try {
            await apolloClient.mutate({
                mutation: UPDATE_CLINIC_ADMIN_PROFILE,
                variables: { id: profileId, input: profileInput },
            }) // Missing semicolon here

            const { data: updateClinic } = await apolloClient.mutate({
                mutation: UPDATE_CLINIC,
                variables: { id: clinicId, data: clinicInput },
            });
            console.log(updateClinic);

            const { data: updateUser } = await apolloClient.mutate({
                mutation: UPDATE_CLINIC_USER,
                variables: { id: userId, ...profileInput, ...userInput, clinic: clinicId, profile: profileId },
            });


            set((state) => ({
                clinicAdmins: state.clinicAdmins.map((user) =>
                    user.id === userId ? updateUser.updateUsersPermissionsUser.data : user
                ),
                loading: false,
            }));
            toast.success('Member updated successfully!');
        } catch (error) {
            toast.error(`Error: ${error.message}`, { autoClose: 5000 });
            set({ error, loading: false });
        }
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=--= UPDATE CLINIC STATUS =-=-=-=-=-=-=-=-=-=-=-=-=-=--=

    updateUserStatus: async (id, status) => {
        console.log(id, status)
        set({ loading: true, error: null });
        try {
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_USER_STATUS,
                variables: { id, status },
            });
            set((state) => ({
                clinicAdmins: state.clinicAdmins.map((member) =>
                    member.id === id
                        ? {
                            ...member,
                            attributes: {
                                ...member.attributes,
                                status:
                                    data.updateUsersPermissionsUser.data.attributes.status,
                            },
                        }
                        : member
                ),
                loading: false,

            }));
            if (status === "Inactive") {
                toast.success('Account Suspend Successfully!', { autoClose: 3000 });
            } else {
                toast.success('Account Active Successfully!', { autoClose: 3000 });
            }

        } catch (error) {
            set({ error, loading: false });
        }
    },

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=--= UPDATE_USER_PASSWORD =-=-=-=-=-=-=-=-=-=-=-=-=-=--=

    updateUserPassword: async (id, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_USER_PASSWORD,
                variables: { id, password },
            });

            set((state) => ({
                clinicAdmins: state.clinicAdmins.map((password) =>
                    password.id === id
                        ? {
                            ...password,
                            attributes: {
                                ...password.attributes,
                                status:
                                    data.updateUsersPermissionsUser.data.attributes.password,
                            },
                        }
                        : password
                ),
                loading: false,

            }));
            if (data) {
                toast.success(`Reset Password successfully!`, { autoClose: 3000 });
            }
            const clinicAdminPasswordData = data?.updateUsersPermissionsUser?.data;
            set({ loading: false, clinicAdmin: clinicAdminPasswordData });
            return data?.updateUsersPermissionsUser?.data;
        } catch (error) {
            toast.error(`Reset Password ${error.message}`, { autoClose: 3000 });

            set({ error, loading: false });
        }
    },

}))

export default useClinicAdminStore