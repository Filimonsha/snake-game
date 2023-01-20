import React from 'react'
import styles from './avatarModal.module.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface IProps {
  isShown: boolean;
  handleClose: () => void;
  handleSave: () => void;
  handleDelete: () => void;
}

const AvatarModal: React.FC<IProps> = ({ isShown, handleClose, handleSave, handleDelete }) => {

  return(
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set your avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='file' />
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <div>
            <Button variant="danger" className={styles.buttonDanger} onClick={handleDelete}>
              Delete avatar
            </Button>
          </div>
          <div className={styles.buttonGroup}>
            <Button variant="primary" className={styles.buttonSave} onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" className={styles.buttonCancel} onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AvatarModal
