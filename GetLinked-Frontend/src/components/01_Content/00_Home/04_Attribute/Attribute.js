import React from "react";
import "./attribute.css";
import {
	faintStar,
	brightStar,
	darkPurpleStar,
	ladyHallo,
	attributeLeftImage,
} from "../../../../assets";

function AttributeContent() {
	return (
		<>
			<div className="gl_attribute">
				<div className="gl_attribute_container">
					{/* Left */}
					<div className="gl_attribute_left">
						<img
							src={darkPurpleStar}
							alt="Bright Purple Star"
							className="attribute bright_purple_star"
						/>
						<img
							src={faintStar}
							alt="Faint Star"
							className="attribute faint_star"
						/>
						<img
							src={brightStar}
							alt="Bright Star"
							className="attribute bright_star"
						/>
						<img
							src={ladyHallo}
							alt="Lady Hallo"
							className="attribute img_left_lady_hallo"
						/>
						<img
							src={attributeLeftImage}
							alt="Attribute Left Image"
							className="attribute img_left_image"
						/>
					</div>

					{/* Right */}
					<div className="gl_attribute_right">
						<h1 className="judging_criteria">Judging Criteria</h1>
						<h1 className="key_attributes"> Key attributes</h1>
						<div className="gl_attribute_right_info_div">
							<p>
								<span className="attribute_header_span">
									Innovation and Creativity
								</span>
								: Evaluate the uniqueness and creativity of the solution.
								Consider whether it addresses a real-world problem in a novel
								way or introduces innovative features.
							</p>
						</div>
						<div className="gl_attribute_right_info_div">
							<p>
								<span className="attribute_header_span">Functionality</span>:
								Assess how well the solution works. Does it perform its intended
								functions effectively and without major issues? Judges would
								consider the completeness and robustness of the solution.
							</p>
						</div>
						<div className="gl_attribute_right_info_div">
							<p>
								<span className="attribute_header_span">
									Impact and Relevance
								</span>
								: Determine the potential impact of the solution in the real
								world. Does it address a significant problem, and is it relevant
								to the target audience? Judges would assess the potential
								social, economic, or environmental benefits.
							</p>
						</div>
						<div className="gl_attribute_right_info_div">
							<p>
								<span className="attribute_header_span">
									Technical Complexity
								</span>
								: Evaluate the technical sophistication of the solution. Judges
								would consider the complexity of the code, the use of advanced
								technologies or algorithms, and the scalability of the solution.
							</p>
						</div>
						<div className="gl_attribute_right_info_div last">
							<p>
								<span className="attribute_header_span">
									Adherence to Hackathon Rules
								</span>
								: Judges will Ensure that the team adhered to the rules and
								guidelines of the hackathon, including deadlines, use of
								specific technologies or APIs, and any other
								competition-specific requirements.
							</p>
						</div>
						<div className="read_more_attribute_div">
							<button type="button">Read More</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AttributeContent;
