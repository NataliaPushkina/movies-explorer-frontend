import "./ModalWindow.css";

const ModalWindow = ({
  isInfoTooltipPopupOpened,
  isConfirmWindowOpened,
  onClose,
  onOverlay,
  children,
}) => {
  return (
    <section
      onClick={onOverlay}
      className={`modal-window ${
        (isInfoTooltipPopupOpened || isConfirmWindowOpened) ? "modal-window_opened" : ""
      }`}
    >
      <div className="modal-window__container">
        <button
          type="button"
          className="button modal-window__close-btn"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </section>
  );
};

export default ModalWindow;
