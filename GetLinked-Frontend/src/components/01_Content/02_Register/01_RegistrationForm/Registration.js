import React, { useState, useEffect } from "react";
import "./registration.css";
import PurpleStar from "../../../../assets/purple-gradient-star.svg";
import faintStar from "../../../../assets/star-faint.svg";
import brightStar from "../../../../assets/star-bright.svg";
import darkPurpleStar from "../../../../assets/dark-purple-star.svg";
import registrationImage from "../../../../assets/3d-graphic-designer-showing-thumbs-up-png 1.svg";
import registerFormIcon from "../../../../assets/register-form-icon.png";
import Modal from "../../../Modal/Modal";
import SuccessModal from "../../../Modal/Success/Success.modal";

function RegistrationContent() {
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	useEffect(() => {
		document.title = "GetLinked | Register";
	});

	const handleSubmitForm = (e) => {
		e.preventDefault();
		setShowModal(true);
		setModalContent(
			<SuccessModal component="register" onClose={() => setShowModal(false)} />
		);
	};

	return (
		<>
			<div className="gl_register">
				<div className="gl_register_container">
					<img
						src={PurpleStar}
						alt="PurpleStar"
						className="register img_purple_star"
					/>
					<img
						src={faintStar}
						alt="Faint star"
						className="register img_faint_star"
					/>
					<img
						src={darkPurpleStar}
						alt="Dark Purple star"
						className="register img_dark_purple_star"
					/>
					{/* Image */}
					<div className="gl_registration_image">
						<img
							src={registrationImage}
							alt="Registration Image"
							className="gl_registration_image_inner"
						/>
					</div>

					{/* Form */}
					<div className="gl_register_form">
						<img
							src={faintStar}
							alt="Faint star"
							className="register img_faint_star2"
						/>
						<img
							src={brightStar}
							alt="Bright Star"
							className="register img_bright_star"
						/>
						<div className="gl_register_form_container">
							<form className="gl_register_form_inner">
								<h1>Register</h1>
								<div className="gl_register_form_inner_bottom">
									<div className="gl_movement_div">
										<p className="gl_part_of_move_p">
											Be part of this movement!
										</p>
										<img
											src={registerFormIcon}
											alt="Part of the movement"
											className="register_form_icon"
										/>
									</div>
									<p className="gl_create_account_p">CREATE YOUR ACCOUNT</p>

									<div className="gl_register_inner_form_container">
										{/* Left */}
										<div className="gl_register_left_form_div">
											<div className="gl_register_left_form_div_items">
												<label htmlFor="teamName">Team’s Name</label>
												<input
													type="text"
													name="teamName"
													placeholder="Enter the name of your group"
												/>
											</div>
											<div className="gl_register_left_form_div_items">
												<label htmlFor="email">Email</label>
												<input
													type="email"
													name="email"
													placeholder="Enter your email address"
												/>
											</div>
											<div className="gl_register_left_form_div_items">
												<label htmlFor="category">Category</label>
												<select name="category" id="category">
													<option disabled selected hidden>
														Select your category
													</option>
													<option value="design">Design</option>
													<option value="development">Development</option>
													<option value="marketing">Marketing</option>
													<option value="business">Business</option>
												</select>
											</div>
										</div>

										{/* Right */}
										<div className="gl_register_right_form_div">
											<div className="gl_register_right_form_div_items">
												<label htmlFor="phone">Phone</label>
												<input
													type="phone"
													name="phone"
													placeholder="Enter your phone number"
												/>
											</div>
											<div className="gl_register_right_form_div_items">
												<label htmlFor="projectTopic">Project Topic</label>
												<input
													type="text"
													name="projectTopic"
													placeholder="What is your group project topic"
												/>
											</div>
											<div className="gl_register_right_form_div_items">
												<label htmlFor="groupSize">Group Size</label>
												<select name="groupSize" id="groupSize">
													<option disabled selected hidden>
														Select
													</option>
													<option value="1-5">1-5</option>
													<option value="6-10">6-10</option>
													<option value="11-15">11-15</option>
													<option value="16-20">16-20</option>
												</select>
											</div>
										</div>
									</div>

									<p className="gl_review_p">
										Please review your registration details before submitting
									</p>

									<div className="gl_agreement_div">
										<input type="checkbox" id="agreement" name="agreement" />
										<label htmlFor="agreement">
											I agreed with the event terms and conditions and privacy
											policy
										</label>
									</div>

									<div className="gl_register_form_submit">
										<button
											type="submit"
											className="register_submit_btn"
											onClick={handleSubmitForm}
										>
											Register Now
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{showModal && <Modal modalContent={modalContent} />}
		</>
	);
}

export default RegistrationContent;
