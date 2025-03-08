
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

      <BottomNav 
        visible={isNavVisible || !isMapView} 
        currentRoute={currentRoute} 
      />
    </div>
  );
};

export default MainLayout;
