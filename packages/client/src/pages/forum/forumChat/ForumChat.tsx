import {useEffect, useState, useRef} from 'react';
import styles from './forumChat.module.scss';
import { MOCK_ARRAY } from './mockChat';
import UserCard from './modules/userCard/userCard';

interface IChatList {id: string, userName: string, comment: string}

const ForumChat = () => {

  const [forumList, setForumList] = useState<IChatList[]>([]);

  useEffect(() => {
    document.title = "Форум";
    setForumList(MOCK_ARRAY)
  }, [])
  
  return (
    <div className={styles.forumWrapper}>
      <div className={styles.forum}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Forum title</h1>
          </div>
        </header>
        <main className={styles.main}>
          <ul>
            {
              !forumList.length ? 
              <p className={styles.noAnswers}>There are no comments yet</p> : 
              forumList.map(message => <UserCard userName={message.userName} comment={message.comment} key={message.id}/>)
            }
            <UserCard isPostCard={true}/>
          </ul>
        </main>
        <footer className={styles.footer}/>
      </div>
    </div>
  )
}

export default ForumChat
