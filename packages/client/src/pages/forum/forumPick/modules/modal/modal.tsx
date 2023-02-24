import { useState } from 'react';
import styles from './modal.module.scss';

interface IModalProps {setIsModalHidden: (a: boolean) => void}

const Modal: React.FC<IModalProps> = ({setIsModalHidden}) => {
  const [textState, setTextState] = useState<string>("");

  function submitEvent(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!textState) {
      alert("Enter the title")
      return
    }
    alert(`Forum with the title "${textState}" was created`)
    setIsModalHidden(true)
    setTextState("")
  }

  function cancelEvent() {
    setIsModalHidden(true)
    setTextState("")
  }

  function changeEvent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextState(e.target.value)
  }

  return (
    <div className={styles.modalWrapper}>
      <form className={styles.modal}>
        <h2 className={styles.title}>Enter forum's title</h2>
        <textarea value={textState} onChange={changeEvent} className={styles.textBlock} name="forumName" placeholder="Forum's title"></textarea>
        <button type="submit" className={styles.add} onClick={submitEvent}>Submit</button>
        <button type="button" className={styles.cancel} onClick={cancelEvent}>Cancel</button>
      </form>
    </div>
  )
}

export default Modal
