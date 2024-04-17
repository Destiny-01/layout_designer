import { useState, useEffect } from 'react';

function useDeviceWidth() {
  const [deviceWidth, setDeviceWidth] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Check if window is available (for client-side rendering)
    if (typeof window !== 'undefined') {
      setDeviceWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      // Clean up event listener when component unmounts
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return deviceWidth;
}

export default useDeviceWidth;

