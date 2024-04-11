import "./modal.css";
import React from "react";

function Modal({ modalContent }) {
	return (
		<>
			<div className="modal">{modalContent}</div>
		</>
	);
}

export default Modal;
