import "./header.css";
import React, { useCallback, useEffect, useState } from "react";
import navbarMenu from "./navList";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import getLinkedLogo from "../../assets/getlinked.svg";
import { IoClose } from "react-icons/io5";
import menuIcon from "../../assets/menu-icon.svg";
import { useWindowSize } from "react-hooks-window-size";

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const [myLocation, setMyLocation] = useState("");
	const [isNavExpanded, setIsNavExpanded] = useState(false);
	const size = useWindowSize();
	const desktop = size.width > 968;

	const getCurrentTitle = useCallback(() => {
		const header = location.pathname.split("/")[1];
		setMyLocation(header);
	}, [location.pathname]);

	useEffect(() => {
		getCurrentTitle();
	}, [getCurrentTitle]);

	return (
		<>
			{/* Mobile Nav */}
			{isNavExpanded && (
				<header className={`mobile_gl_header ${myLocation}`}>
					<div className="mobile_navbar_menu">
						<div className="navbar_links">
							{navbarMenu.map((item, index) => (
								<NavLink
									to={item.path}
									key={index}
									className="navbar_link"
									activeclassname="active"
								>
									<div className="navbar_name">{item.name}</div>
								</NavLink>
							))}
						</div>

						<button
							className={`mobile_btn-flip ${myLocation}`}
							onClick={() => navigate("/register")}
						>
							Register
						</button>
					</div>
				</header>
			)}

			{/* Desktop Nav */}
			<header className={`gl_header ${myLocation}`}>
				<div className="gl_logo">
					<img
						src={getLinkedLogo}
						alt="getlinked logo"
						onClick={() => navigate("/")}
					/>
				</div>

				<div className="navbar_menu">
					<div className="navbar_links">
						{navbarMenu.map((item, index) => (
							<NavLink
								to={item.path}
								key={index}
								className="navbar_link"
								activeclassname="active"
							>
								<div className="navbar_name">{item.name}</div>
							</NavLink>
						))}
					</div>

					<a
						className={`btn-flip ${myLocation}`}
						data-back="Register"
						data-front="Register"
						onClick={() => navigate("/register")}
					></a>
				</div>

				{isNavExpanded ? (
					<IoClose
						className="close_menu_icon_mobile"
						onClick={() => {
							setIsNavExpanded(!isNavExpanded);
						}}
					/>
				) : (
					<img
						src={menuIcon}
						alt="Menu icon"
						className="open_menu_icon_mobile"
						onClick={() => {
							setIsNavExpanded(!isNavExpanded);
						}}
					/>
				)}
			</header>
		</>
	);
}

export default Header;
