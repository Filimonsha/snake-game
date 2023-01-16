import React, {useEffect, useRef, useState} from 'react';
import styles from './scss/forumPick.module.scss';
import { Link } from 'react-router-dom';
import { MOCK_ARRAY } from './mockList'

interface IForumList {id: string, title: string}

const ForumPick = () => {

  const [textState, setTextState] = useState<string>("");
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [forumList, setForumList] = useState<IForumList[]>([]);

  function showModalEvent() {
    setIsHidden(false)
  }
  
  function submitEvent(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!textState) {
      alert("Enter the title")
      return
    }
    alert(`Forum with the title "${textState}" was created`)
    setIsHidden(true)
    setTextState("")
  }
  
  function cancelEvent() {
    setIsHidden(true)
    setTextState("")
  }

  function changeEvent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextState(e.target.value)
  }

  useEffect(() => {
    document.title="Форум"
    setForumList(MOCK_ARRAY)
  }, [])

  return (
    <div className={styles.forumListContainer}>
      <div className={styles.modalWrapper} style={{display: isHidden ? "none" : "flex"}}>
        <form className={styles.modal}>
          <h2 className={styles.title}>Enter forum's title</h2>
          <textarea value={textState} onChange={changeEvent} className={styles.textBlock} name="forumName" placeholder="Forum's title"></textarea>
          <button type="submit" className={styles.add} onClick={submitEvent}>Submit</button>
          <button type="button" className={styles.cancel} onClick={cancelEvent}>Cancel</button>
        </form>
      </div>
      <div className={styles.forumList}>
        <div onClick={showModalEvent} className={styles.link}>
          <p className={styles.addLabel}>
            Add a new forum
          </p>
        </div>
        {
          !forumList.length ? 
          <span className={styles.noChats}>There are no forums yet</span> : 
          forumList.map(forum => (
            <Link to={forum.id} className={styles.link} key={forum.id}>
              <p>
                {forum.title}
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default ForumPick
