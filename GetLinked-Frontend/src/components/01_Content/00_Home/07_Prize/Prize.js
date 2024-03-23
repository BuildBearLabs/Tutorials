import React from "react";
import "./prize.css";
import {
	faintStar,
	brightStar,
	prizeCup,
	purpleGradientStar,
} from "../../../../assets";

function PrizeContent() {
	return (
		<>
			<div className="gl_prize">
				<div className="gl_prize_container">
					<div className="gl_prize_container_left">
						<img
							src={brightStar}
							alt="bright star"
							className="prize img_left_bright_star1"
						/>
						<img
							src={brightStar}
							alt="bright star"
							className="prize img_left_bright_star2"
						/>
						<img
							src={purpleGradientStar}
							alt="purple star"
							className="prize img_left_purple_gradient_star"
						/>
						<img
							src={prizeCup}
							alt="Prize cup"
							className="prize img_prize_cup"
						/>
					</div>
					<div className="gl_prize_container_right">
						<img
							src={brightStar}
							alt="bright star"
							className="prize img_right_bright_star1"
						/>
						<img
							src={brightStar}
							alt="bright star"
							className="prize img_right_bright_star2"
						/>
						<img
							src={purpleGradientStar}
							alt="purple star"
							className="prize img_right_purple_gradient_star"
						/>
						<img
							src={faintStar}
							alt="faint star"
							className="prize img_right_faint_star1"
						/>
						<img
							src={faintStar}
							alt="faint star"
							className="prize img_right_faint_star2"
						/>
						<div className="gl_prize_right_header">
							<h1>
								Prizes and <br />
								<span>Rewards</span>
							</h1>
							<p>
								Highlight of the prizes or rewards for winners and for
								participants.
							</p>
						</div>
						<div className="gl_prize_right_content">
							<div className="rewards">
								<div className="overlap-10">
									<div className="element-position">
										<div className="overlap-group-2">
											<div className="rectangle-4" />
											<img
												className="silver-medal"
												alt="Silver medal"
												src="https://c.animaapp.com/zMz5XxGb/img/silver-medal-1@2x.png"
											/>
											<div className="text-wrapper-36">2nd</div>
											<div className="text-wrapper-37">Runner</div>
											<div className="text-wrapper-38">N300,000</div>
										</div>
									</div>
									<div className="element-rd-position">
										<div className="overlap-11">
											<div className="rectangle-5" />
											<img
												className="bronze-medal"
												alt="Bronze medal"
												src="https://c.animaapp.com/zMz5XxGb/img/bronze-medal-1@2x.png"
											/>
											<div className="text-wrapper-39">3rd</div>
											<div className="text-wrapper-40">Runner</div>
											<div className="text-wrapper-41">N150,000</div>
										</div>
									</div>
									<div className="element-st-position">
										<div className="overlap-12">
											<div className="rectangle-6" />
											<img
												className="gold-medal"
												alt="Gold medal"
												src="https://c.animaapp.com/zMz5XxGb/img/gold-medal-1@2x.png"
											/>
											<div className="text-wrapper-42">1st</div>
											<div className="text-wrapper-43">Runner</div>
											<div className="text-wrapper-44">N400,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PrizeContent;
