import { gql } from '@apollo/client'

export const FETCHPOST =  gql`
  
  query{
  getPosts{
    id
    username
    body
    coverPhoto
    title
    comments {
      body
      username
    }
    createdAt
    likes {
      username
    }
    slug
  }
}
  `
