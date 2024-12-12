import { useEffect, useRef } from 'react';

const useInfiniteScroll = (loadMore: () => void, loading: boolean) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loading) return; 
        if (observerRef.current) observerRef.current.disconnect(); 

        const callback = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        };

        observerRef.current = new IntersectionObserver(callback);
        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [loading, loadMore]);

    return loadMoreRef;
};

export default useInfiniteScroll;
