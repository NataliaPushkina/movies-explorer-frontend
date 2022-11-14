import ModalWindow from "../ModalWindow/ModalWindow";
import "./InfoTooltip.css";

function InfoTooltip({
  isInfoTooltipPopupOpened,
  onClose,
  onOverlay,

  ...props
}) {
  return (
    <ModalWindow
      isInfoTooltipPopupOpened={isInfoTooltipPopupOpened}
      onClose={onClose}
      onOverlay={onOverlay}
    >
      {props.updateSuccess ? (
        <h2 className="modal-window__title">"Данные обновлены!"</h2>
      ) : (
        <h2 className="modal-window__title">
          "Что-то пошло не так! Попробуйте ещё раз."
        </h2>
      )
      }
    </ModalWindow>
  );
}

export default InfoTooltip;
