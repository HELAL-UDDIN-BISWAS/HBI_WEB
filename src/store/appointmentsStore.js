import { sanitizeObject } from '@/utils/sanitizer'

import apolloClient from '../lib/apolloClient'
import { create } from 'zustand'
import {
    GET_ALL_APPOINTMENTS,
    GET_APPOINTMENT_BY_ID,
} from '@/graphql/queries/appointment'
import {
    CREATE_APPOINTMENT,
    UPDATE_APPOINTMENT,
    UPDATE_APPOINTMENT_STATUS,
} from '@/graphql/mutations/appointment'
import { toast } from 'react-toastify'

const useAppointmentStore = create((set, get) => ({
    appointment: null,
    appointments: [],
    paginationData: null,
    updatedAppointment: null,
    loading: false,
    error: null,
    filters: {
        specialization: '',
        doctorName: '',
        selectedTab: 'request',
    },

    fetchAppointments: async (page = 1, pageSize = 10, resetPage = false) => {
        set({ loading: true, error: null })

        const filters = getFilters()

        try {
            const { data } = await apolloClient.query({
                query: GET_ALL_APPOINTMENTS,
                variables: { page, pageSize, filters },
                fetchPolicy: 'network-only',
            })
            const result = data?.appointments?.data?.map(sanitizeObject)
            const paginationData = data?.appointments?.meta?.pagination

            set({ appointments: result || [], paginationData, loading: false })
        } catch (error) {
            set({ error, loading: false })
        }
    },
    setFilters: (newFilters) => {
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        }))
    },
    setSelectedTab: (tab) => {
        set((state) => ({
            filters: { ...state.filters, selectedTab: tab },
        }))
    },

    resetFilters: async () => {
        set({
            filters: {
                specialization: '',
                doctorName: '',
                selectedTab: 'request',
            },
        })
        await useAppointmentStore.getState().fetchAppointments()
    },

    fetchAppointmentById: async (id) => {
        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.query({
                query: GET_APPOINTMENT_BY_ID,
                variables: { id },
            })
            const result = sanitizeObject(data?.appointment?.data)
            set({ appointment: result, loading: false })
        } catch (error) {
            set({ error, loading: false })
        }
    },
    createAppointment: async (AppointmentInput) => {
        set({ error: null, loading: true })
        toast.info('Creating...', { autoClose: true })

        try {
            const { data: appointmentData } = await apolloClient.mutate({
                mutation: CREATE_APPOINTMENT,
                variables: {
                    data: AppointmentInput,
                },
            })

            await useAppointmentStore.getState().fetchAppointments()
            toast.dismiss()
            set({ appointment: appointmentData, loading: false })
            toast.success('Appointment created successfully!', {
                autoClose: 3000,
            })
        } catch (error) {
            set({ loading: false, error })
            toast.error(`Error: ${error.message}`)
        }
    },
    updateAppointment: async (id, AppointmentInput) => {
        set({ loading: true, error: null })
        toast.info('Updating...', { autoClose: true })

        try {
            const { data: appointmentData } = await apolloClient.mutate({
                mutation: UPDATE_APPOINTMENT,
                variables: { id: id, data: AppointmentInput },
            })
            set((state) => ({
                appointments: state.appointments?.map((appointment) =>
                    appointment.id === id ? appointmentData : appointment
                ),
                updatedAppointment: appointmentData,
                loading: false,
            }))
            toast.success('Appointment updated successfully!', {
                autoClose: 3000,
            })
        } catch (error) {
            console.log('error', error)
            set({ error, loading: false })
            toast.error(`Error: ${error.message}`)
        }
    },
    updateAppointmentStatus: async (id, status) => {
        set({ loading: true, error: null })
        try {
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_APPOINTMENT_STATUS,
                variables: { id, status },
            })
            const updatedAppointment = data.updateAppointment.data

            set((state) => ({
                appointments: state.appointments.map((appointment) =>
                    appointment.id === updatedAppointment.id
                        ? {
                              ...appointment,
                              attributes: {
                                  ...appointment.attributes,
                                  status: updatedAppointment.attributes.status,
                              },
                          }
                        : appointment
                ),
                loading: false,
                error: null,
            }))
            await get().fetchAppointments()
        } catch (error) {
            console.log('Error', error)
            set({ loading: false, error })
        }
    },
}))

export default useAppointmentStore

const getFilters = () => {
    const { specialization, doctorName, selectedTab } =
        useAppointmentStore.getState().filters
    let filters = {}
    if (specialization) {
        filters.doctor = {
            ...filters.doctor,
            specializations: {
                title: { eq: specialization },
            },
        }
    }
    if (doctorName) {
        filters.doctor = {
            ...filters.doctor,
            name: { containsi: doctorName },
        }
    }
    if (selectedTab === 'request') {
        filters.status = { eq: 'Pending' }
    } else if (selectedTab === 'upcoming') {
        filters.or = [
            { status: { eq: 'Upcoming' } },
            { status: { eq: 'Rescheduled' } },
        ]
    } else if (selectedTab === 'history') {
        filters.or = [
            { status: { eq: 'Completed' } },
            { status: { eq: 'Cancelled' } },
        ]
    }
    return filters
}
