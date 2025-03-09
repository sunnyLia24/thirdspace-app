
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import MapView from './MapView';

const MainLayout = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const isMapView = currentRoute === '/';

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
        <div className={`fixed bottom-24 left-0 right-0 z-20 transition-transform duration-300 ease-in-out
          ${isNavVisible ? 'translate-y-0' : 'translate-y-full'}`}>
          <BottomNav 
            visible={true} 
            currentRoute={currentRoute} 
          />
        </div>
      ) : (
        <BottomNav 
          visible={isNavVisible || !isMapView} 
          currentRoute={currentRoute} 
        />
      )}
    </div>
  );
};

export default MainLayout;
