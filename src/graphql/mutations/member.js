import { gql } from '@apollo/client';

export const CREATE_PROFILE = gql`
	mutation createProfile($profile: ProfileInput!) {
		createProfile(data: $profile) {
			data {
				id
			}
		}
	}
`;
/*
DEMO  Data
{
    "profile": {
      "dateOfBirth": "1990-01-01",
      "membershipID": "M123456",
      "passport": "P12345678",
      "name": "John Doe",
      "country": "USA",
      "phoneNo": "+1234567890",
      "registeredDate": "2023-06-30T12:34:56Z",
      "city": "New York",
      "postalCode": "10001",
      "drugAllergy": "None",
      "foodAllergy": "Peanuts",
      "residentialAddressLine1": "123 Main St",
      "residentialAddressLine2": "Apt 4B"
    }
  }

*/

export const CREATE_MEMBER = gql`
	mutation createMember(
		$username: String!
		$email: String!
		$password: String!
		$role: ID!
		$profileId: ID!
	) {
		createUsersPermissionsUser(
			data: {
				username: $username
				email: $email
				password: $password
				role: $role
				profile: $profileId
			}
		) {
			data {
				id
				attributes {
					username
					email
					role {
						data {
							id
							attributes {
								name
							}
						}
					}
					profile {
						data {
							id
							attributes {
								dateOfBirth
								membershipID
								passport
								name
								country
								phoneNo
								registeredDate
								city
								postalCode
								drugAllergy
								foodAllergy
								residentialAddressLine1
								residentialAddressLine2
							}
						}
					}
				}
			}
		}
	}
`;

export const UPDATE_MEMBER_STATUS = gql`
	mutation updateMemberStatus(
		$id: ID!
		$status: ENUM_USERSPERMISSIONSUSER_STATUS!
	) {
		updateUsersPermissionsUser(id: $id, data: { status: $status }) {
			data {
				id
				attributes {
					status
				}
			}
		}
	}
`;

/* demo data 

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "role": "4",
  "profileId": "profile_id_from_previous_step",
  "password": "11234242"
}


*/

export const UPDATE_PROFILE = gql`
	mutation updateProfile($id: ID!, $input: ProfileInput!) {
		updateProfile(id: $id, data: $input) {
			data {
				id
				attributes {
					dateOfBirth
					membershipID
					passport
					name
					country
					phoneNo
					registeredDate
					city
					postalCode
					drugAllergy
					foodAllergy
					residentialAddressLine1
					residentialAddressLine2
				}
			}
		}
	}
`;
/* 
DEMO DATA 


{
  "id": "12",
  "input": {
    "dateOfBirth": "1990-01-01",
    "membershipID": "M123456",
    "passport": "P12345678",
    "name": "John1212 Doe",
    "country": "USA",
    "phoneNo": "+1234567890",
    "registeredDate": "2023-06-30T12:34:56Z",
    "city": "New York",
    "postalCode": "10001",
    "drugAllergy": "None",
    "foodAllergy": "Peanuts",
    "residentialAddressLine1": "123 Main St",
    "residentialAddressLine2": "Apt 4B"
  }
}

*/

export const UPDATE_MEMBER = gql`
	mutation updateMember(
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
					role {
						data {
							id
							attributes {
								name
							}
						}
					}
					profile {
						data {
							id
							attributes {
								dateOfBirth
								membershipID
								passport
								name
								country
								phoneNo
								registeredDate
								city
								postalCode
								drugAllergy
								foodAllergy
								residentialAddressLine1
								residentialAddressLine2
							}
						}
					}
				}
			}
		}
	}
`;

/* 
demo data 
{
  "id": "11",
  "username": "Johan secandar",
  "email": "newEmail@example.com",
  "password": "12345678",
  "role": "3",
  "profile": "11"
}
*/
