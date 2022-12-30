import {useEffect, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link } from 'react-router-dom';

const ForumPick = () => {
  useEffect(() => {
    document.title = "Форум";
    
    for (let i = 0; i < cardsCount; i++) {
      setFakeArray((arr) => [...arr, i])
    }
  }, [])

  const [fakeArray, setFakeArray] = useState<number[]>([]);
  const cardsCount = 5;
  
  return (
    <div className={styles.forumList}>
			{fakeArray.map((a) => {
				return (
          <div className={styles.link }key={a}>
            <Link to={"/forum/" + a.toString()}>
              <p>
                Тема форума
              </p>
            </Link>
          </div>
        )
			})}
    </div>
  )
}

export default ForumPick
