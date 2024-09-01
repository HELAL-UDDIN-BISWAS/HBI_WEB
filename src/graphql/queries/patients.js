import { gql } from '@apollo/client'

//==========query all patient datas
export const GET_ALL_PATIENTS = gql`
    query getAllPatient($filters: UsersPermissionsUserFiltersInput) {
        usersPermissionsUsers(filters: $filters, pagination: { limit: 100 }) {
            data {
                id
                attributes {
                    email
                    profile {
                        data {
                            id
                            attributes {
                                name
                                dateOfBirth
                                passport
                                phoneNo
                                country
                            }
                        }
                    }
                }
            }
            meta {
                pagination {
                    page
                    pageCount
                    pageSize
                    total
                }
            }
        }
    }
`
//========== query patient data by id
export const GET_PATIENTBYID = gql`
    query getPatientById($id: ID!) {
        usersPermissionsUser(id: $id) {
            data {
                id
                attributes {
                    email
                    profile {
                        data {
                            id
                            attributes {
                                name
                                dateOfBirth
                                gender
                                city
                                postalCode
                                drugAllergy
                                foodAllergy
                                race
                                residentialAddressLine1
                                residentialAddressLine2
                                membershipID
                                nationality
                                passport
                                phoneNo
                                country
                            }
                        }
                    }
                }
            }
        }
    }
`
//==========query patient's appointment history
export const GET_PATIENT_APPOINTMENT_HISTORY = gql`
    query getAppointmentHistory($id: ID!) {
        usersPermissionsUser(id: $id) {
            data {
                id
                attributes {
                    appointments {
                        data {
                            id
                            attributes {
                                date
                                startTime
                                bookingType
                                doctor {
                                    data {
                                        id
                                        attributes {
                                            name
                                            fees
                                            specializations {
                                                data {
                                                    attributes {
                                                        title
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                status
                            }
                        }
                    }
                }
            }
        }
    }

    # query getAppointmentHistory($id: ID!) {
    # 	usersPermissionsUser(id: $id, pagination: { limit: 100 }) {
    # 		data {
    # 			id
    # 			attributes {
    # 				appointments {
    # 					data {
    # 						id
    # 						attributes {
    # 							date
    # 							startTime
    # 							doctor {
    # 								data {
    # 									id
    # 									attributes {
    # 										name
    # 										speciality
    # 										fees
    # 									}
    # 								}
    # 							}
    # 							status
    # 							consultationType
    # 						}
    # 					}
    # 				}
    # 			}
    # 		}
    # 		meta {
    # 			pagination {
    # 				page
    # 				pageCount
    # 				pageSize
    # 				total
    # 			}
    # 		}
    # 	}
    # }
`
