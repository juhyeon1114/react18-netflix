import { useRef, useState, useEffect } from 'react';

export const useIsElementInViewport = (options) => {
  const elementRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    elementRef.current && observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return { elementRef, isVisible };
};

export const useIsImgLoaded = (lazy) => {
  const { elementRef, isVisible } = useIsElementInViewport({
    rootMargin: '0px 0px 500px 0px',
  });
  const [isLoaded, setIsLoaded] = useState(!lazy);

  useEffect(() => {
    if (isLoaded || !isVisible) {
      return;
    }

    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return { elementRef, isLoaded };
};

import { useIsImgLoaded } from './hooks';
import { sizify } from './img.helpers';
import { imgWidth2WSize } from './img.types';

const SMALLEST_IMG_W_SIZE = 50;

export default function Img(props) {
  const { src, alt, width, height, lazy } = props;

  const { elementRef, isLoaded } = useIsImgLoaded(lazy);

  return (
    <img
      ref={elementRef}
      alt={alt}
      src={sizify(src, isLoaded ? imgWidth2WSize(width) : SMALLEST_IMG_W_SIZE)}
      style={{ width, height }}
    />
  );
}