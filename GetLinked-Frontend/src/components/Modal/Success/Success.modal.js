import React from "react";
import "./success.modal.css";
import successfulMan from "../../../assets/successful-man-3025713-2526911 1.svg";
import successfulDone from "../../../assets/successfully-done-5108472-4288033 1.svg";
import faintStar from "../../../assets/star-faint.svg";
import darkPurpleStar from "../../../assets/dark-purple-star.svg";
import PurpleStar from "../../../assets/purple-gradient-star.svg";
import emojiWink from "../../../assets/wink-emoji-woman-png 1.svg";

function SuccessModal({ component, onClose }) {
	return (
		<>
			<div className="success_modal_container">
				<img
					src={darkPurpleStar}
					alt="Dark Purple Star"
					className="success img_dark_purple_star"
				/>
				<div className="success_modal_content">
					{/* Image */}
					{component === "register" ? (
						<div className="success_modal_image">
							<img
								src={faintStar}
								alt="Faint star"
								className="success img_faint_star"
							/>
							<img
								src={successfulDone}
								alt="Successful Done"
								className=" success img_successful_done"
							/>
							<img
								src={successfulMan}
								alt="Successful Done"
								className="success img_successful_man"
							/>
						</div>
					) : (
						<div className="success_modal_image">
							<img
								src={faintStar}
								alt="Faint star"
								className="success img_faint_star"
							/>
							<img
								src={successfulDone}
								alt="Successful Done"
								className=" success img_successful"
							/>
						</div>
					)}

					{/* Info */}
					{component === "register" ? (
						<div className="success_modal_info">
							<h1>
								Congratulations <br /> you have successfully Registered!
							</h1>
							<div className="success_modal_subInfo">
								<p>
									Yes, it was easy and you did it! <br />
									check your mail box for next step
								</p>

								<img
									src={emojiWink}
									alt="Emoji Wink"
									className="success img_emoji_wink"
								/>
							</div>
						</div>
					) : (
						<div className="success_modal_info">
							<h1>
								Success <br /> your message has been sent!
							</h1>
							<div className="success_modal_subInfo">
								<p>
									Your message would be attended to and we will reach out to you
									accordingly
								</p>
							</div>
						</div>
					)}
					<button type="button" className="success_back_btn" onClick={onClose}>
						Back
					</button>
				</div>
				<img
					src={PurpleStar}
					alt="Purple Star"
					className="success img_purple_star"
				/>
			</div>
		</>
	);
}

export default SuccessModal;
