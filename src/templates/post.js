import React from "react";
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import HeroImage from 'component/HeroImage/HeroImage';
import Layout from "layout/Layout";
import Seo from 'component/Seo/Seo';
import ShareIcons from 'component/ShareIcons/ShareIcons';
import { Link } from 'gatsby';
import './post.scss';

const BlogPost = ({data, pageContext}) => {
	const { next, previous } = pageContext;

	const title = `Read ${data.datoCmsPost.title}`;
	const url = window.location + data.datoCmsPost.slug;

	return(
		<Layout>
			<Seo favicon={data.datoCmsFaviconMetaTags} seoInfo={data.datoCmsPost.seoMetaTags}/>
			<HeroImage title={data.datoCmsPost.title} image={getImage(data.datoCmsPost.coverImage.gatsbyImageData)} alt={data.datoCmsPost.coverImage.alt} />
			<section className="post__section" role="main">
				<div className="post__copy">
					<div className="post__publish-date">Posted on {data.datoCmsPost.postedOn}</div>
					<div className="content" dangerouslySetInnerHTML={{ __html: data.datoCmsPost.copyNode.childMarkdownRemark.html }} />
					{ data.datoCmsPost.gallery.length > 0 ? 
						<div className="post__gallery">
						{data.datoCmsPost.gallery.map((e, index) => <GatsbyImage className="post__gallery-img" key={index} image={getImage(e.gatsbyImageData)} alt={`${e.alt}`} />)}
					</div> 
					: null }
					{ data.datoCmsPost.video ? <div className="post__video">
						<iframe
						src={data.datoCmsPost.video.url}
						title={data.datoCmsPost.video.title}
						frameBorder="0"
						webkitallowfullscreen="true"
						mozallowfullscreen="true"
						allowFullScreen
						/>
					</div> : null }
					<div className="share-icons">
						<ShareIcons title={title} url={url}/>
					</div>
				</div>
				<div className="post-bottom">
					<div className="pagination">
						{ previous ? 
							<Link className="prev-post" to={`/blog/${previous.slug}`}>
								<h2 className="post-name"><IoIosArrowBack/>{previous.title}</h2>
							</Link>
						: <div></div> }
						{ next ?
							<Link className="next-post" to={`/blog/${next.slug}`}>
								<h2 className="post-name">{next.title}<IoIosArrowForward/></h2>
							</Link>
						: <div></div> }
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default BlogPost

export const query = graphql`
query Post($slug: String!) {
	datoCmsFaviconMetaTags {
		tags
	}
	datoCmsPost(slug: { eq: $slug }) {
	  title
	  slug
	  copyNode {
		childMarkdownRemark {
		  html
		}
	  }
	  seoMetaTags {
		tags
	  }
	  coverImage {
		alt
		gatsbyImageData
	  }
	  postedOn(formatString: "MMMM Do, YYYY")
	  gallery {
		alt
		gatsbyImageData
	  }
	  video {
		url
		title
		height
		thumbnailUrl
	  }
	}
  }
`