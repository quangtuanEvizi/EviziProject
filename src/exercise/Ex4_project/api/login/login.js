import { graphQlRequest } from "../request";
export const login = (payload) => {
    const query = `
      mutation(
        $username: String!,
        $password: String!
      ) {
        authenticate(
          username: $username,
          password: $password
        ) {
          token
          user {
            id
            name
            firstName
            lastName
            email
            active
            company {
              id
              name
              active
            }
          }
          errors { message path }
        }
      }
    `
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/\s+/gm, ' ');
    const variables = payload
    return graphQlRequest({ query, variables });
};

export const getUserRequest = variables => {
  const query = `
  query(
    $id: ID!
  ) {
      user(
        id: $id
      ) {
        id
        name
        firstName
        lastName
        email
        active
        role
        company {
          id
          name
          active
        }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ')

  return graphQlRequest({ query, variables })
}
