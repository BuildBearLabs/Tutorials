import React from "react";
import "./footer.css";
import { instagram, x, facebook, linkedIn } from "../../assets";

function Footer() {
	return (
		<>
			<div className="gl_footer">
				<div className="gl_footer_container">
					<div className="footer_overlap-5">
						<div className="footer_overlap-6">
							<div className="rectangle-2" />
							<div className="footer-contents">
								<p className="div-2">
									<span className="footer span">get</span>
									<span className="footer text-wrapper-8">linked</span>
								</p>
								<div className="overlap-8">
									<img
										className="line-14"
										alt="Line"
										src="https://c.animaapp.com/zMz5XxGb/img/line-20.svg"
									/>
									<p className="terms-of-use-privacy">
										Terms of Use&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Privacy
										Policy
									</p>
								</div>
								<p className="getlinked-tech">
									Getlinked Tech Hackathon is a technology innovation program
									established by a group of organizations with the aim of
									showcasing young and talented individuals in the field of
									technology
								</p>
								<div className="overlap-9">
									<div className="useful-links-and">
										<div className="text-wrapper-25">Useful Links</div>
										<div className="text-wrapper-26">Contact Us</div>
										<div className="text-wrapper-27">Overview</div>
										<div className="text-wrapper-28">Timeline</div>
										<div className="text-wrapper-29">FAQs</div>
										<div className="text-wrapper-30">Register</div>
										<div className="text-wrapper-31">Follow us</div>
										<div className="social-media">
											<img src={instagram} alt="instagram" />
											<img src={x} alt="x" />
											<img src={facebook} alt="facebook" />
											<img src={linkedIn} alt="linkedIn" />
										</div>
									</div>
									<img
										className="group"
										alt="Group"
										src="https://c.animaapp.com/zMz5XxGb/img/group@2x.png"
									/>
									<img
										className="vector-2"
										alt="Vector"
										src="https://c.animaapp.com/zMz5XxGb/img/vector-1.svg"
									/>
									<div className="element-alara-street-yaba">
										27,Alara Street
										<br />
										Yaba 100012
										<br />
										Lagos State
									</div>
									<div className="text-wrapper-32">+234 679 81819</div>
								</div>
							</div>
							<img
								className="footer sata-gra-7"
								alt="Sata gra"
								src="https://c.animaapp.com/zMz5XxGb/img/sata-gra-1@2x.png"
							/>
							<img
								className="footer star-16"
								alt="Star"
								src="https://c.animaapp.com/zMz5XxGb/img/star-5@2x.png"
							/>
							<img
								className="footer star-17"
								alt="Star"
								src="https://c.animaapp.com/zMz5XxGb/img/star-4@2x.png"
							/>
							<img
								className="footer star-18"
								alt="Star"
								src="https://c.animaapp.com/zMz5XxGb/img/star-4@2x.png"
							/>
							<p className="text-wrapper-33">
								All rights reserved. © getlinked Ltd.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Footer;
