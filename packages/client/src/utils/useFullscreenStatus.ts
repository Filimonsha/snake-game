import { useState, RefObject, useLayoutEffect } from 'react';

const docWithFullscreenOptions = document as Document & {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
}


const getBrowserFullscreenElementProp = () => {
  
  if (typeof docWithFullscreenOptions.fullscreenElement !== 'undefined') {
    return 'fullscreenElement';
  } else if (typeof docWithFullscreenOptions.mozFullScreenElement !== 'undefined') {
    return 'mozFullScreenElement';
  } else if (typeof docWithFullscreenOptions.msFullscreenElement !== 'undefined') {
    return 'msFullscreenElement';
  } else if (typeof docWithFullscreenOptions.webkitFullscreenElement !== 'undefined') {
    return 'webkitFullscreenElement';
  } else {
    throw new Error('fullscreenElement is not supported by this browser');
  }
}

const useFullscreenStatus = (elRef: RefObject<HTMLElement>): [boolean, () => void] => {
  
  const [isFullscreen, setIsFullscreen] = useState(
    docWithFullscreenOptions[getBrowserFullscreenElementProp()] !== null
  );
  
  const setFullscreen = () => {
    if (elRef.current == null) return;

    elRef.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(docWithFullscreenOptions[getBrowserFullscreenElementProp()] != null);
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  };
  
  useLayoutEffect(() => {
    docWithFullscreenOptions.onfullscreenchange = () =>
      setIsFullscreen(docWithFullscreenOptions[getBrowserFullscreenElementProp()] != null);

    return () => { docWithFullscreenOptions.onfullscreenchange = null };
  });

  return [isFullscreen, setFullscreen];
}

export { useFullscreenStatus };
