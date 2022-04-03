import React from "react";
import { graphql } from 'gatsby';
import { getImage } from "gatsby-plugin-image";
import HeroImage from "component/HeroImage/HeroImage";
import Layout from "layout/Layout";
import Seo from "component/Seo/Seo";
import "styles/404.scss";


const PageNotFound = ({data}) => {
    return (
		<Layout>
			<Seo favicon={data.datoCmsFaviconMetaTags} seoInfo={data.datoCmsPageNotFound.seoMetaTags} />
			<HeroImage title={data.datoCmsPageNotFound.title} image={ getImage(data.datoCmsPageNotFound.heroImage.gatsbyImageData) } alt={data.datoCmsPageNotFound.heroImage.alt} />
			<section className="page-not-found__section">
				<div className="copy">
					<div dangerouslySetInnerHTML={{ __html: data.datoCmsPageNotFound.copyNode.childMarkdownRemark.html }}></div>
				</div>
			</section>
		</Layout>
	)
}

export default PageNotFound

export const query = graphql`
query PageNotFound {
    datoCmsFaviconMetaTags {
      tags
    }
    datoCmsPageNotFound {
      seoMetaTags {
        tags
      }
      title
      copyNode {
        childMarkdownRemark {
          html
        }
      }
      heroImage {
        alt
        gatsbyImageData
      }
    }
  }
`