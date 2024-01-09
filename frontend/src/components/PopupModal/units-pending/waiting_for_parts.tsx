import React from "react";
import { IPopupModal } from "../../../../utils/interfaces";

function WaitingForPartsModal({
  isVisible = false,
  title,
  content,
  footer,
  onClose,
}: IPopupModal) {
  const keydownHandler = ({ key }: { key: string | number }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className="popup-modal" onClick={onClose}>
      <div className="popup-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="popup-modal-header">
          <h3 className="popup-modal-title">{title}</h3>
          <span className="popup-modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="popup-modal-body">
          <div className="popup-modal-content">{content}</div>
        </div>
        {footer && <div className="popup-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default WaitingForPartsModal;
