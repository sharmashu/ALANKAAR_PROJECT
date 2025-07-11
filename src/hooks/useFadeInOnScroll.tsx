import { useEffect, useRef } from 'react';

export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add('fade-in-section');
          node.classList.remove('fade-out-section');
        } else {
          node.classList.remove('fade-in-section');
          node.classList.add('fade-out-section');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
} 