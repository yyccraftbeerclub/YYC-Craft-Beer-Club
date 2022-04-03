import React from "react";
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "../Card/card.scss";

const Card  = ({slug, image, alt, postedOn, title, synopsis}) => {
    return (
		<>
			<Link to={`/blog/${slug}`} className="card" tabIndex="0">
				<div className="card__content">
					{ image ? <GatsbyImage className="card-img" image={ getImage(image) } alt={`"${alt}"`} /> : null }
					<div className="container">
						<div className="card__published"><span className="card__publish-date">{postedOn}</span></div>
						<h2 className="title">{title}</h2>
						<div className="card__copy">
							<div dangerouslySetInnerHTML={{ __html: synopsis }} />
						</div>
					</div>
				</div>
			</Link>
		</>
    )
}

export default Card

Card.propTypes = {
    slug: PropTypes.string,
    image: PropTypes.object,
    alt: PropTypes.string,
    postedOn: PropTypes.string,
    title: PropTypes.string,
    copy: PropTypes.string
}

Card.defaultProps = {
    slug: null,
    image: {},
    alt: null,
    postedOn: null,
    title: null,
    copy: null
}