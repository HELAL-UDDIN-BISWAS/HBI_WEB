import { gql } from '@apollo/client';

export const GET_ALL_DOCTORS = gql`
	query getAllDoctors(
		$filters: DoctorFiltersInput
		$page: Int
		$pageSize: Int
	) {
		doctors(
			filters: $filters
			sort: ["updatedAt:desc"]
			pagination: { page: $page, pageSize: $pageSize, limit: 50 }
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
					name
					email
					speciality
					status
					clinic {
						data {
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_DOCTORBYID = gql`
	query getDoctorById($id: ID!) {
		doctor(id: $id) {
			data {
				id
				attributes {
					name
					email
					gender
					phoneNo
					education
					keyword
					languageSpoken
					subSpecialty
					affiliateHospital
					professionalProfile
					speciality
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
	}
`;

export const GET_ALL_SPECIALIZATIONS = gql`
	query Specializations {
		specializations {
			data {
				id
				attributes {
					title
				}
			}
		}
	}
`;

export const GET_ALL_CLINICS = gql`
	query Clinics {
		clinics {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;






export const GET_DOCTOR_NAME_SPECIALIZATION = gql`
	query getDoctorName($filters: DoctorFiltersInput) {
		doctors(filters: $filters) {
			data {
				id
				attributes {
					name
					specializations {
             data {
              id 
              attributes {
                title
              }
            }
          }
					
				}
			}
		}
	}
`

