import {useEffect, useState} from 'react';
import styles from './forumPick.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "./modules/modal/modal";
import { useLazyGetTopicsQuery } from '../../../store/api/yadnex/forum/forumApi';
import { Header } from '../../../modules/header';
import { withErrorBoundary } from '../../../modules/errorBoundary/withErrorBoundary';

interface IForumList {id: string, title: string}

const ForumPick = () => {
  const [isModalHidden, setIsModalHidden] = useState<boolean>(true);
  const [forumList, setForumList] = useState<IForumList[] | undefined>([]);
  const navigate = useNavigate();

  function showModalEvent() {
    setIsModalHidden(false)
  }
  const [trigger, result] = useLazyGetTopicsQuery();

  useEffect(() => {
    trigger()
  }, [])

  useEffect(() => {
    if (result.data) setForumList(result.data)
  }, [result])

  return (
    <div className={styles.forum}>
      <div className={styles.forumCircle}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <div>
          {!isModalHidden && <Modal setIsModalHidden={setIsModalHidden} topicChange={() => {trigger()}}/>}
          <main className={styles.forumList}>
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <div className={styles.backButton} onClick={() => navigate(-1)}></div>
                All Discussions
              </div>
              <div onClick={showModalEvent} className={styles.addLabel}></div>
            </div>
            {
              !forumList?.length ? 
              <span className={styles.noChats}>There are no forums yet</span> : 
              forumList?.map(forum => (
                <Link to={`${forum.id}`} className={styles.link} key={forum.id}>
                  <p>
                    {forum.title}
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

export default withErrorBoundary(ForumPick);
