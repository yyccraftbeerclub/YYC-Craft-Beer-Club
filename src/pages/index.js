import React, {useState, useEffect } from "react";
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import BannerBottom from "../images/background-dark-bottom.svg";
import BannerTop from "../images/background-dark-top.svg";
import BackgroundBeer from "../images/background-beer.svg";
import Carousel from 'nuka-carousel';
import ContactForm from 'component/ContactForm/ContactForm';
import Fade from 'react-reveal/Fade';
import HeroImage from 'component/HeroImage/HeroImage';
import Layout from 'layout/Layout';
import PropTypes from 'prop-types';
import Seo from "component/Seo/Seo";
import Slide from 'react-reveal/Slide';
import "styles/index.scss";	

const Home = ({data}) => {
		const [isNotMobile, setIsNotMobile] = useState(typeof window !== `undefined` ? window.innerWidth < 767 : null);
		
		useEffect(() => {
			if(typeof window !== `undefined`) {
				window.addEventListener("resize", setIsNotMobile(window.innerWidth > 767));
				return () => window.removeEventListener("resize", setIsNotMobile(window.innerWidth > 767));
			}
		}, []);

	return (
	<>
		{ isNotMobile ? (
			<Layout>
				<Seo favicon={data.datoCmsFaviconMetaTags} seoInfo={data.datoCmsHomepage.seoMetaTags}/>
				<HeroImage title={data.datoCmsHomepage.heroTitle} image={getImage(data.datoCmsHomepage.heroImage.gatsbyImageData)} alt={data.datoCmsHomepage.heroImage.alt} />
				<div role="main">
					<div id="about">
						<section className="section__intro">
							<Fade bottom>
								<div className="copy">
									<div dangerouslySetInnerHTML={{ __html: data.datoCmsHomepage.aboutUsCopyNode.childMarkdownRemark.html }} />
								</div>
							</Fade>
						</section>
					</div>
					<section id="carousel" className="section__carousel">
						{ data.datoCmsHomepage.carouselSlides ? <Carousel renderAnnounceSlideMessage={({ currentSlide, slideCount }) => `Slide ${currentSlide + 1} of ${slideCount}`} renderBottomCenterControls={() => {}} autoplay={true} pauseOnHover={true} decorators={[]} slidesToShow={3} cellSpacing={60} wrapAround={true}
							renderCenterLeftControls={({ previousSlide }) => (
							<button onClick={previousSlide} className="btn-navigation left" type="button" aria-label="Carousel previous arrow button"><IoIosArrowBack /></button>
							)}
							renderCenterRightControls={({ nextSlide }) => (
							<button onClick={nextSlide} className="btn-navigation right" type="button" aria-label="Carousel next arrow button"><IoIosArrowForward /></button>
							)}>
							{ data.datoCmsHomepage.carouselSlides.length > 0 && data.datoCmsHomepage.carouselSlides.map((e, index) => <GatsbyImage className="carousel-img" tabIndex="0" key={index} image={getImage(e.gatsbyImageData)} alt={`${e.alt}`} />)}
						</Carousel> : null }
					</section>
					<div className="wavy-section">
						<BannerTop />
						<div className="wrapper">
							<section className="section__join" id="join">
								<Fade left>
									<div className="copy">
										<div dangerouslySetInnerHTML={{ __html: data.datoCmsHomepage.joinCopyNode.childMarkdownRemark.html }} />
										{ data.datoCmsHomepage.joinCtaLink ? <a href={data.datoCmsHomepage.joinCtaLink} className="btn btn-secondary" target="_blank" rel="noreferrer">{data.datoCmsHomepage.joinCtaText} <IoIosArrowForward /></a> : null }
									</div>
								</Fade>
								<BackgroundBeer/>
							</section>
						</div>
						<BannerBottom />
					</div>
					<section className="contact-us__section" id="contact">
						<div className="copy">
							<div dangerouslySetInnerHTML={{ __html: data.datoCmsHomepage.contactCopyNode.childMarkdownRemark.html }}/>
						</div>
						<div className="content wrapper">
							<Slide bottom>
								<ContactForm fieldName={data.datoCmsHomepage.contactNameField} submitMsgSuccess={data.datoCmsHomepage.formSubmissionSuccessMessage} fieldEmail={data.datoCmsHomepage.contactEmailField} fieldMessage={data.datoCmsHomepage.contactMessageField} submitBtn={data.datoCmsHomepage.submitButtonText} formInstructions={data.datoCmsHomepage.contactFormInstructions} socialMediaLinks={data.allDatoCmsSocialMediaProfile.edges} />
							</Slide>
						</div>
					</section>
				</div>
			</Layout>
		  ) : (
			<Layout>
				<Seo favicon={data.datoCmsFaviconMetaTags} seoInfo={data.datoCmsHomepage.seoMetaTags}/>
				<HeroImage title={data.datoCmsHomepage.heroTitle} image={getImage(data.datoCmsHomepage.heroImage.gatsbyImageData)} alt={data.datoCmsHomepage.heroImage.alt} />
				<div role="main">
					<section id="about" className="section__intro">
						<Fade>
							<div className="copy">
								<div dangerouslySetInnerHTML={{ __html: data.datoCmsHomepage.aboutUsCopyNode.childMarkdownRemark.html }} />
							</div>
						</Fade>
					</section>
					<section id="carousel" className="section__carousel">
						{ data.datoCmsHomepage.carouselSlides ? <Carousel renderBottomCenterControls={({ currentSlide, slideCount }) => (<div>Slide {currentSlide + 1} / {slideCount}</div>)} renderAnnounceSlideMessage={({ currentSlide, slideCount }) => `Slide ${currentSlide + 1} of ${slideCount}`} autoplay={false} cellSpacing={0} slidesToShow={1} wrapAround={true} renderCenterLeftControls={() => {}} renderCenterRightControls={() => {}}>
							{ data.datoCmsHomepage.carouselSlides.length > 0 && data.datoCmsHomepage.carouselSlides.map((e, index) => <GatsbyImage className="carousel-img" key={index} image={getImage(e.gatsbyImageData)} alt={`${e.alt}`} />)}
						</Carousel> : null }
						<div className="mobile-swipe">{data.datoCmsHomepage.carouselMobileSwipeLabel} <IoIosArrowForward/></div>
					</section>
					<div className="wavy-section">
						<BannerTop />
						<div className="wrapper">
							<section className="section__join" id="join">
								<Fade>
									<div>
										<div dangerouslySetInnerHTML={{ __html: data.datoCmsHomepage.joinCopyNode.childMarkdownRemark.html }} />
										{ data.datoCmsHomepage.joinCtaLink ? <a href={data.datoCmsHomepage.joinCtaLink} className="btn btn-secondary" target="_blank" rel="noreferrer">{data.datoCmsHomepage.joinCtaText} <IoIosArrowForward /></a> : null }
									</div>
									<BackgroundBeer/>
								</Fade>
							</section>
						</div>
						<BannerBottom />
					</div>
					<section className="contact-us__section" id="contact">
						<div className="copy">
							<div dangerouslySetInnerHTML={{ __html: data.datoCmsHomepage.contactCopyNode.childMarkdownRemark.html }}/>
						</div>
						<div className="content wrapper">
							<Fade>
								<ContactForm fieldName={data.datoCmsHomepage.contactNameField} submitMsgSuccess={data.datoCmsHomepage.formSubmissionSuccessMessage} fieldEmail={data.datoCmsHomepage.contactEmailField} fieldMessage={data.datoCmsHomepage.contactMessageField} submitBtn={data.datoCmsHomepage.submitButtonText} formInstructions={data.datoCmsHomepage.contactFormInstructions} socialMediaLinks={data.allDatoCmsSocialMediaProfile.edges} />
							</Fade>
						</div>
					</section>
				</div>
			</Layout>
		)}
	</>
	)
}

export default Home

export const query = graphql`
query Homepage {
	datoCmsFaviconMetaTags {
		tags
	}
	datoCmsHomepage {
	  seoMetaTags {
		tags
	  }
	  heroTitle
	  heroImage {
		alt
		gatsbyImageData
	  }
	  aboutUsCopyNode {
		childMarkdownRemark {
		  html
		}
	  }
	  contactCopyNode {
		childMarkdownRemark {
		  html
		}
	  }
	  carouselMobileSwipeLabel
	  carouselSlides {
		alt
		gatsbyImageData
	  }
	  contactEmailField
	  contactMessageField
	  contactNameField
	  contactFormInstructions
	  submitButtonText
	  formSubmissionSuccessMessage
	  joinCopyNode {
		childMarkdownRemark {
		  html
		}
	  }
	  joinCtaLink
	  joinCtaText
	}
	allDatoCmsSocialMediaProfile {
		edges {
			node {
				profile
				profileUrl
			}
		}
	}
	allDatoCmsSocialMediaProfile {
		edges {
		  node {
			profile
			profileUrl
		  }
		}
	}
	datoCmsFooter {
		footerTitle
	}
  }
`

Home.propTypes = {
	data: PropTypes.object
};