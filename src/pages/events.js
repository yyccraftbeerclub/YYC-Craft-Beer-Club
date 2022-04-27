import React, { useState, useEffect } from "react";
import { graphql } from 'gatsby';
import { getImage } from "gatsby-plugin-image";
import HeroImage from 'component/HeroImage/HeroImage';
import Layout from 'layout/Layout';
import PropTypes from 'prop-types';
import Seo from "component/Seo/Seo";
import { IoCalendarOutline, IoTimeOutline } from 'react-icons/io5';
import { FiMapPin } from 'react-icons/fi';
import Slide from 'react-reveal/Slide';
import "styles/events.scss";	

const Events = ({data}) => {
	const [isNotMobile, setIsNotMobile] = useState(typeof window !== `undefined` ? window.innerWidth < 767 : null);
	
	const formatTime = function (time) {
		let militaryTime = parseInt(time.substring(0,2)),
			hours = ((militaryTime + 11) % 12) + 1,
			amPm = militaryTime > 11 ? ' PM' : ' AM',
			minutes = time.substring(2);
	
		return hours + minutes + amPm;
	};

	useEffect(() => {
		if(typeof window !== `undefined`) {
			window.addEventListener("resize", setIsNotMobile(window.innerWidth > 767));
			return () => window.removeEventListener("resize", setIsNotMobile(window.innerWidth > 767));
		}
	}, []);

	return (
		<Layout>
			<Seo favicon={data.datoCmsFaviconMetaTags} seoInfo={data.datoCmsEvent.seoMetaTags}/>
			<HeroImage title={data.datoCmsEvent.title} image={getImage(data.datoCmsEvent.heroImage.gatsbyImageData)} alt={data.datoCmsEvent.heroImage.alt} />
			<section className="section__events" role="main">
				{ data.datoCmsEvent.copyNode ? <div className="events__copy">
					<div dangerouslySetInnerHTML={{ __html: data.datoCmsEvent.copyNode.childMarkdownRemark.html }} />
				</div> : null }
				<Slide bottom>
					<div>
						{ data.allEvent.edges.length > 0 ? data.allEvent.edges.map(({node: event}) => (
							<div className="event__card" key={event.name.replace(/\s+/g, '-').toLowerCase()}>
								<div className="date">
									<IoCalendarOutline /> 
									<span className="event-date">{event.date}</span>
									<a href={event.link}>{data.datoCmsEvent.eventTileButtonTitle}</a>
								</div>
								<div className="details">
									<h2>{event.name}</h2>
									<div className="location"><div><FiMapPin /></div><span className="venue-name">{event.venue.name}</span> - { event.venue.address_1 ? `${event.venue.address_1}` : null } { event.venue.city ? `, ${event.venue.city}` : null } { event.venue.zip ? `, ${event.venue.address_1}` : null }</div>
									<div className="time"><div><IoTimeOutline /></div>{formatTime(event.time)}</div>
									{ data.datoCmsEvent.readEventDetailsLabel ? <p className="details-label">{data.datoCmsEvent.readEventDetailsLabel}</p> : null }
									<div className="description" dangerouslySetInnerHTML={{ __html: event.description }} />
								</div>
							</div>
						)) : <div className="no-events"><h2>{data.datoCmsEvent.noEventsMessage}</h2></div> }
					</div>
				</Slide>
			</section>
		</Layout>
	)
}

export default Events

export const query = graphql`
query EventsQuery {
	datoCmsFaviconMetaTags {
		tags
	}
	datoCmsEvent {
		seoMetaTags {
			tags
		}
		title
		copyNode {
			childMarkdownRemark {
			  html
			}
		  }
		eventTileButtonTitle
		readEventDetailsLabel
		noEventsMessage
		heroImage {
			alt
			gatsbyImageData
		}
	}
	allEvent(limit: 5) {
		edges {
			node {
				id
				name
				description
				link
				venue {
					name
					address_1
					city
					zip
				}
				date: local_date(formatString: "dddd, MMMM D, YYYY")
				time: local_time
				}
			}
		}
	}
`

Events.propTypes = {
data: PropTypes.object
};