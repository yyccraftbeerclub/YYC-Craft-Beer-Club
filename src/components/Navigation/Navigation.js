import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link, graphql, StaticQuery } from 'gatsby';
import { slide as Menu } from "react-burger-menu";
import "./navigation.scss";

const Navigation = () => {
	const [scroll, setScroll] = useState(false);
	useEffect(() => {
		let isMounted = false;
		window.addEventListener("scroll", () => {
			if(!isMounted) {
				setScroll(window.scrollY > 10);
			}
		});
		return () => {
			isMounted = true;
		}
	}, []); 
		
	return (
		<StaticQuery query={graphql`
		query Nav {
			datoCmsMainNav {
			navItem
			navItem2
			navItem3
			navItem4
			navItem5
			logo {
				alt
					fluid(maxWidth: 200) {
						width
						height
						aspectRatio
						src
					}
				}
			}
		}
		`
		}
		render={data => (
			<>
				<section id="navigation" className="nav__section" data-datocms-noindex>
					<div className="desktop-only">
						<nav className={`nav-default ${scroll ? "dark-theme" : ""}`} role="navigation" aria-label="Main Menu">
							<Link to={`/`}><img className="logo" src={data.datoCmsMainNav.logo.fluid.src} alt={data.datoCmsMainNav.logo.alt} width="110px" height="110px" /></Link>
							<ul className="links">
								{ data.datoCmsMainNav.navItem ? <li><AnchorLink to="/#about" className="nav__item" title={`Click here to know more ${data.datoCmsMainNav.navItem}`}>{data.datoCmsMainNav.navItem}</AnchorLink></li> : null }
								{ data.datoCmsMainNav.navItem2 ? <li><AnchorLink to="/blog" stripHash className="nav__item" title={`Click here to view the ${data.datoCmsMainNav.navItem2}`}>{data.datoCmsMainNav.navItem2}</AnchorLink></li> : null }
								{ data.datoCmsMainNav.navItem3 ? <li><AnchorLink to="/#join" className="nav__item" title={`Click here to ${data.datoCmsMainNav.navItem3}`}>{data.datoCmsMainNav.navItem3}</AnchorLink></li> : null }
								{ data.datoCmsMainNav.navItem4 ? <li><AnchorLink to="/events" className="nav__item" title={`Click here to view ${data.datoCmsMainNav.navItem4}`}>{data.datoCmsMainNav.navItem4}</AnchorLink></li>  : null }
								{ data.datoCmsMainNav.navItem5 ? <li><AnchorLink to="/#contact" className="nav__item-last btn" title={`Click here to ${data.datoCmsMainNav.navItem5}`}>{data.datoCmsMainNav.navItem5}</AnchorLink></li>  : null }
							</ul>
						</nav>
					</div>
					<div className="mobile-only">
						<Link to={`/`}><img className="logo" src={data.datoCmsMainNav.logo.fluid.src} alt={data.datoCmsMainNav.logo.alt} width="75px" height="75px" /></Link>
						<Menu className="" width={ 300 } right>
							<nav role="navigation" aria-label="Mobile Main Menu">
								{ data.datoCmsMainNav.navItem ? <li><AnchorLink to='/#about' className="nav__item" title={`Click here to know more ${data.datoCmsMainNav.navItem}`}>{data.datoCmsMainNav.navItem}</AnchorLink></li> : null }
								{ data.datoCmsMainNav.navItem2 ? <li><AnchorLink to="/blog" className="nav__item" title={`Click here to view the ${data.datoCmsMainNav.navItem2}`}>{data.datoCmsMainNav.navItem2}</AnchorLink></li> : null }
								{ data.datoCmsMainNav.navItem3 ? <li><AnchorLink to="/#join" className="nav__item" title={`Click here to ${data.datoCmsMainNav.navItem3}`}>{data.datoCmsMainNav.navItem3}</AnchorLink></li> : null }
								{ data.datoCmsMainNav.navItem4 ? <li><AnchorLink to="/events" className="nav__item" title={`Click here to view ${data.datoCmsMainNav.navItem4}`}>{data.datoCmsMainNav.navItem4}</AnchorLink></li>  : null }
								{ data.datoCmsMainNav.navItem5 ? <li><AnchorLink to="/#contact" className="nav__item mobile-last" title={`Click here to ${data.datoCmsMainNav.navItem5}`}>{data.datoCmsMainNav.navItem5}</AnchorLink></li>  : null }
							</nav>
						</Menu>
					</div>
				</section>
			</>
		)}/>
	)
}

export default Navigation

Navigation.propTypes = {
	data: PropTypes.object
}

Navigation.defaultProps = {
    data: {}
}