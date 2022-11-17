import { httpPost } from "../../utils/constant";

export const getLocations = (variables) => {
    variables = variables ?? {};
    const query = `
  query (
    $name: String,
    $active: Boolean,
    $company: [ID!],
    $region: [ID!],
    $activeCompany: Boolean,
    $orderBy: LocationOrder,
    $first: Int,
    $after: String,
    $last: Int,
    $before: String
  ) {
    locations (
      name: $name,
      active: $active,
      company: $company,
      region: $region,
      activeCompany: $activeCompany,
      orderBy: $orderBy,
      first: $first,
      after: $after,
      last: $last,
      before: $before
    ) {
      edges {
        node {
          id
          name
          active
          company { id name active }
          region { id name active }
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

export const createLocation = (input) => {
  input = input ?? {};

  const query = `
    mutation (
      $input: LocationCreateInput!
    ) {
      locationCreate (
        input: $input,
      ) {
        location {
          id
          name
          active
        }
        errors { message path }
      }
    }
  `
  .replace(/(\r\n|\n|\r)/gm,"")
  .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { input } });
};