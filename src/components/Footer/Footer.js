import React from "react";
import FooterBanner from "../../images/background-dark-footer.svg";
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { IoLogoInstagram, IoIosMail } from 'react-icons/io';
import { StaticQuery, graphql } from 'gatsby';
import './footer.scss';

const Footer = () => {
	var date = new Date().getFullYear();

	return (
	  <StaticQuery
		query={graphql`
		query Footer {
			datoCmsFooter {
			  footerCopyright
			  footerTitle
			}
			allDatoCmsSocialMediaProfile {
			  edges {
				node {
				  profile
				  profileUrl
				}
			  }
			}
		  }
		`}
		render={data => (
			<>
				<FooterBanner/>
				<section className="footer__section" data-datocms-noindex role="contentinfo">
					<div className="footer__content">
					{ data.datoCmsFooter.footerTitle ? <h3 className="title">{data.datoCmsFooter.footerTitle}</h3> : null }
						<div className="info">
							<div className="social-media-icons">
								{ data.allDatoCmsSocialMediaProfile.edges.map(({node: p}) => (
									<a
										key={p.profile}
										href={p.profileUrl}
										target="_blank"
										aria-label={`${p.profile} social media icon`}
										rel="noreferrer"
										tabIndex="0">
										<IconContext.Provider value={{ className: `icon-${p.profile.toLowerCase()}` }}>
											{p.profile === "Instagram" && <IoLogoInstagram />}
											{p.profile === "Email" && <IoIosMail />}
											{/* {p.profile === "Facebook" && <IoLogoFacebook />} */}
										</IconContext.Provider>
									</a>
								))}
							</div>
						</div>
					</div>
					{ data.datoCmsFooter.footerCopyright ? <div className="footer__copyright">&copy; {date} - {data.datoCmsFooter.footerCopyright}</div> : <div className="footer__copyright">&copy; {date}</div> }
				</section>
			</>
		)}
	  />
	);
  };

export default Footer

Footer.propTypes = {
	data: PropTypes.object
}

Footer.defaultProps = {
	data: {}
}