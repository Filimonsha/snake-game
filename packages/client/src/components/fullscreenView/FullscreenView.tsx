import React, { PropsWithChildren, useRef } from 'react';
import { useFullscreenStatus } from '../../utils/useFullscreenStatus';
import styles from './fullscreenView.module.scss';

const FullscreenView: React.FC<PropsWithChildren> = ({ children }) => {
  const expandedElement = useRef(null);
  
  let isFullscreen, setIsFullscreen;
  let isError = false;
  
  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(expandedElement);
  } catch (e) {
    isError = true;
    isFullscreen = false;
    setIsFullscreen = undefined;
  }
  
  const handleExitFullscreen = () => document.exitFullscreen();
  
  const btnFullscreen = isFullscreen ?
    <button
      type='button'
      onClick={handleExitFullscreen}
      className={styles.fsButton}
      aria-label='exit from to fullscreen mode'
    >
      <img src='snakeGame/shrink.svg' alt='exit fullscreen' />
    </button>
    :
    <button
      type='button'
      onClick={setIsFullscreen}
      className={styles.fsButton}
      aria-label='switch to fullscreen mode'
    >
      <img src='snakeGame/expand.svg' alt='expand fullscreen' />
    </button>;
  
  return (
    <div ref={expandedElement} className={styles.fsContainer}>
      {children}
      {isError ? null : btnFullscreen}
    </div>
  );
}

export default FullscreenView;
