/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { HTMLContent } from "../components/content"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostBody from "./body/blog-post-body"



const Post = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
  const seoImage = frontmatter.featuredImage
    ? frontmatter.featuredImage?.childImageSharp?.gatsbyImageData.images.fallback.src
    : ""
  const postImage = frontmatter.featuredImage
  ? frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
  : ""
  const { previous, next } = pageContext

  return (
    <Layout className="page">
      <Seo
        title={frontmatter.title}
        description={
          frontmatter.description ? frontmatter.description : excerpt
        }
        image={seoImage}
        article={true}
      />
      <PostBody 
        title={frontmatter.title}
        image={postImage}
        previous={previous}
        next={next}
        content={html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 1200, height: 630 )
          }
        }
      }
    }
  }
`
