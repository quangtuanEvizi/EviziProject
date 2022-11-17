import { httpPost } from "../../utils/constant";


export const getRegions = variables => {
  variables = variables ?? {}

  const query = `
  query (
    $name: String,
    $active: Boolean,
    $company: [ID!],
    $orderBy: RegionOrder,
    $first: Int,
    $after: String,
    $last: Int,
    $before: String
  ) {
    regions (
      name: $name,
      active: $active,
      company: $company,
      orderBy: $orderBy,
      first: $first,
      after: $after
      last: $last,
      before: $before
    ) {
      edges {
        node {
          id
          name
          active
          company { id name active regions {
            edges {
              node {
                id
                name
              }
            }
          } }
          locations {
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
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
    `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ')

  return httpPost({ query, variables })
}

export const createRegion = input => {
  input = input ?? {}

  const query = `
      mutation (
        $input: RegionCreateInput!
      ) {
        regionCreate (
          input: $input,
        ) {
          region {
            id
            name
            active
          }
          errors { message path }
        }
      }
    `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ')

  return httpPost({ query, variables: { input } })
}

export const getRegionById = id => {
  console.log('variables:', id);
  id = id ?? {}
  const query = `
      query (
        $id: ID!,
      ) {
        region (
          id: $id,
        ) {
          id
          name
          active
          company {
            id
            name
          }
        }
      }
    `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ')

  return httpPost({ query, variables: { id } });
}

export const updateRegion = (id, input) => {
  input = input ?? {}

  const query = `
      mutation (
        $id: ID!
        $input: RegionUpdateInput!
      ) {
        regionUpdate (
          id: $id,
          input: $input,
        ) {
          region {
            id
            name
            active
            company {
              id
              name
            }
          }
          errors { message path }
        }
      }
    `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ')

  return httpPost({ query, variables: { id, input } })
}