import React, {TextareaHTMLAttributes, useEffect, useRef, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link } from 'react-router-dom';
const ForumPick = () => {
  useEffect(() => {
    document.title="Форум"
    
    for (let i = 0; i < cardsCount; i++) {
      setFakeArray((arr) => [...arr, "Тема форума"])
    }
  }, [])

  const [fakeArray, setFakeArray] = useState<string[]>([]);
  const cardsCount = 8;
  const modalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
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
      alert("Введите название")
      return
    }
    alert(`Форум под названием "${textState}" был создан`)
    setFakeArray((arr) => [...arr, textState])
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

  return (
    <div className={styles.forumListContainer}>
    <div className={styles.modalWrapper} ref={modalRef}>
      <form className={styles.modal}>
        <h2 className={styles.title}>Введите тему форума</h2>
        <textarea value={textState} onChange={changeEvent} className={styles.textBlock} name="forumName"></textarea>
        <button type="submit" className={styles.add} onClick={submitEvent}>Добавить</button>
        <button type="button" className={styles.cancel} onClick={cancelEvent}>Отмена</button>
      </form>
    </div>
      <div className={styles.forumList}>
        {fakeArray.length === 0 ? 
        <span className={styles.noChats}>"Тем для чатов нет"</span> : 
        fakeArray.map((a, i) => {
          return (
            <div className={styles.link} key={i}>
              <Link to={i.toString()} className={styles.linkClass}>
                <p>
                  {a}
                </p>
              </Link>
            </div>
          )
        })}
        <div className={styles.link}>
          <div style={{cursor: "pointer"}} onClick={addEvent} className={`${styles.linkClass} ${styles.add}`}>
            <p>
              +
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumPick
