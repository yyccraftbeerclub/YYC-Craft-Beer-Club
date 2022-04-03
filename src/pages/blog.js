import React, { useState } from "react";
import { graphql, StaticQuery } from 'gatsby';
import { getImage } from "gatsby-plugin-image";
import Card from 'component/Card/Card';
import HeroImage from 'component/HeroImage/HeroImage';
import Layout from 'layout/Layout';
import Masonry from 'react-masonry-css';
import Seo from 'component/Seo/Seo';
import Slide from 'react-reveal/Slide';
import 'styles/blog.scss';

const Blog = () => {
	const [visiblePosts, setMorePosts] = useState(6);

	const handleClick = () => {
		setMorePosts(posts => posts + 3)
	}

	const breakpointColumnsObj = {
		default: 3,
		1024: 2,
		700: 1
	};

    return (
		<StaticQuery
		query={graphql`	
			query Blog {
				datoCmsFaviconMetaTags {
					tags
				}
				allDatoCmsPost(sort: {fields: [postedOn], order: DESC}) {
			  		edges {
						node {
				  			title
							slug
							synopsis
							postedOn(formatString: "MMM Do")
							coverImage {
								alt
								gatsbyImageData
							}
						}
			  		}
				}
				datoCmsBlog {
			  		blogHeroImage {
						alt
						gatsbyImageData
			  		}
			  		heroTitle
					  loadMorePostsCtaLabel
					  noPostsMessage
			  		seoMetaTags {
						tags
			  		}
				}
		  	}
		`}
        render={data => (
			<Layout>
				<Seo favicon={data.datoCmsFaviconMetaTags} seoInfo={data.datoCmsBlog.seoMetaTags}/>
				<HeroImage id="top" title={data.datoCmsBlog.heroTitle} image={getImage(data.datoCmsBlog.blogHeroImage.gatsbyImageData)} alt={data.datoCmsBlog.blogHeroImage.alt} />
				<section className="blog__section" role="main">
					<div className="blog__card-wrapper">
						<>
							<Slide bottom cascade ssrFadeout>
								{ data.allDatoCmsPost.edges.length > 0 ?
								<div>
									<Masonry className="blog__card grid-container" breakpointCols={breakpointColumnsObj} columnClassName="grid-container_column">
									{data.allDatoCmsPost.edges.slice(0, visiblePosts).map(({node: blog}) => (
										<div key={blog.slug}><Card slug={blog.slug} image={getImage(blog.coverImage.gatsbyImageData)} alt={blog.coverImage.alt} postedOn={blog.postedOn} title={blog.title} synopsis={blog.synopsis} /></div>
									))}
									</Masonry>
									{ visiblePosts ? <div className={`blog__load-more-posts ${visiblePosts >= data.allDatoCmsPost.edges.length ? "hidden" : ""}`}>
										<button type="button" className="btn btn-primary" onClick={handleClick}>{data.datoCmsBlog.loadMorePostsCtaLabel}</button>
									</div> : null }
								</div> 
								: <div className="no-posts"><h2>{data.datoCmsBlog.noPostsMessage}</h2></div> }
							</Slide>
						</>
					</div>
				</section>
			</Layout>
		)}
	/>
  );
}

export default Blog
