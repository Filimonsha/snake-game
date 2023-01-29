import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './scss/forumChat.module.scss';
import { MOCK_ARRAY } from './mockChat';
import UserCard from './modules/userCard/userCard';

interface IMockChatList {ID: string, USER_NAME: string, COMMENT: string}

const ForumChat = () => {
  const [forumList, setForumList] = useState<IMockChatList[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forum";
    setForumList(MOCK_ARRAY)
  }, [])

  return (
    <div className={styles.forumWrapper}>
      <div className={styles.forumCircle}>
        <div className={styles.forum}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.backButton} onClick={() => navigate(-1)} ></div>
              Forum title
            </div>
          </header>
          <main className={styles.main}>
            <ul>
            {
              !forumList.length ? 
              <p className={styles.noAnswers}>There are no comments yet</p> : 
              forumList.map(message => <UserCard userName={message.USER_NAME} comment={message.COMMENT} key={message.ID}/>)
            }
            <UserCard isPostCard={true}/>
            </ul>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ForumChat
