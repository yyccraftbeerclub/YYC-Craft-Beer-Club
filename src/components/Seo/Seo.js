import * as React from "react";
import PropTypes from 'prop-types';
import { HelmetDatoCms } from "gatsby-source-datocms";

function Seo({favicon, seoInfo}) {
    return(
        <HelmetDatoCms encodeSpecialCharacters={true} defer={false} seo={seoInfo} favicon={favicon}>
            <html lang="en"/>
        </HelmetDatoCms>
    )
}

export default Seo

Seo.propTypes = {
    favicon: PropTypes.object,
    seoInfo: PropTypes.object
}

Seo.defaultProps = {
    favicon: {},
    seoInfo: {}
}