import ModalWindow from "../ModalWindow/ModalWindow";
import "./ConfirmWindow.css";

function ConfirmWindow({ isConfirmWindowOpened, onClose, onSubmitConfirm, onOverlay }) {
  const handleSubmitConfirm = (e) => {
    e.preventDefault();
    onSubmitConfirm();
  };
  return (
    <ModalWindow isConfirmWindowOpened={isConfirmWindowOpened} onClose={onClose} onOverlay={onOverlay}>
      <h2 className="modal-window__title">
        Уверены, что хотите удалить фильм?
      </h2>
      <button
        className="modal-window__confirm-btn"
        type="submit"
        onSubmit={(e) => handleSubmitConfirm(e)}
      > Да!
      </button>
    </ModalWindow>
  );
}

export default ConfirmWindow;
