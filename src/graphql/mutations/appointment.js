import { gql } from '@apollo/client'

export const CREATE_APPOINTMENT = gql`
    mutation createAppointment($data: AppointmentInput!) {
        createAppointment(data: $data) {
            data {
                attributes {
                    date
                    bookingType
                    startTime
                    endTime
                    doctor {
                        data {
                            id
                        }
                    }
                    user {
                        data {
                            id
                        }
                    }
                    amount
                    status
                    earliestAvailDate
                    isConfirmed
                }
            }
        }
    }
`

export const UPDATE_APPOINTMENT = gql`
    mutation updateAppointment($id: ID!, $data: AppointmentInput!) {
        updateAppointment(id: $id, data: $data) {
            data {
                id
                attributes {
                    date
                    startTime
                    endTime
                    bookingType
                    amount
                    status
                }
            }
        }
    }
`

export const UPDATE_APPOINTMENT_STATUS = gql`
    mutation UpdateAppointmentStatus(
        $id: ID!
        $status: ENUM_APPOINTMENT_STATUS!
    ) {
        updateAppointment(id: $id, data: { status: $status }) {
            data {
                id
                attributes {
                    status
                }
            }
        }
    }
`
