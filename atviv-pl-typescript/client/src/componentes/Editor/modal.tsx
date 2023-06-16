import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

class Modal extends React.Component<ModalProps> {
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscapeKey);
  }

  handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
