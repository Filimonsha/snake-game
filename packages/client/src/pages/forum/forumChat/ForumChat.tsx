import {useEffect, useState, useRef} from 'react';
import styles from './forumChat.module.scss';
import UserCard from './modules/userCard/userCard';

const ForumChat = () => {
  useEffect(() => {
    document.title = "Форум";
  }, [])

  const fakeArray: {id: string}[] = [
    {
      id: "gdf4"
    },
    {
      id: "hf2n"
    },
    {
      id: "g8lolk"
    }
  ]
  
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
              fakeArray.length === 0 ? 
                <p className={styles.noAnswers}>There is no comments yet</p> : 
                fakeArray.map((a) => {
                  return <UserCard isPostCard={false} key={a.id}/>
                })
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
