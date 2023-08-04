import { gql } from "@apollo/client";

const GET_BLOGS_INFO = gql`
   query {
      posts {
         author {
            name
            avatar {
               url
            }
         }
         title
         slug
         id
         datePublished
         coverImage {
            url
         }
         category
         content {
            text
         }
   }
}
`

const GET_AUTHORS_INFO = gql`
   query {
      authors {
         avatar {
            url
         }
         id   
         name
         slug
         field
      }
   }
`

const GET_AUTHOR_INFO = gql`
   query getAuthorInfo($slug: String!) {
      author(where: {slug: $slug}) {
         avatar {
            url
         }
         description {
            text
         }
         field
         name
         posts {
            category
            coverImage {
            url
            }
            datePublished
            id
            slug
            title
            content {
               text
            }
         }
      }
   }
`
const GET_POST_INFO = gql`
   query getPost($slug: String!) {
      post(where: {slug: $slug}) {
         author {
            avatar {
            url
            }
            name
            slug
            field
         }
         category
         content {
            html
            text
            markdown
         }
         coverImage {
            url
         }
         datePublished
         slug
         title
      }
   }
`

const GET_POST_COMMENTS = gql`
   query getPostComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
         id
         name
         text
         createdAt
      }
   }
`

export {GET_BLOGS_INFO , GET_AUTHORS_INFO, GET_AUTHOR_INFO, GET_POST_INFO, GET_POST_COMMENTS};