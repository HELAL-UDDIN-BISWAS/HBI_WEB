const { gql } = require("@apollo/client");

export const ALL_CLINIC_ADMIN=gql`
query getAllClinic($filters: UsersPermissionsUserFiltersInput) {
  usersPermissionsUsers(filters: $filters, pagination: { limit: 100 }) {
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
}`

export const GET_CLINICADMIN_BYID = gql`
	query getClinicAdminById($id: ID!) {
		usersPermissionsUser(id: $id) {
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
        email
        profile {
          data {
            id
            attributes {
              name
              phoneNo
              gender
              passport
              nationality
              dateOfBirth
            }
          }
        }
      }
    }
		}
	}	
`;