import { gql } from '@apollo/client';

//==========update patient profile data
export const UPDATE_PATIENT = gql`
	mutation updatePatient($id: ID!, $input: ProfileInput!) {
		updateProfile(id: $id, data: $input) {
			data {
				id
				attributes {
					name
					dateOfBirth
					passport
					nationality
					phoneNo
					membershipID
					city
					country
					postalCode
					residentialAddressLine1
					residentialAddressLine2
					drugAllergy
					foodAllergy
					race
				}
			}
		}
	}
`;
//========== update patient user data
export const UPDATE_PATIENT_USER = gql`
	mutation updatePatentUser(
		$id: ID!
		$username: String
		$email: String
		$password: String
		$role: ID
		$profile: ID
	) {
		updateUsersPermissionsUser(
			id: $id
			data: {
				username: $username
				email: $email
				password: $password
				role: $role
				profile: $profile
			}
		) {
			data {
				id
				attributes {
					username
					email
					profile {
						data {
							id
						}
					}
				}
			}
		}
	}
`;
