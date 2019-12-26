import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const imagesResult = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { regex: "/(jpeg|jpg|gif|png)/" }
          sourceInstanceName: { eq: "images" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  const { allFile } = imagesResult // destructure the allFile key from the query
  const { edges } = allFile // destructure the edges array from the above
  if (edges.length === 0) {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>There are 0 images</h1>
      </Layout>
    )
  }
  const firstItem=edges[0].node // fetches the first item
  const midItem= edges[Math.ceil(edges.length/2)-1].node // fetches the mid item
  const lastItem= edges[edges.length-1].node // fetches the last item
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Fetching images</h1>
      <p>First One</p>
      <Img fluid={firstItem.childImageSharp.fluid}/>
       <p>Mid item</p>
       <Img fluid={midItem.childImageSharp.fluid}/>
      <p>Last item</p>
      <Img fluid={lastItem.childImageSharp.fluid}/>
    </Layout>
  )
}

export default IndexPage
