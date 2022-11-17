import { httpPost } from "../../utils/constant";

export const getInspection = (variables) => {
  variables = variables ?? {};
  const query = `
    query (
        $company: [ID!],
        $region: [ID!],
        $location: [ID!],
				$draft: Boolean,
    		$first: Int,
        $after: String,
        $last: Int,
        $before: String
        ){
          inspections(
            company: $company,
            region:$region,
            location: $location,
            draft: $draft,
            first: $first,
            after: $after
            last: $last,
            before: $before
          ) {
              edges {
                node {
                  id,
                  reference,
                  unit {
                    id
                  },
                  company {
                    id,
                    name,
                  }
                  location {
                    id,
                    name
                  },
                  region {
                    id,
                    name
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