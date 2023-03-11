import React, { FormEvent, useRef } from 'react'
import styles from './avatarModal.module.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { useChangeAvatarMutation, useDeleteAvatarMutation } from '../../../../../../store/api/yadnex/profile/profileApi'

interface IProps {
  isShown: boolean;
  handleClose: () => void;
}

const AvatarModal: React.FC<IProps> = ({ isShown, handleClose }) => {
  
  const avatarRef = useRef<HTMLInputElement>(null);
  const [changeAvatar] = useChangeAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();
  
  const getAvatar = () => {
    
    if (!avatarRef || !avatarRef.current?.files?.length) {
      toast.error('No file attached');
      return;
    }
    
    const file = avatarRef.current.files[0];
    const formData = new FormData()
    formData.append('avatar', file)
    
    return formData;
  }
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    
    event.preventDefault()
    const formData = getAvatar();
    
    if (!formData) {
      return;
    }
    
    try {
      const res = await changeAvatar(formData);
    
      if ('data' in res) {
        toast.success('Avatar has been updated');
        handleClose();
      } else {
        throw new Error('Cannot update avatar')
      }
      
    } catch (error) {
      toast.error(`${error}`);
    }
  }
  
  const handleDelete = async () => {
    try {
      const res = await deleteAvatar();
    
      if ('data' in res) {
        toast.success('Avatar has been deleted');
        handleClose();
      } else {
        throw new Error('Cannot delete avatar')
      }
      
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return(
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set your avatar</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              ref={avatarRef}
              name='avatar'
              type='file'
              accept='image/jpeg, image/png'
            />
          </Modal.Body>
          <Modal.Footer className={styles.footer}>
            <div>
              <Button 
                variant='danger'
                className={styles.buttonDanger}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
            <div className={styles.buttonGroup}>
              <Button 
                variant='primary'
                type='submit'
                className={styles.buttonSave}
              >
                  Save
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AvatarModal
