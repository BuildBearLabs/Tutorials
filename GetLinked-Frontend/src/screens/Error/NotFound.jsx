import "./notFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();

	return (
		<>
			<div className="error-page">
				<h1>
					4
					<lord-icon
						src="https://cdn.lordicon.com/bmnlikjh.json"
						trigger="loop"
						delay="2000"
						colors="primary:#fe34b9"
						style={{ width: "130px", height: "130px" }}
					></lord-icon>
					4
				</h1>
				<h4 className="error-page-text">Page not found</h4>
				<button className="go-back-home-btn" onClick={() => navigate("/")}>
					Back to Home
				</button>
			</div>
		</>
	);
}

export default NotFound;
