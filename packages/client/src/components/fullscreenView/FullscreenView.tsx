import React, { PropsWithChildren, useRef } from 'react';
import { useFullscreenStatus } from '../../utils/useFullscreenStatus';
import styles from './fullscreenView.module.scss';

const FullscreenView: React.FC<PropsWithChildren> = ({ children }) => {
  const expandedElement = useRef(null);
  
  const {
    isFullscreenSupported, 
    isFullscreenEnabled, 
    setFullscreen
   } = useFullscreenStatus(expandedElement);
  
  if (!isFullscreenSupported) {
    return <>{ children }</>
  }
  
  const exitFullscreen = () => document.exitFullscreen();
  
  const btnFullscreen = isFullscreenEnabled ?
    <button
      type='button'
      onClick={exitFullscreen}
      className={styles.fsButton}
      aria-label='exit from to fullscreen mode'
    >
      <img src='snakeGame/shrink.svg' alt='exit fullscreen' />
    </button>
    :
    <button
      type='button'
      onClick={setFullscreen}
      className={styles.fsButton}
      aria-label='switch to fullscreen mode'
    >
      <img src='snakeGame/expand.svg' alt='expand fullscreen' />
    </button>;
  
  return (
    <div ref={expandedElement} className={styles.fsContainer}>
      {children}
      {btnFullscreen}
    </div>
  );
}

export default FullscreenView;
