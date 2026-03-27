import { useEffect } from "react";
import "../modal/modal.scss";
import successIcon from "../../assets/new.png";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  message = "Изменения сохранены!",
}: Props) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-success">
          <div className="success-icon">
            <img src={successIcon} alt="" />
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
