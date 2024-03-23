import React from "react";
import "./intro.css";
import purpleStar from "../../../../assets/bright-purple-star.svg";
import curvedArrow from "../../../../assets/curved_arrow.svg";
import purpleStar2 from "../../../../assets/dark-purple-star.svg";

function IntroContent() {
	return (
		<>
			<div className="gl_intro">
				<div className="gl_intro_container">
					<div className="gl_intro_left">
						<p>
							The Big <br />
							Idea!
						</p>
						<img
							src={purpleStar}
							alt="Purple star"
							className="intro img_purple_star"
						/>
						<img
							src={curvedArrow}
							alt="Curved arrow"
							className="intro img_curved_arrow"
						/>
					</div>
					<div className="gl_intro_right">
						<h1>
							Introduction to getlinked <br />
							<span className="colored_span">tech Hackathon 1.0</span>
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
							src={purpleStar2}
							alt="Purple star"
							className="intro img_purple_star2"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default IntroContent;
