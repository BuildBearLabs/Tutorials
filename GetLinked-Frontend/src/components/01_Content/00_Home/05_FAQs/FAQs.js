import React from "react";
import "./faqs.css";
import {
	faintStar,
	brightStar,
	darkPurpleStar,
	purpleGradientStar,
	qn1,
	qn2,
	faqMan,
} from "../../../../assets";

function FAQsContent() {
	return (
		<>
			<div className="gl_faqs">
				<div className="gl_faqs_container">
					{/* Left */}
					<div className="gl_faqs_left">
						<img
							src={darkPurpleStar}
							alt="Dark Purple Star"
							className="faqs img_dark_purple_star"
						/>
						<h1>
							Frequently Asked <br /> <span>Question</span>
						</h1>
						<p>
							We got answers to the questions that you might want to ask about
							<span> getlinked Hackathon 1.0</span>
						</p>

						<div className="gl_faqs_qns">
							<p>Can I work on a project I started before the hackathon?</p>
							<span>+</span>
						</div>
						<div className="gl_faqs_qns">
							<p>What happens if I need help during the hackathon?</p>
							<span>+</span>
						</div>
						<div className="gl_faqs_qns">
							<p>What happens if I don't have an idea for a project?</p>
							<span>+</span>
						</div>
						<div className="gl_faqs_qns">
							<p>Can I join a team or do I have to come with one?</p>
							<span>+</span>
						</div>
						<div className="gl_faqs_qns">
							<p>What happens after the hackathon ends</p>
							<span>+</span>
						</div>
						<div className="gl_faqs_qns">
							<p>Can I work on a project I started before the hackathon?</p>
							<span>+</span>
						</div>
					</div>

					{/* Right */}
					<div className="gl_faqs_right">
						<img src={faintStar} alt="FAQs" className="faqs faint_star" />
						<img src={brightStar} alt="FAQs" className="faqs bright_star" />
						<img
							src={purpleGradientStar}
							alt="FAQs"
							className="faqs gradient_star_1"
						/>
						<img
							src={purpleGradientStar}
							alt="FAQs"
							className="faqs gradient_star_2"
						/>
						<img src={qn1} alt="FAQs" className="gl_faqs_qn_1a" />
						<img src={qn2} alt="FAQs" className="gl_faqs_qn_2" />
						<img src={qn1} alt="FAQs" className="gl_faqs_qn_1b" />
						<img src={faqMan} alt="FAQs" className="gl_faqs_qn_man" />
					</div>
				</div>
			</div>
		</>
	);
}

export default FAQsContent;
