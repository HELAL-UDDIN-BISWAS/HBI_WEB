import { gql } from '@apollo/client'

export const GET_ALL_APPOINTMENTS = gql`
    query getAllAppointments(
        $filters: AppointmentFiltersInput
        $page: Int
        $pageSize: Int
    ) {
        appointments(
            filters: $filters
            sort: ["updatedAt:desc"]
            pagination: { page: $page, pageSize: $pageSize }
        ) {
            meta {
                pagination {
                    page
                    pageSize
                    pageCount
                    total
                }
            }
            data {
                id
                attributes {
                    date
                    startTime
                    endTime
                    user {
                        data {
                            id
                            attributes {
                                username
                                email
                                profile {
                                    data {
                                        id
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                    doctor {
                        data {
                            id
                            attributes {
                                name
                                specializations {
                                    data {
                                        id
                                        attributes {
                                            title
                                            description
                                        }
                                    }
                                }
                                fees
                            }
                        }
                    }
                    bookingType
                    amount
                    status
                    paymentHistories {
                        data {
                            id
                            attributes {
                                user {
                                    data {
                                        id
                                        attributes {
                                            username
                                            email
                                        }
                                    }
                                }
                                status
                                appointment {
                                    data {
                                        id
                                        attributes {
                                            date
                                        }
                                    }
                                }
                                paymentMethod {
                                    data {
                                        id
                                        attributes {
                                            cardType
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_APPOINTMENT_BY_ID = gql`
    query getAppointmentById($id: ID) {
        appointment(id: $id) {
            data {
                id
                attributes {
                    date
                    startTime
                    endTime
                    bookingType
                    amount
                    status

                    doctor {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    user {
                        data {
                            id
                            attributes {
                                username
                                email
                            }
                        }
                    }
                }
            }
        }
    }
`
