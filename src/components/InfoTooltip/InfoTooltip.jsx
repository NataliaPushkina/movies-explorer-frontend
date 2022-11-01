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
      {props.registrationSuccess ? (
        <h2 className="modal-window__title">"Вы успешно зарегистрировались!"</h2>
      ) : (
        <h2 className="modal-window__title">
          "Что-то пошло не так! Попробуйте ещё раз."
        </h2>
      )}
    </ModalWindow>
  );
}

export default InfoTooltip;
