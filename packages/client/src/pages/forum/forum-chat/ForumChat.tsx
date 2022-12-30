import {useEffect, useState, useRef, LegacyRef} from 'react';
import styles from './forumChat.module.scss';
import UserCard from './modules/user-card/userCard';

const ForumChat = () => {
  useEffect(() => {
    document.title = "Форум";
    if (!location.pathname.match(/forum\/\d/)) {
      location.replace("/forums");
    }
    //if (forumRef.current) forumRef.current.style.minHeight = window.innerHeight.toString() + "px";
    for (let i = 0; i < chatCount; i++) {
      setFakeArray((arr) => [...arr, i])
    }
  }, [])

  const forumRef = useRef<HTMLDivElement>(null);

  const [fakeArray, setFakeArray] = useState<number[]>([]);
  const chatCount = 5;
  
  return (
    <div className={styles.forum} ref={forumRef}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Тема форума</h1>
        </div>
      </header>
      <main className={styles.main}>
        <ul>
          {
            fakeArray.length === 0 ? 
              <p>Ни одного комментария ещё не было оставлено</p> : 
              fakeArray.map((a) => {
                return <UserCard isPostCard={false} key={a}/>
              })
          }
          <UserCard isPostCard={true}/>
        </ul>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default ForumChat
