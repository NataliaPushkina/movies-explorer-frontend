import ModalWindow from "../ModalWindow/ModalWindow";
import "./InfoTooltip.css";

function InfoTooltip({
  isInfoTooltipPopupOpened,
  onClose,
  onOverlay,
  message
}) {
  return (
    <ModalWindow
      isInfoTooltipPopupOpened={isInfoTooltipPopupOpened}
      onClose={onClose}
      onOverlay={onOverlay}
    >
      <h1 className="modal-window__title">{message}</h1>
    </ModalWindow>
  );
}

export default InfoTooltip;
