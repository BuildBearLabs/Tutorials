import React from "react";
import "./rules.css";
import brightStar from "../../../../assets/star-bright.svg";
import faintStar from "../../../../assets/star-faint.svg";
import Ellipse from "../../../../assets/Ellipse-1.svg";

function RuleContent() {
	return (
		<>
			<div className="gl_rules">
				<div className="gl_rules_container">
					<div className="gl_rules_left">
						<h1>
							Rules and <br />
							<span className="colored_span">Guidelines</span>
						</h1>
						<p>
							Our tech hackathon is a melting pot of visionaries, and its
							purpose is as clear as day: to shape the future. Whether you're a
							coding genius, a design maverick, or a concept wizard, you'll have
							the chance to transform your ideas into reality. Solving
							real-world problems, pushing the boundaries of technology, and
							creating solutions that can change the world, that's what we're
							all about!
						</p>
						<img
							src={faintStar}
							alt="Faint star"
							className="rules img_faint_star"
						/>
						<img
							src={brightStar}
							alt="Bright star"
							className="rules img_bright_star"
						/>
					</div>
					<div className="gl_rules_right"></div>
					<img src={Ellipse} alt="Ellipse" className="rules img_ellipse1" />
				</div>
			</div>
		</>
	);
}

export default RuleContent;
