import { gql } from "@apollo/client";

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

export const CREATE_PARTNER = gql`
	mutation createPartner(
		$isNotified: Boolean!
		$email: String!
		$status: ENUM_USERSPERMISSIONSUSER_STATUS
		$role: ID!
		$profileId: ID!
		$username: String!
		$password: String!
	) {
		createUsersPermissionsUser(
			data: {
				email: $email
				isNotified: $isNotified
				role: $role
				profile: $profileId
				username: $username
				password: $password
				status: $status
			}
		) {
			data {
				id
				attributes {
					email
					isNotified
					status
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
								passport
								name
								phoneNo
								companyName
								country
								residentialAddressLine1
								residentialAddressLine2
								jobTitle
								UEN
							}
						}
					}
				}
			}
		}
	}
`;

export const UPDATE_PROFILE = gql`
	mutation updateProfile($id: ID!, $input: ProfileInput!) {
		updateProfile(id: $id, data: $input) {
			data {
				id
				attributes {
					passport
					name
					country
					phoneNo
					city
					postalCode
					residentialAddressLine1
					residentialAddressLine2
					companyName
					jobTitle
					UEN
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

export const UPDATE_PARTNER = gql`
	mutation updatePartner(
		$id: ID!
		$email: String
		$profile: ID
		$isNotified: Boolean
		$blocked: Boolean
	) {
		updateUsersPermissionsUser(
			id: $id
			data: {
				email: $email
				profile: $profile
				isNotified: $isNotified
				blocked: $blocked
			}
		) {
			data {
				id
				attributes {
					email
					profile {
						data {
							id
						}
					}
					isNotified
					blocked
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
  "id": "26",
  "isNotified": false,
  "blocked": true
}
*/

export const UPDATE_PARTNER_STATUS = gql`
	mutation updatePartner(
		$id: ID!
		$isNotified: Boolean
		$status: ENUM_USERSPERMISSIONSUSER_STATUS
	) {
		updateUsersPermissionsUser(
			id: $id
			data: { isNotified: $isNotified, status: $status }
		) {
			data {
				id
				attributes {
					email
					isNotified
					status
				}
			}
		}
	}
`;

/*
demo data
{
  "id": "26",
  "isNotified": false,
  "blocked": true
}
*/



export const GET_ALL_ROLES = gql`
	query getRole($filters: UsersPermissionsRoleFiltersInput) {
		usersPermissionsRoles(filters: $filters) {
			data {
				id
			}
		}
	}
`;