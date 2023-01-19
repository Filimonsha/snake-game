import React, {useEffect, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link } from 'react-router-dom';
import { MOCK_ARRAY } from './mockList';
import Modal from "./modules/modal/modal";

interface IMockForumList {ID: string, TITLE: string}

const ForumPick = () => {
  const [isModalHidden, setIsModalHidden] = useState<boolean>(true);
  const [forumList, setForumList] = useState<IMockForumList[]>([]);

  function showModalEvent() {
    setIsModalHidden(false)
  }

  useEffect(() => {
    document.title="Форум"
    setForumList(MOCK_ARRAY)
  }, [])

  return (
    <div className={styles.forumListContainer}>
      {!isModalHidden && <Modal setIsModalHidden={setIsModalHidden}/>}
      <div className={styles.forumList}>
        <div onClick={showModalEvent} className={styles.link}>
          <p className={styles.addLabel}>
            Add a new forum
          </p>
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
  )
}

export default ForumPick
