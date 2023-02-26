import { useState, RefObject, useLayoutEffect } from 'react';

type UseFullScreenReturnType = {
  isFullscreenSupported: boolean,
  isFullscreenEnabled?: boolean,
  setFullscreen?: () => void, 
}

const docWithFullscreenOptions = document as Document & {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
}

const getBrowserFullscreenElementProp = () => {
  
  if ('fullscreenElement' in docWithFullscreenOptions) {
    return 'fullscreenElement';
  } else if ('mozFullScreenElement' in docWithFullscreenOptions) {
    return 'mozFullScreenElement';
  } else if ('msFullscreenElement' in docWithFullscreenOptions) {
    return 'msFullscreenElement';
  } else if ('webkitFullscreenElement' in docWithFullscreenOptions) {
    return 'webkitFullscreenElement';
  } else {
    return null;
  }
}

const useFullscreenStatus = (elRef: RefObject<HTMLElement>): UseFullScreenReturnType => {
  
  const fullscreenProp = getBrowserFullscreenElementProp();
  const isFullscreenSupported = Boolean(fullscreenProp);
  
  if (!fullscreenProp) {
    return { isFullscreenSupported };
  }
  
  const fullscreenCurrentStatus = docWithFullscreenOptions[fullscreenProp] !== null;
  
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(fullscreenCurrentStatus);
  
  const setFullscreen = () => {
    if (!elRef.current) return;

    elRef.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreenEnabled(fullscreenCurrentStatus);
      })
      .catch(() => {
        setIsFullscreenEnabled(false);
      });
  };
  
  useLayoutEffect(() => {
    docWithFullscreenOptions.onfullscreenchange = () =>
      setIsFullscreenEnabled(!fullscreenCurrentStatus);

    return () => { docWithFullscreenOptions.onfullscreenchange = null };
  });

  return {
    isFullscreenSupported,
    isFullscreenEnabled,
    setFullscreen,
  };
}

export { useFullscreenStatus };
