import styles from './userCard.module.scss';
import img from './download.jpg';
import React, {useState} from 'react';

interface ICardType {userName?: string, isPostCard?: boolean, comment?: string}

const UserCard: React.FC<ICardType> = ({userName = "", isPostCard = false, comment = ""}) => {
  const [textState, setTextState] = useState<string>("");
 
  function submitFunc (e: React.SyntheticEvent) {
    e.preventDefault();
    textState ? alert("Your comment is: " + textState) : alert("Enter a comment");
    setTextState("")
  }
  
  function changeEvent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextState(e.target.value)
  }

  return (
    isPostCard ? 
    <li>
      <form className={styles.card} onSubmit={submitFunc}>
        <div className={styles.userInfo}>
          <img className={styles.avatar} src={img}/>
          <h2 className={styles.userName}>You</h2>
        </div>
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
