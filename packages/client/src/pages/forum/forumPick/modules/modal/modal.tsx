import { useState } from 'react';
import { useGetUserInfoQuery } from '../../../../../store/api/yadnex/auth/authApi';
import { useAddTopicsMutation } from '../../../../../store/api/yadnex/forum/forumApi';
import styles from './modal.module.scss';

interface IModalProps {setIsModalHidden: (a: boolean) => void, topicChange: () => void}

const Modal: React.FC<IModalProps> = ({setIsModalHidden, topicChange}) => {
  const [textState, setTextState] = useState<string>("");

  const addTopicQuery = useAddTopicsMutation()
  const {data} = useGetUserInfoQuery();

  function submitEvent(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!textState.trim()) {
      alert("Enter the title")
      return
    }
    (async () => {
      if (!data?.id) return
      await addTopicQuery[0](
        {
          title: textState,
          creatorUserId: data?.id
        }
      )
      topicChange()
    })()
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
