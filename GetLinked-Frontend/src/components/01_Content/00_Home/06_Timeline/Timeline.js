import React from "react";
import "./timeline.css";
import { faintStar, brightStar, darkPurpleStar } from "../../../../assets";

function TimelineContent() {
	return (
		<>
			<div className="gl_timeline">
				<div className="gl_timeline_container">
					<div className="overlap-13">
						<div className="timeline">
							<div className="text-wrapper-46">Timeline</div>
							<img
								className="timeline_lines line-15"
								alt="Line"
								src="https://c.animaapp.com/zMz5XxGb/img/line-3.svg"
							/>
							<img
								className="timeline_lines line-16"
								alt="Line"
								src="https://c.animaapp.com/zMz5XxGb/img/line-4.svg"
							/>
							<img
								className="timeline_lines line-17"
								alt="Line"
								src="https://c.animaapp.com/zMz5XxGb/img/line-4.svg"
							/>
							<img
								className="timeline_lines line-18"
								alt="Line"
								src="https://c.animaapp.com/zMz5XxGb/img/line-4.svg"
							/>
							<img
								className="timeline_lines line-19"
								alt="Line"
								src="https://c.animaapp.com/zMz5XxGb/img/line-4.svg"
							/>
							<img
								className="timeline_lines line-20"
								alt="Line"
								src="https://c.animaapp.com/zMz5XxGb/img/line-4.svg"
							/>
							<div className="timeline_text_wrapper text-wrapper-47">
								Hackathon Announcement
							</div>
							<div className="timeline_text_wrapper text-wrapper-48">
								Teams Registration ends
							</div>
							<p className="timeline_text_wrapper text-wrapper-49">
								Getlinked Hackathon 1.0 Officially Begins
							</p>
							<div className="timeline_text_wrapper text-wrapper-50">
								Teams Registration begins
							</div>
							<p className="timeline_text_wrapper announcement-of-the">
								Announcement of the accepted teams and ideas
							</p>
							<div className="timeline_text_wrapper text-wrapper-51">
								Demo Day
							</div>
							<p className="timeline_text_content the-getlinked-tech">
								The getlinked tech hackathon 1.0 is formally announced
								<br />
								to the general public and teams begin to get ready to register
							</p>
							<p className="timeline_text_content interested-teams-can">
								Interested teams can now show their interest in the
								<br />
								getlinked tech hackathon 1.0 2023 by proceeding to register
							</p>
							<p className="timeline_text_content interested">
								Interested Participants are no longer Allowed to
								<br />
								register
							</p>
							<p className="timeline_text_content accepted-teams-can">
								Accepted teams can now proceed to build their
								<br />
								ground breaking skill driven solutions
							</p>
							<p className="timeline_text_content all-teams-whom-idea">
								All teams whom idea has been accepted into getlinked tech
								hackathon 1.0 2023 are formally announced
							</p>
							<p className="timeline_text_content teams-get-the">
								Teams get the opportunity to pitch their projects to judges. The
								winner of the hackathon will also be announced on this day
							</p>
							<div className="timeline_text_wrapper text-wrapper-52">
								November 18, 2023
							</div>
							<div className="timeline_text_wrapper text-wrapper-53">
								November 18, 2023
							</div>
							<div className="timeline_text_wrapper text-wrapper-54">
								November 18, 2023
							</div>
							<div className="timeline_text_wrapper text-wrapper-55">
								November 18, 2023
							</div>
							<div className="timeline_text_wrapper text-wrapper-56">
								November 18, 2023
							</div>
							<div className="timeline_text_wrapper text-wrapper-57">
								November 18, 2023
							</div>
							<div className="no no-1">
								<div className="overlap-group-3">
									<div className="text-wrapper-58">1</div>
								</div>
							</div>
							<div className="no no-2">
								<div className="overlap-group-3">
									<div className="text-wrapper-58">2</div>
								</div>
							</div>
							<div className="no no-3">
								<div className="overlap-group-3">
									<div className="text-wrapper-58">3</div>
								</div>
							</div>
							<div className="no no-4">
								<div className="overlap-group-3">
									<div className="text-wrapper-58">4</div>
								</div>
							</div>
							<div className="no no-5">
								<div className="overlap-group-3">
									<div className="text-wrapper-58">5</div>
								</div>
							</div>
							<div className="no no-6">
								<div className="overlap-group-3">
									<div className="text-wrapper-58">6</div>
								</div>
							</div>
							<img
								className="timeline_stars star-24"
								alt="Star"
								src={faintStar}
							/>
							<img
								className="timeline_stars star-25"
								alt="Star"
								src={brightStar}
							/>
							<img
								className="timeline_stars star-pu-7"
								alt="Star pu"
								src={darkPurpleStar}
							/>
						</div>
						<p className="here-is-the">
							Here is the breakdown of the time we anticipate <br />
							using for the upcoming event.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default TimelineContent;
