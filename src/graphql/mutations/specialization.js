import { gql } from "@apollo/client";

export const CREATE_SPECIALIZATION_WITH_IMAGE = gql`
  mutation CreateSpecialization($data: SpecializationInput!) {
    createSpecialization(data: $data) {
      data {
        id
        attributes {
          title
          description
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_SPECIALIZATION_WITH_IMAGE = gql`
  mutation UpdateSpecialization($id: ID!, $data: SpecializationInput!) {
    updateSpecialization(id: $id, data: $data) {
      data {
        id
        attributes {
          title
          description
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;


export const CREATE_SPECIALIZATION = gql`
    mutation CreateSpecialization($data: SpecializationInput!) {
  createSpecialization(data: $data) {
    data {
      id
      attributes {
        title
        description
        doctors {
          data {
            id
            attributes {
              name
            }
          }
        }
        appointments {
          data {
            id
            attributes {
              date
            }
          }
        }
        section {
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

export const UPDATE_SPECIALIZATION = gql`
    mutation UpdateSpecialization($id: ID!, $data: SpecializationInput!) {
  updateSpecialization(id: $id, data: $data) {
    data {
      id
      attributes {
        title
        description
        doctors {
          data {
            id
            attributes {
              name
            }
          }
        }
        appointments {
          data {
            id
            attributes {
              date
            }
          }
        }
        section {
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

export const DELETE_SPECIALIZATION = gql`
    mutation DeleteSpecialization($id: ID!) {
  deleteSpecialization(id: $id) {
    data {
      id
      attributes {
        title
        description
        doctors {
          data {
            id
            attributes {
              name
            }
          }
        }
        appointments {
          data {
            id
            attributes {
              date
            }
          }
        }
        section {
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

export const SPECIALIZATION_INPUT = gql`
    mutation DeleteSpecialization($id: ID!) {
  deleteSpecialization(id: $id) {
    data {
      id
      attributes {
        title
        description
        doctors {
          data {
            id
            attributes {
              name
            }
          }
        }
        appointments {
          data {
            id
            attributes {
              date
            }
          }
        }
        section {
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