import { gql } from '@apollo/client';

export const GET_ALL_MEMBERS = gql`
	query getAllMember(
		$filters: UsersPermissionsUserFiltersInput
		$page: Int
		$pageSize: Int
	) {
		usersPermissionsUsers(
			filters: $filters
			pagination: { page: $page, pageSize: $pageSize }
		) {
			data {
				id
				attributes {
					username
					email
					status
					createdAt
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
								passport
								name
								dateOfBirth
								country
								phoneNo
								registeredDate
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
`;
export const GET_MEMBER_BY_ID = gql`
	query getMemberById($id: ID!) {
		usersPermissionsUser(id: $id) {
			data {
				id
				attributes {
					username
					email
					status
					createdAt
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
								gender
								nationality
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

export const GET_ALL_ROLES = gql`
	query allRoles($filters: UsersPermissionsRoleFiltersInput) {
		usersPermissionsRoles(filters: $filters) {
			data {
				id
			}
		}
	}
`;
