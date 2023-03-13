import styles from './scss/userCard.module.scss';
import img from './download.jpg';
import React, {useState} from 'react';
import { useGetUserInfoQuery } from '../../../../../store/api/yadnex/auth/authApi';
import { useAddCommentMutation } from '../../../../../store/api/yadnex/forum/forumApi';

interface ICardProps {userName?: string, isPostCard?: boolean, comment?: string, chatChange?: () => void}

const UserCard: React.FC<ICardProps> = ({userName = "", isPostCard = false, comment = "", chatChange}) => {
  const [textState, setTextState] = useState<string>("");
  const {data} = useGetUserInfoQuery()
  const commentQuery = useAddCommentMutation()
  const topicId = location.pathname.split("/").at(-1) as string

  function submitFunc (e: React.SyntheticEvent) {
    e.preventDefault();
    if (!textState.trim()) {
      alert("Enter a comment");
      return;
    }
    (async () => {
      if (!data?.id) return
      await commentQuery[0](
        {
          topicId, 
          body: {
            text: textState,
            idUser: data.id.toString(),
          }
        })
        if (chatChange) chatChange()
    })()
    setTextState("")
  }

  function changeEvent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextState(e.target.value)
  }

  return (
    isPostCard ? 
    <li>
      <form className={styles.cardAnswer} onSubmit={submitFunc}>
        <textarea value={textState} onChange={changeEvent} className={styles.userAnswer} name="text" placeholder="Your comment"/>
        <button className={styles.submitButton} type='submit'>Submit</button>
      </form>
    </li> :
    <li className={styles.card}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={img}/>
        <h2 className={styles.userName}>{userName}</h2>
      </div>
      <div className={styles.userAnswer}>
        <p className={styles.comment}>
          {comment}
        </p>
      </div>
    </li>
  )
}

export default UserCard
