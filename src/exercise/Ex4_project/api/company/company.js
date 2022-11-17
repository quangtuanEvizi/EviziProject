import { httpPost } from "../../utils/constant";

export const getCompanies = (variables) => {
  variables = variables ?? {};
  const query = `
  query(
    $name: String,
    $active: Boolean,
    $demo: Boolean,
    $orderBy: CompanyOrder,
    $first: Int,
    $last: Int,
    $after: String,
    $before: String
  ) {
    companies(
      name: $name,
      active: $active,
      demo: $demo,
      orderBy: $orderBy,
      first: $first,
      last: $last,
      after: $after,
      before: $before
    ) {
      edges {
        node {
            id,
          name,
          industry,
          active,
          planLevel,
          productPlan,
          demo,
          regions {
            edges {
              node {
                id, 
                name,
                company {
                  id, name
                },locations {
                  edges {
                    node {
                      id,
                      name
                    }
                  }
                }
              }
            }
          },
          locations {
            edges {
              node {
                id,
                name
              }
            }
          }
            
            
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
    `
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables });
};

export const createCompany = (input) => {
  input = input ?? {};
  const query = `
  mutation (
    $input: CompanyCreateInput!
  ) {
    companyCreate (
      input: $input,
    ) {
      company {
        id
        name
        active
      }
      errors { message path }
    }
  }
`
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { input } });
}

export const getCompanyById = id => {
  const query = `
 query(
  			$id: ID!
      ) {
        company(
         id: $id
        ){
          id
          active
          billableUserCount
          billingEnabled
          maxLocations
          maxUsers
          name
          industry
          demo
          regions {
            edges {
              node {
                id
                name
                active
              }
            }
          }
        }
      }
`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ')

  return httpPost({ query, variables: { id } });
}

export const updateCompany = (id, input) => {
  input = input ?? {}
  const query = `
    mutation (
      $id: ID!
      $input: CompanyUpdateInput!
    ) {
      companyUpdate (
        id: $id,
        input: $input,
      ) {
        company {
          id
          name
          active
          maxLocations
          maxUsers
          industry
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ')

  return httpPost({ query, variables: { id, input } })
}