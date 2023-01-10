import styles from './userCard.module.scss';
import img from './download.jpg';
import React, {useState} from 'react';

const UserCard: ({ isPostCard }: { isPostCard: boolean }) => JSX.Element = ({isPostCard = false}) => {
  const userName = "User"
  const comment = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam enim totam vero necessitatibus ipsa quis. Doloribus ab quas at. 
  Magni cumque quaerat temporibus eligendi fugiat dignissimos atque similique nesciunt inventore.
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
  Delectus nihil sequi laboriosam magnam rem debitis tempora est illum nesciunt non praesentium, sunt fuga odio atque, impedit et ex sit officiis? 
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum labore id quibusdam maiores explicabo excepturi ad consequatur esse sint. 
  Ex facere placeat iste obcaecati incidunt porro magnam explicabo atque quasi.`
  const submitFunc = function (e: React.SyntheticEvent) {
    e.preventDefault();
    textState ? alert("Your comment is: " + textState) : alert("Enter a comment");
    setTextState("")
  }

  const [textState, setTextState] = useState<string>("");
  function changeEvent(e: React.ChangeEvent) {
    setTextState((e.target as HTMLTextAreaElement).value)
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
        <button className={styles.submitButton}type='submit'>Submit</button>
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
