import React, {useEffect, useRef, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link } from 'react-router-dom';
const ForumPick = () => {

  useEffect(() => {
    document.title="Форум"
  }, [])

  const modalRef = useRef<HTMLDivElement>(null);
  const [textState, setTextState] = useState<string>("");

  function addEvent() {
    const modal = modalRef.current;
    if (!modal) return
    modal.style.display = "flex"
  }
  
  function submitEvent(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!modalRef.current) return
    if (!textState) {
      alert("Enter the title")
      return
    }
    alert(`Forum with the title "${textState}" was created`)
    setFakeArray((arr) => [...arr, {title: textState, id: Math.random().toString()}])
    modalRef.current.style.display = "none"
    setTextState("")
  }

  function cancelEvent() {
    if (!modalRef.current) return
    modalRef.current.style.display = "none"
    setTextState("")
  }

  function changeEvent(e: React.ChangeEvent) {
    setTextState((e.target as HTMLTextAreaElement).value)
  }

  const [fakeArray, setFakeArray] = useState([
    {
      title: "Forum title",
      id: "gdf4"
    },
    {
      title: "Forum title",
      id: "hf2n"
    },
    {
      title: "Forum title",
      id: "g8lolk"
    }
  ])

  return (
    <div className={styles.forumListContainer}>
      <div className={styles.modalWrapper} ref={modalRef}>
        <form className={styles.modal}>
          <h2 className={styles.title}>Enter forum's title</h2>
          <textarea value={textState} onChange={changeEvent} className={styles.textBlock} name="forumName"></textarea>
          <button type="submit" className={styles.add} onClick={submitEvent}>Submit</button>
          <button type="button" className={styles.cancel} onClick={cancelEvent}>Cancel</button>
        </form>
      </div>
      <div className={styles.forumList}>
        <div className={styles.link}>
          <div onClick={addEvent} className={`${styles.linkClass} ${styles.add}`}>
            <p>
              Add a new forum
            </p>
          </div>
        </div>
        {fakeArray.length === 0 ? 
        <span className={styles.noChats}>"There is no forums yet"</span> : 
        fakeArray.map((forum) => {
          return (
            <div className={styles.link} key={forum.id}>
              <Link to={forum.id.toString()} className={styles.linkClass}>
                <p>
                  {forum.title}
                </p>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForumPick
