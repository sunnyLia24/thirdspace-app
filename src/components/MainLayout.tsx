
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import MapView from './MapView';

const MainLayout = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const isMapView = currentRoute === '/';
  const isUserProfileView = currentRoute.includes('/profile/');

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="relative min-h-screen">
      {isMapView ? (
        <MapView isNavVisible={isNavVisible} toggleNav={toggleNav} />
      ) : (
        <Outlet />
      )}

      {/* Position BottomNav above heart button when on MapView */}
      {isMapView ? (
        <div className={`fixed bottom-24 left-0 right-0 z-20 transition-all duration-300 ease-in-out
          ${isNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}>
          <div className="mx-auto max-w-md">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg mx-4 transition-all duration-300 hover:shadow-xl">
              <BottomNav 
                visible={true} 
                currentRoute={currentRoute} 
              />
            </div>
          </div>
        </div>
      ) : (
        // Hide BottomNav on user profile pages
        !isUserProfileView && (
          <BottomNav 
            visible={isNavVisible || !isMapView} 
            currentRoute={currentRoute} 
          />
        )
      )}
    </div>
  );
};

export default MainLayout;
