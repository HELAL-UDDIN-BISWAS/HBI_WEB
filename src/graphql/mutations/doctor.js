import { gql } from '@apollo/client';

export const CREATE_DOCTOR = gql`
	mutation createDoctor($data: DoctorInput!) {
		createDoctor(data: $data) {
			data {
				id
				attributes {
					name
					email
					phoneNo
					gender
					education
					speciality
					subSpecialty
					keyword
					affiliateHospital
					professionalProfile
					specializations {
						data {
							id
						}
					}
					profilePicture {
						data {
							id
						}
					}
					clinic {
						data {
							id
						}
					}
				}
			}
		}
	}
`;

export const UPDATE_DOCTOR = gql`
	mutation updateDoctor($id: ID!, $data: DoctorInput!) {
		updateDoctor(id: $id, data: $data) {
			data {
				id
				attributes {
					name
					specializations {
						data {
							id
						}
					}
					subSpecialty
					about
					address
					education
					languageSpoken
					currencyType
					fees
					appointments {
						data {
							id
						}
					}
					documentShareTo {
						data {
							id
						}
					}
					profilePicture {
						data {
							id
						}
					}
					medicalConditionsTreated
					clinic {
						data {
							id
						}
					}
					status
					professionalProfile
					speciality
					keyword
				}
			}
		}
	}
`;

export const DELETE_DOCTOR = gql`
	mutation deleteDoctor($id: ID!) {
		deleteDoctor(id: $id) {
			data {
				id
			}
		}
	}
`;

export const UPLOAD_FILE = gql`
	mutation Upload($file: Upload!) {
		upload(file: $file) {
			data {
				id
				attributes {
					url
				}
			}
		}
	}
`;
