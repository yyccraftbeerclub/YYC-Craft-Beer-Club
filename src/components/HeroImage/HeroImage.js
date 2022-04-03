import React from "react";
import Banner from "../../images/background-header.svg";
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./hero-image.scss";

const HeroImage = ({ title, image, alt }) => {

    return (
        <section className="hero__section" role="banner">
            <div className="hero__copy">
                <h1>{title}</h1>
            </div>
            <GatsbyImage className="hero__img" image={getImage(image)} alt={`${alt}`} />
            <Banner />
        </section>
    )
}

export default HeroImage

HeroImage.propTypes = {
    title: PropTypes.string,
    image: PropTypes.object,
    alt: PropTypes.string
}

HeroImage.defaultProps = {
    title: null,
    image: {},
    alt: null
}