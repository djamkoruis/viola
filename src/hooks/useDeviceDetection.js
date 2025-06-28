// src/hooks/useDeviceDetection.js
import { useState, useEffect } from 'react';

export const useDeviceDetection = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        screenWidth: 0,
        isTouch: false,
        userAgent: ''
    });

    useEffect(() => {
        const detectDevice = () => {
            const width = window.innerWidth;
            const userAgent = navigator.userAgent.toLowerCase();
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Advanced mobile detection
            const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
            const tabletRegex = /ipad|android(?!.*mobile)|tablet/i;

            const isMobileDevice = width <= 768 || mobileRegex.test(userAgent);
            const isTabletDevice = !isMobileDevice && (width <= 1024 || tabletRegex.test(userAgent));
            const isDesktopDevice = !isMobileDevice && !isTabletDevice;

            setDeviceInfo({
                isMobile: isMobileDevice,
                isTablet: isTabletDevice,
                isDesktop: isDesktopDevice,
                screenWidth: width,
                isTouch,
                userAgent
            });
        };

        // Initial detection
        detectDevice();

        // Listen for resize events
        window.addEventListener('resize', detectDevice);
        window.addEventListener('orientationchange', detectDevice);

        return () => {
            window.removeEventListener('resize', detectDevice);
            window.removeEventListener('orientationchange', detectDevice);
        };
    }, []);

    return deviceInfo;
};
