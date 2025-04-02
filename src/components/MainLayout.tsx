import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import MapView from './MapView';

const MainLayout = () => {
  // Always show navigation on map view by default
  const [isNavVisible, setIsNavVisible] = useState(true);
  const location = useLocation();
  const currentRoute = location.pathname;
  const isMapView = currentRoute === '/';
  const isUserProfileView = currentRoute.includes('/profile/');
  
  // Add pages that should not have bottom navigation
  const hideNavPages = [
    '/settings', 
    '/hotspots', 
    '/friends',
    // Include pages that start with these paths
    '/pause-account',
    '/safety-tips',
    '/privacy-policy',
    '/terms-of-service',
    '/privacy-choices',
    '/verification',
    '/blocked-users',
    '/subscription',
    '/edit-phone',
    '/edit-email',
    '/connected-accounts'
  ];
  
  // Check if current route should hide bottom nav
  const shouldHideNav = isUserProfileView || 
                        hideNavPages.some(path => currentRoute === path || currentRoute.startsWith(path));

  return (
    <div className="relative min-h-screen">
      {isMapView ? (
        <MapView isNavVisible={isNavVisible} toggleNav={() => {}} />
      ) : (
        <Outlet />
      )}

      {/* Position BottomNav consistently across all pages */}
      {!shouldHideNav && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <div className="w-full">
            <div className="bg-white/90 backdrop-blur-sm shadow-lg h-14">
              <BottomNav 
                visible={true} 
                currentRoute={currentRoute} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
