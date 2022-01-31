import React from "react";

import { Modal } from "react-bootstrap";
const ModalComponent = ({
  show,
  size,
  close,
  headingText,
  body,
  titleColor = "black"
}) => {
  return (
    <Modal size={size} show={show} onHide={close} animation={false}>
      <Modal.Header>
        {/* <Modal.Title> */}
        <div>
          <p style={{ color: titleColor, fontSize: "22px" }}>{headingText}</p>
        </div>
        <div className="mb-3 closeModalButton" onClick={close}>
          <i className="far fa-times-circle fa-lg"></i>
        </div>
        {/* </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {/* <Modal.Footer>{footer}</Modal.Footer> */}
    </Modal>
  );
};

export default ModalComponent;
