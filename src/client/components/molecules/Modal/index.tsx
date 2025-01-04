import styles from "./style.module.scss";

interface ModalProps {
  onCancel: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const { onCancel, children } = props;

  return (
    <div className={styles.modalContainer} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
