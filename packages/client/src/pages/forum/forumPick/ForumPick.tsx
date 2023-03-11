import React, {useEffect, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_ARRAY } from './mockList';
import Modal from "./modules/modal/modal";

interface IMockForumList {ID: string, TITLE: string}

const ForumPick = () => {
  const [isModalHidden, setIsModalHidden] = useState<boolean>(true);
  const [forumList, setForumList] = useState<IMockForumList[]>([]);
  const navigate = useNavigate();

  function showModalEvent() {
    setIsModalHidden(false)
  }

  useEffect(() => {
    (async () => {
      fetch(`http://localhost:3001/api/v1/forum`).then((a)=>{return a.json()}).then(a => console.log(a));
  })()
    document.title="Forum"
    setForumList(MOCK_ARRAY)
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
              <Link to={forum.ID} className={styles.link} key={forum.ID}>
                <p>
                  {forum.TITLE}
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
