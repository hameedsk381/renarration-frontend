 const getDeviceType = () => {
    const ua = navigator.userAgent;
  
    // Patterns for different types of devices
    const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletPattern = /iPad|Android/i;
    
    if (mobilePattern.test(ua) && !tabletPattern.test(ua)) {
      return 'mobile';
    }
    if (tabletPattern.test(ua)) {
      return 'tablet';
    }
    return 'desktop';
  };
  export default getDeviceType;