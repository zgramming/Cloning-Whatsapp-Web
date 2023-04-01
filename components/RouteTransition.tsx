import { nprogress, NavigationProgress } from '@mantine/nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RouteTransition = () => {
  const { asPath, events } = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => url !== asPath && nprogress.start();
    const handleComplete = () => nprogress.complete();
    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleComplete);
    events.on('routeChangeError', handleComplete);
    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleComplete);
      events.off('routeChangeError', handleComplete);
    };
  }, [asPath, events]);

  return <NavigationProgress autoReset={true} progressLabel="Loading Page" />;
};

export default RouteTransition;
