import React, { useState, useEffect } from "react";
import "./contact.css";
import instagram from "../../../../assets/instagram.svg";
import x from "../../../../assets/x.svg";
import facebook from "../../../../assets/facebook.svg";
import linkedIn from "../../../../assets/linkedin.svg";
import PurpleStar from "../../../../assets/purple-gradient-star.svg";
import faintStar from "../../../../assets/star-faint.svg";
import brightStar from "../../../../assets/star-bright.svg";
import darkPurpleStar from "../../../../assets/dark-purple-star.svg";
import Modal from "../../../Modal/Modal";
import SuccessModal from "../../../Modal/Success/Success.modal";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-hooks-window-size";

function ContactContent() {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const size = useWindowSize();
	const desktop = size.width > 968;

	useEffect(() => {
		document.title = "GetLinked | Contact";
	});

	const handleSubmitForm = (e) => {
		e.preventDefault();
		setShowModal(true);
		setModalContent(
			<SuccessModal component="contact" onClose={() => setShowModal(false)} />
		);
	};

	return (
		<>
			<div className="gl_contact">
				<div className="gl_contact_container">
					<img
						src={PurpleStar}
						alt="PurpleStar"
						className="contact img_purple_star"
					/>
					<div className="gl_contact_info">
						<h1>Get in touch</h1>
						<p>Contact Information</p>
						<p>27, Alara Street Yaba 100012 Lagos State</p>
						<p>Call Us : 07067981819</p>
						<p>we are open from Monday-Friday 08:00am - 05:00pm</p>
						<div className="gl_contact_media_div">
							<p>Share on</p>
							<div className="gl_contact_media_icons">
								<img src={instagram} alt="instagram" />
								<img src={x} alt="x" />
								<img src={facebook} alt="facebook" />
								<img src={linkedIn} alt="linkedIn" />
							</div>
						</div>
					</div>
					<div className="gl_contact_form">
						<img
							src={faintStar}
							alt="Faint star"
							className="contact img_faint_star"
						/>
						<img
							src={brightStar}
							alt="Bright Star"
							className="contact img_bright_star"
						/>
						<img
							src={darkPurpleStar}
							alt="Dark Purple star"
							className="contact img_dark_purple_star"
						/>
						<div className="gl_contact_form_container">
							<IoChevronBackCircleOutline
								className="contact go_home"
								onClick={() => navigate("/")}
							/>
							<form className="gl_contact_form_inner">
								<p>Questions or need assistance?</p>
								<p>Let us know about it!</p>
								<h5>Email us below to any question related to our event</h5>
								{desktop ? (
									<input
										type="text"
										className="gl_contact_form_input"
										placeholder="First Name"
									/>
								) : (
									<input
										type="text"
										className="gl_contact_form_input"
										placeholder="Team's Name"
									/>
								)}
								{!desktop && (
									<input
										type="text"
										className="gl_contact_form_input"
										placeholder="Topic"
									/>
								)}
								<input
									type="email"
									className="gl_contact_form_input"
									placeholder={desktop ? "Mail" : "Email"}
								/>
								<textarea
									className="gl_contact_form_input textarea"
									placeholder="Message"
								/>
								<div className="gl_contact_form_submit">
									<button
										type="submit"
										className="contact_submit_btn"
										onClick={handleSubmitForm}
									>
										Submit
									</button>
								</div>
								{!desktop && (
									<div className="gl_contact_media_div_form">
										<p>Share on</p>
										<div className="gl_contact_media_icons">
											<img src={instagram} alt="instagram" />
											<img src={x} alt="x" />
											<img src={facebook} alt="facebook" />
											<img src={linkedIn} alt="linkedIn" />
										</div>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>

			{showModal && <Modal modalContent={modalContent} />}
		</>
	);
}

export default ContactContent;
