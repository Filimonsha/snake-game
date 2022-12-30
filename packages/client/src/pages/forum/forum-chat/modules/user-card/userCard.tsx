import styles from './userCard.module.scss';
import img from './download.jpg';

const UserCard: ({ isPostCard }: { isPostCard: boolean }) => JSX.Element = ({isPostCard = false}) => {
  const userName = "Пользователь"
  const comment = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam enim totam vero necessitatibus ipsa quis. Doloribus ab quas at. 
  Magni cumque quaerat temporibus eligendi fugiat dignissimos atque similique nesciunt inventore.
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
  Delectus nihil sequi laboriosam magnam rem debitis tempora est illum nesciunt non praesentium, sunt fuga odio atque, impedit et ex sit officiis? 
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum labore id quibusdam maiores explicabo excepturi ad consequatur esse sint. 
  Ex facere placeat iste obcaecati incidunt porro magnam explicabo atque quasi.`
  const submitFunc = function (e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.get("text") ? alert("Ваш комментарий: " + formData.get("text")) : alert("Введите комментарий");
  }

  return (
    isPostCard ? 
    <li>
      <form className={styles.card} onSubmit={submitFunc}>
        <div className={styles.userInfo}>
          <img className={styles.avatar} src={img}/>
          <h2 className={styles.userName}>Вы</h2>
        </div>
        {
          isPostCard ?
          <textarea className={styles.userAnswer} name="text" placeholder="Ваш комментарий"/> :
          <div className={styles.userAnswer}>
            <p className={styles.comment}>
              {comment}
            </p>
          </div>
        }
        <button className={styles.submitButton}type='submit'>Подтвердить</button>
      </form>
    </li> :
    <li className={styles.card}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={img}/>
        <h2 className={styles.userName}>{userName}</h2>
      </div>
      {
        isPostCard ?
        <textarea className={styles.userAnswer} placeholder="Ваш комментарий"/> :
        <div className={styles.userAnswer}>
          <p className={styles.comment}>
            {comment}
          </p>
        </div>
      }
    </li>
  )
}

export default UserCard
