import { gql } from "@apollo/client";

export const GET_ALL_PARTNERS = gql`
	query getAllPartners($filters: UsersPermissionsUserFiltersInput) {
		usersPermissionsUsers(filters: $filters, pagination: { limit: 100 }) {
			data {
				id
				attributes {
					email
					isNotified
					blocked
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
								residentialAddressLine1
								jobTitle
								UEN
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

export const GET_PARTNER_BY_ID = gql`
	query getPartnerById($id: ID!) {
		usersPermissionsUser(id: $id) {
			data {
				id
				attributes {
					email
					isNotified
					blocked
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
								city
								postalCode
								phoneNo
								country
								companyName
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
