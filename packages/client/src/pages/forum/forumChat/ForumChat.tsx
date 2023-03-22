import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './scss/forumChat.module.scss';
import UserCard from './modules/userCard/userCard';
import { useGetTopicsQuery, useLazyGetCommentQuery } from '../../../store/api/yadnex/forum/forumApi';
import { ForumComment } from '../../../types/forum';
import { withErrorBoundary } from '../../../modules/errorBoundary/withErrorBoundary';

const ForumChat = () => {
  const [forumChat, setChatList] = useState<ForumComment[]>([]);
  const [forumTitle, setForumTitle] = useState<string>("");
  const navigate = useNavigate();

  const [trigger, result] = useLazyGetCommentQuery()
  const {data: queriedTopics} = useGetTopicsQuery()

  const topicId = location.pathname.split("/").at(-1) as string
  const chatChange = () => { trigger(topicId) }

  useEffect(() => {
    if (!queriedTopics) return
    const topicTitle = queriedTopics.find((topic) => topic.id.toString() === topicId.toString())?.title
    if (!topicTitle) {
      navigate(-1)
      return
    }
    setForumTitle(topicTitle)
  }, [queriedTopics])

  useEffect(() => {
    if (result.data) setChatList(result.data)
  }, [result])

  useEffect(() => {
    chatChange()
  }, [])

  return (
    <div className={styles.forumWrapper}>
      <div className={styles.forumCircle}>
        <div className={styles.forum}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.backButton} onClick={() => navigate(-1)} ></div>
              {forumTitle}
            </div>
          </header>
          <main className={styles.main}>
            <ul>
            {
              !forumChat.length ? 
              <p className={styles.noAnswers}>There are no comments yet</p> : 
              forumChat.map(message => <UserCard comment={message.text} avatar={message.userData?.avatar} userName={message.userData?.login} key={message.id}/>)
            }
            <UserCard isPostCard={true} chatChange={chatChange}/>
            </ul>
          </main>
        </div>
      </div>
    </div>
  )
}

export default withErrorBoundary(ForumChat);
