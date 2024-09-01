import { gql } from "@apollo/client";


export const GET_ALL_SPECIALIZATIONS = gql`
    query getAllSpecializations {
  specializations {
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
}`

export const GET_SPECIALIZATION_BY_ID = gql`
query Specialization($id: ID!) {
  specialization(id: $id) {
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
export const GET_SPECIALIZATION__BY_PAGINATION = gql`
query Specializations($page: Int, $pageSize: Int) {
  specializations(pagination: { page: $page, pageSize: $pageSize }) {
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



export  const GET_ALL_SPECIALIZATIONS_TITLE = gql`
query specializationsTitle {
  specializations {
    data {
      id
      attributes {
        title
      }
    }
}
}
`
