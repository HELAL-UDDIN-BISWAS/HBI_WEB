const { gql } = require("@apollo/client");

export const CREATE_CLINIC_ADMIN_PROFILE = gql`
	mutation createProfile($profile: ProfileInput!) {
		createProfile(data: $profile) {
			data {
				id
			}
		}
	}
`;

export const CREATE_CLINIC = gql`
  mutation createClinic($data: ClinicInput!) {
    createClinic(data: $data) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export const CREATE_CLINIC_ADMIN = gql`
mutation createClinicAdmin(
    $email: String!
    $username: String!
    $password: String!
    $role: ID!
    $profileId: ID!
    $clinicId: ID!
  ) {
    createUsersPermissionsUser(
      data: {
        email: $email
        username: $username
        password: $password
        role: $role
        profile: $profileId
        clinic: $clinicId
      }
    ) {
      data {
        id
        attributes {
          status
          clinic {
            data {
              id
              attributes {
                name
              }
            }
          }
          role{
            data{
              id
              attributes{
                name
              }
            }
          }
          email
          profile {
            data {
              id
              attributes {
                name
                phoneNo
                gender
                dateOfBirth
                passport
                nationality
              }
            }
          }
        }
      }
    }
  }
`;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=--= UPDATE CLINIC ADMIN =-=-=-=-=-=-=-=-=-=-=-=-=-=--=

export const UPDATE_CLINIC_ADMIN_PROFILE = gql`
	mutation updateProfile($id: ID!, $input: ProfileInput!) {
		updateProfile(id: $id, data: $input) {
			data {
				id
				attributes {
					name
					phoneNo
					gender
					dateOfBirth
					nationality
					passport
				}
			}
		}
	}
`;
export const UPDATE_CLINIC = gql`
mutation updateClinic($id: ID!, $data: ClinicInput!) {
    updateClinic(id: $id, data: $data) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export const UPDATE_CLINIC_USER = gql`
	mutation updateClinicUser(
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
								name
								phoneNo
								gender
								dateOfBirth
								nationality
								passport
							}
						}
					}
				}
			}
		}
	}
`;
// =-=-=-=-=-=-=-=-=-=-=-=-=-=--= UPDATE_USER_STATUS =-=-=-=-=-=-=-=-=-=-=-=-=-=--=

export const UPDATE_USER_STATUS = gql`
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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=--= UPDATE_USER_PASSWORD =-=-=-=-=-=-=-=-=-=-=-=-=-=--=

export const UPDATE_USER_PASSWORD=gql`
mutation updateUserPassword(
  $id: ID!
  $password: String
) {
  updateUsersPermissionsUser(
    id: $id
    data: {
      password: $password
    }
  ) {
    data {
      id
      attributes {
        username
        email 
      }
    }
  }
}
`