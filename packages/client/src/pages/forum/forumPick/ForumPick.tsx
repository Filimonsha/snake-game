import React, {useEffect, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_ARRAY } from './mockList';
import Modal from "./modules/modal/modal";
import { Header } from '../../../modules/header';

interface IMockForumList {ID: string, TITLE: string}

const ForumPick = () => {
  const [isModalHidden, setIsModalHidden] = useState<boolean>(true);
  const [forumList, setForumList] = useState<IMockForumList[]>([]);
  const navigate = useNavigate();

  function showModalEvent() {
    setIsModalHidden(false)
  }

  useEffect(() => {
    document.title="Forum"
    setForumList(MOCK_ARRAY)
  }, [])

  return (
    <div className={styles.forum}>
      <div className={styles.forumCircle}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <div>
            {!isModalHidden && <Modal setIsModalHidden={setIsModalHidden}/>}
            <main className={styles.forumList}>
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
            </main>
          </div>
        </div>
    </div>
  )
}

export default ForumPick
