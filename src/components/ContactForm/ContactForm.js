import React from "react";
import { IoIosArrowForward } from 'react-icons/io';
import PropTypes from 'prop-types';
import "./contact-form.scss";

const ContactForm = ({ fieldName, submitMsgSuccess, fieldMessage, fieldEmail, submitBtn, formInstructions }) => {

	const handleSubmit = e => {
		e.preventDefault();
		let form = document.getElementById('contact-form');
		const data = new FormData(form)
		data.append('contact__form', 'contact')
		fetch('/', {
			method: 'POST',
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(data).toString()
		})
		.then(() => {
			form.innerHTML = `<div class="submit-container"><div class="submit-success">${submitMsgSuccess}</div></div>`;
		})
		.catch(er => {
			form.innerHTML = `<div class="submit-container"><div class="submit-error">${er}</div></div>`;
		})
    }

	return (
		<div className="contact-us__wrapper">
			<div className="contact-us-form wrapper">
				<p className="form-instructions">{formInstructions}</p>
				<form id="contact-form" className="contact__form" method="POST" name="Contact Form" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} action="/">
					<input type="hidden" name="form-name" value="Contact Form" />
					<div className="form-group hidden" aria-hidden="true">
						<input type="hidden" name="contact" value="contactUs" />
							<label>Don't fill this out if you're human:</label>
						<input name="bot-field" />
					</div>
					<div className="form-group">
						<label id="label-name" htmlFor="name">{fieldName}</label>
						<input type="text" aria-labelledby="label-name" name="name" className="form-control required" id="inputName" placeholder="Enter your name" required="required"/>
					</div>
					<div className="form-group">
						<label htmlFor="email" id="label-email">{fieldEmail}</label>
						<input type="email" aria-labelledby="label-email" name="email" className="form-control" id="inputEmail" required="required" placeholder="Enter your email"/>
					</div>
					<div className="form-group">
						<label htmlFor="message" id="label-message">{fieldMessage}</label>
						<textarea type="text" aria-labelledby="label-message" name="message" className="form-control required" id="inputMessage" placeholder="Enter a message" required="required" rows="5" cols="50"/>
					</div> 
					<button type="submit" className="btn btn-primary">{submitBtn} <IoIosArrowForward /></button>
				</form>
			</div>
		</div>
	)
}

export default ContactForm

ContactForm.propTypes = {
    submitMsgSuccess: PropTypes.string,
    fieldName: PropTypes.string,
    fieldEmail: PropTypes.string,
    fieldMessage: PropTypes.string,
    submitBtn: PropTypes.string,
}

ContactForm.defaultProps = {
    submitMsgSuccess: null,
    fieldName: null,
    fieldEmail: null,
    fieldMessage: null,
    submitBtn: null,
}