import React from 'react'
import styles from './avatarModal.module.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface Modal {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  handleDelete: () => void;
}

const AvatarModal: React.FC<Modal> = (props: Modal) => {
  const {
    show,
    handleClose,
    handleSave,
    handleDelete
  } = props;

  return(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set your avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='file' />
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <div>
            <Button variant="danger" onClick={handleDelete}>
              Delete avatar
            </Button>
          </div>
          <div className={styles.button_group}>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AvatarModal
