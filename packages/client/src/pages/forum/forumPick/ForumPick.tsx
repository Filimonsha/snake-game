import React, {useEffect, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "./modules/modal/modal";

interface IForumList {id: string, title: string}

const ForumPick = () => {
  const [isModalHidden, setIsModalHidden] = useState<boolean>(true);
  const [forumList, setForumList] = useState<IForumList[]>([]);
  const navigate = useNavigate();

  function showModalEvent() {
    setIsModalHidden(false)
  }

  useEffect(() => {
    (async () => {
      await fetch(`http://localhost:3001/api/v1/auth/user`).then(a => {console.log(a); return a.json()}).then(a => {
      //setForumList(a)
      console.log(a)
    });
    })()
    document.title="Forum"
  }, [])

  return (
    <div className={styles.forumListContainer}>
      <div className={styles.forumCircle}>
        {!isModalHidden && <Modal setIsModalHidden={setIsModalHidden}/>}
        <div className={styles.forumList}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.backButton} onClick={() => navigate(-1)}></div>
              All Discussions
            </div>
            <div onClick={showModalEvent} className={styles.addLabel}></div>
          </div>
          {
            !forumList.length ? 
            <span className={styles.noChats}>There are no forums yet</span> : 
            forumList.map(forum => (
              <Link to={forum.id} className={styles.link} key={forum.id}>
                <p>
                  {forum.title}
                </p>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ForumPick
