import React from "react";
import "./hero.css";
import curvedSTroke from "../../../../assets/curved-stroke.svg";
import HRViewer from "../../../../assets/man-wearing-smart-glasses-touching-virtual-screen 1.png";
import bubble from "../../../../assets/bubble.svg";
import brightStar from "../../../../assets/star-bright.svg";
import faintStar from "../../../../assets/star-faint.svg";
import bulb from "../../../../assets/bulb.svg";
import chain from "../../../../assets/chain.svg";
import pow from "../../../../assets/pow.svg";
import { useWindowSize } from "react-hooks-window-size";

function HeroContent() {
	const size = useWindowSize();
	const desktop = size.width > 968;

	return (
		<>
			<div className="gl_hero">
				<h3>Igniting a Revolution in HR Innovation</h3>
				<img
					src={curvedSTroke}
					alt="curved stroke"
					className="hero img_stroke"
				/>
				<img
					src={brightStar}
					alt="Bright star"
					className="hero img_bright_star"
				/>
				<img src={faintStar} alt="Faint star" className="hero img_faint_star" />
				<img src={bulb} alt="Bulb" className="hero img_bulb" />
				<img src={chain} alt="Chain" className="hero img_chain" />
				<img src={pow} alt="Pow" className="hero img_pow" />
				<img src={faintStar} alt="Faint" className="hero img_faint_star2" />

				<div className="gl_hero_container">
					<div className="gl_hero_left">
						{desktop ? (
							<h1>
								getlinked Tech <br />
								Hackathon <span className="colored_span">1.0</span>
							</h1>
						) : (
							<h1>
								getlinked Tech <br />
								Hackathon{" "}
								<span className="colored_span">
									1.0
									<img
										src={chain}
										alt="Chain"
										className="hero mobile_img_chain"
									/>
									<img src={pow} alt="Pow" className="hero mobile_img_pow" />
								</span>
							</h1>
						)}
						<p>
							Participate in getlinked tech Hackathon 2023 stand a chance to win
							a Big prize
						</p>
						<button>
							<span>Register</span>
						</button>
						<div className="gr_hero_countdown_clock">
							<p>
								00<span className="_clock_indicator">H</span>
							</p>
							<p>
								00<span className="_clock_indicator">M</span>
							</p>
							<p>
								00<span className="_clock_indicator">S</span>
							</p>
						</div>
					</div>
					<div className="gl_hero_right">
						<div className="gl_hero_right_images">
							<img src={HRViewer} alt="HR" />
							<img src={bubble} alt="Bubble" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default HeroContent;
