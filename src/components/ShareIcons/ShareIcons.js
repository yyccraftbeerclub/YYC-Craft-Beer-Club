import React from 'react';
import PropTypes from 'prop-types';
import "./share-icons.scss";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'

const ShareButtons = ({title, url, twitterHandle}) => {

    return(
		<div>
			<p>Like this post? Share it:</p>
			<FacebookShareButton url={url} >
				<FacebookIcon className="icon" size={30} borderRadius={4} />
			</FacebookShareButton>

			{/* <TwitterShareButton url={url} title={title} via={twitterHandle}>
				<TwitterIcon className="icon" size={30} borderRadius={4} />
			</TwitterShareButton> */}
		</div>
	)
}

export default ShareButtons

ShareButtons.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  twitterHandle: PropTypes.string
}

ShareButtons.defaultProps = {
  title: "",
  url: "",
  twitterHandle: ""
}