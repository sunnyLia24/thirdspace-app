import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchNearbyLocations } from '../services/locationService';
import { createProfileMarker } from './ProfileMarker';
import { createMapControls } from './MapControls';
import { createRadarPulse } from './RadarPulse';
import { useMapStyling } from '../hooks/useMapStyling';
import { ISOMETRIC_VIEW, DEFAULT_LOCATION, DEFAULT_MAPBOX_TOKEN } from '../utils/mapUtils';

// Hotspot marker component with type-specific styling
const createHotspotMarker = (
  lngLat: [number, number],
  map: mapboxgl.Map,
  type: 'cafe' | 'park' | 'landmark' | 'event' = 'landmark'
) => {
  const el = document.createElement('div');
  el.className = 'hotspot-marker';
  
  const style = document.createElement('style');
  style.textContent = `
    .hotspot-marker {
      width: 38px;
      height: 60px;
      position: relative;
      cursor: pointer;
      z-index: 9;
    }
    .hotspot-pin {
      width: 38px;
      height: 38px;
      background: var(--dating-warning);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      animation: bounce 2s infinite;
    }
    .hotspot-pin.cafe {
      background: var(--dating-warning);
    }
    .hotspot-pin.park {
      background: var(--dating-success);
    }
    .hotspot-pin.landmark {
      background: var(--dating-accent);
    }
    .hotspot-pin.event {
      background: var(--dating-secondary);
    }
    .hotspot-icon {
      width: 18px;
      height: 18px;
      background-color: white;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      transform: rotate(45deg);
    }
    .hotspot-icon.cafe {
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" x2="6" y1="2" y2="4"></line><line x1="10" x2="10" y1="2" y2="4"></line><line x1="14" x2="14" y1="2" y2="4"></line></svg>');
      -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" x2="6" y1="2" y2="4"></line><line x1="10" x2="10" y1="2" y2="4"></line><line x1="14" x2="14" y1="2" y2="4"></line></svg>');
    }
    .hotspot-icon.park {
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14L7 4"></path><path d="M7 14 5 12"></path><path d="M12 19l5-5"></path><path d="M17 14h-2.5a2 2 0 1 0 0 4H17a2 2 0 0 0 2-2v-1.5a2 2 0 1 0-4 0V17a1 1 0 0 0 1 1h2.5a1 1 0 0 0 .5-1.5.5.5 0 0 0 0-1 2.5 2.5 0 1 0-5 0V17a2 2 0 0 0 2 2h3"></path></svg>');
      -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14L7 4"></path><path d="M7 14 5 12"></path><path d="M12 19l5-5"></path><path d="M17 14h-2.5a2 2 0 1 0 0 4H17a2 2 0 0 0 2-2v-1.5a2 2 0 1 0-4 0V17a1 1 0 0 0 1 1h2.5a1 1 0 0 0 .5-1.5.5.5 0 0 0 0-1 2.5 2.5 0 1 0-5 0V17a2 2 0 0 0 2 2h3"></path></svg>');
    }
    .hotspot-icon.landmark {
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>');
      -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>');
    }
    .hotspot-icon.event {
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 5H7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4ZM12 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path><path d="M5 10h14"></path><path d="M7 15h2"></path><path d="M15 15h2"></path></svg>');
      -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 5H7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4ZM12 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path><path d="M5 10h14"></path><path d="M7 15h2"></path><path d="M15 15h2"></path></svg>');
    }
    .hotspot-base {
      width: 28px;
      height: 5px;
      border-radius: 50%;
      position: absolute;
      bottom: 20px;
      left: 5px;
      opacity: 0.6;
      filter: blur(2px);
      background: rgba(0, 0, 0, 0.3);
      transform: perspective(10px) rotateX(60deg);
    }
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 209, 102, 0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(255, 209, 102, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 209, 102, 0);
      }
    }
    @keyframes bounce {
      0%, 100% {
        transform: rotate(-45deg) translateY(0);
      }
      50% {
        transform: rotate(-45deg) translateY(-5px);
      }
    }
    .hotspot-marker:hover .hotspot-pin {
      animation: bounce 0.5s ease-in-out;
    }
    .hotspot-active-users {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--dating-primary);
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      border: 2px solid white;
      z-index: 3;
    }
  `;
  document.head.appendChild(style);

  const icon = document.createElement('div');
  icon.className = `hotspot-icon ${type}`;

  const pin = document.createElement('div');
  pin.className = `hotspot-pin ${type}`;
  pin.appendChild(icon);

  const base = document.createElement('div');
  base.className = 'hotspot-base';

  // Add active users count (randomly 1-5 for demonstration)
  const activeCount = Math.floor(Math.random() * 5) + 1;
  const activeUsers = document.createElement('div');
  activeUsers.className = 'hotspot-active-users';
  activeUsers.textContent = activeCount.toString();

  el.appendChild(pin);
  el.appendChild(base);
  el.appendChild(activeUsers);

  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: false,
    closeOnClick: false,
    className: 'hotspot-popup',
    maxWidth: '300px'
  });

  // Generate a random name based on type
  const locationNames = {
    cafe: ['Brew Love Coffee', 'Cupid\'s Café', 'Match Made Coffee', 'First Date Espresso', 'The Dating Bean'],
    park: ['Romance Park', 'Sunset Gardens', 'Couple\'s Grove', 'Connection Park', 'Heart Lake'],
    landmark: ['Lover\'s Point', 'The Meet Cute Museum', 'Dating History Center', 'Union Gallery', 'Matchmaker Tower'],
    event: ['Speed Dating Night', 'Singles Mixer', 'Couples Workshop', 'Date Night Event', 'Relationship Seminar']
  };
  
  const nameIndex = Math.floor(Math.random() * 5);
  const locationName = locationNames[type][nameIndex];

  el.addEventListener('mouseenter', () => {
    popup.setLngLat(lngLat)
      .setHTML(`
        <div class="hotspot-popup-content">
          <h3>${locationName}</h3>
          <div class="hotspot-popup-type">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
          <div class="hotspot-popup-users">${activeCount} active users nearby</div>
          <button class="hotspot-explore-btn">Explore</button>
        </div>
      `)
      .addTo(map);
    
    // Add popup style
    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
      .hotspot-popup .mapboxgl-popup-content {
        border-radius: 16px;
        padding: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        border: 1px solid rgba(255,255,255,0.2);
      }
      .hotspot-popup .mapboxgl-popup-tip {
        border-top-color: white;
      }
      .hotspot-popup-content h3 {
        margin: 0 0 5px 0;
        color: #333;
        font-weight: 600;
      }
      .hotspot-popup-type {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 12px;
        margin-bottom: 8px;
      }
      .hotspot-popup-content:has(.hotspot-popup-type:contains("Cafe")) .hotspot-popup-type {
        background-color: rgba(255, 171, 0, 0.2);
        color: #996600;
      }
      .hotspot-popup-content:has(.hotspot-popup-type:contains("Park")) .hotspot-popup-type {
        background-color: rgba(0, 230, 118, 0.2);
        color: #007744;
      }
      .hotspot-popup-content:has(.hotspot-popup-type:contains("Landmark")) .hotspot-popup-type {
        background-color: rgba(0, 209, 255, 0.2);
        color: #007799;
      }
      .hotspot-popup-content:has(.hotspot-popup-type:contains("Event")) .hotspot-popup-type {
        background-color: rgba(138, 43, 226, 0.2);
        color: #5d1e99;
      }
      .hotspot-popup-users {
        font-size: 12px;
        color: #666;
        margin-bottom: 12px;
      }
      .hotspot-explore-btn {
        background: var(--dating-primary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        width: 100%;
        transition: all 0.2s;
      }
      .hotspot-explore-btn:hover {
        background: #ff3366;
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(popupStyle);
  });

  el.addEventListener('mouseleave', () => {
    popup.remove();
  });

  const marker = new mapboxgl.Marker(el)
    .setLngLat(lngLat)
    .addTo(map);

  return marker;
};

// Example profiles (replace with real data)
const EXAMPLE_PROFILES: Array<{
  id: string;
  name: string;
  photo: string;
  interests: string[];
  location: [number, number];
}> = [
  {
    id: '1',
    name: 'Alex',
    photo: 'https://i.pravatar.cc/150?img=1',
    interests: ['Coffee', 'Reading', 'Hiking'],
    location: [-74.5, 40.01] as [number, number]
  },
  {
    id: '2',
    name: 'Sam',
    photo: 'https://i.pravatar.cc/150?img=2',
    interests: ['Photography', 'Travel', 'Art'],
    location: [-74.51, 39.99] as [number, number]
  }
];

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hotspots, setHotspots] = useState<mapboxgl.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const radarPulseRef = useRef<ReturnType<typeof createRadarPulse> | null>(null);
  const profileMarkersRef = useRef<Array<ReturnType<typeof createProfileMarker>>>([]);
  const controlsRef = useRef<ReturnType<typeof createMapControls> | null>(null);
  const { applyMapStyling } = useMapStyling(map);

  const handleWave = (profileId: string) => {
    console.log('Waved at profile:', profileId);
    // Implement chat initiation logic here
  };

  const updateNearbyProfiles = (userLoc: [number, number]) => {
    // Clean up existing profile markers
    profileMarkersRef.current.forEach(marker => marker.cleanup());
    profileMarkersRef.current = [];

    // Filter profiles within 50 meters and create markers
    const nearby = EXAMPLE_PROFILES.filter(profile => {
      const distance = calculateDistance(userLoc, profile.location);
      return distance <= 0.05; // 50 meters in kilometers
    });

    if (map.current) {
      profileMarkersRef.current = nearby.map(profile => 
        createProfileMarker(profile, map.current!, handleWave)
      );
    }
  };

  const setupMapInteractions = (mapInstance: mapboxgl.Map) => {
    // Set the maximum pitch to allow more tilt, but don't require users to tilt manually
    mapInstance.dragRotate.disable(); // Disable rotation with right-click and drag
    
    // Get zoom event
    mapInstance.on('zoom', () => {
      const zoom = mapInstance.getZoom();
      
      // Smoothly adjust pitch based on zoom level
      if (zoom > 15 && mapInstance.getPitch() < 45) {
        mapInstance.easeTo({
          pitch: 45,
          duration: 500
        });
      } else if (zoom <= 15 && mapInstance.getPitch() > 0) {
        mapInstance.easeTo({
          pitch: 0,
          duration: 500
        });
      }
    });
    
    // Add momentum to pan for smoother experience
    mapInstance.on('dragend', (e) => {
      // Calculate momentum factor based on how fast the drag was
      const momentumFactor = 1.2; // Adjust for more or less momentum
      
      // Get the drag movement
      if (!e.originalEvent) return;
      
      // Check if it's a MouseEvent (has movementX/Y)
      const mouseEvent = e.originalEvent as MouseEvent;
      const movementX = mouseEvent.movementX || 0;
      const movementY = mouseEvent.movementY || 0;
      
      // Only apply momentum if there was significant movement
      if (Math.abs(movementX) < 5 && Math.abs(movementY) < 5) return;
      
      // Get current camera position
      const currentCenter = mapInstance.getCenter();
      const zoom = mapInstance.getZoom();
      const zoomFactor = 1 / Math.pow(2, zoom); // Scale movement based on zoom
      
      // Calculate new position with momentum
      const lng = currentCenter.lng - (movementX * zoomFactor * momentumFactor);
      const lat = currentCenter.lat + (movementY * zoomFactor * momentumFactor);
      
      // Smooth transition to new position
      mapInstance.easeTo({
        center: [lng, lat],
        duration: 750, // Longer duration for smoother effect
        easing: t => {
          // Custom ease-out function for natural deceleration
          return 1 - Math.pow(1 - t, 3);
        }
      });
    });
    
    // Add pokémon GO-style catch motion
    let isDragging = false;
    let dragStartPos = { x: 0, y: 0 };
    
    mapInstance.on('mousedown', (e) => {
      isDragging = true;
      dragStartPos = { x: e.originalEvent.clientX, y: e.originalEvent.clientY };
    });
    
    mapInstance.on('mouseup', (e) => {
      if (isDragging) {
        const dx = e.originalEvent.clientX - dragStartPos.x;
        const dy = e.originalEvent.clientY - dragStartPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If the drag was short (more like a click), do a quick animation
        if (distance < 10) {
          const targetLngLat = mapInstance.unproject([e.point.x, e.point.y]);
          
          mapInstance.easeTo({
            center: [targetLngLat.lng, targetLngLat.lat],
            zoom: mapInstance.getZoom() + 0.5,
            duration: 500,
            easing: t => {
              return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            }
          });
        }
      }
      
      isDragging = false;
    });
    
    // Add double-click to zoom with smooth animation
    mapInstance.on('dblclick', (e) => {
      e.preventDefault(); // Prevent default zoom behavior
      
      const currentZoom = mapInstance.getZoom();
      const newZoom = currentZoom + 1.5; // Zoom in by 1.5 levels
      
      mapInstance.easeTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: newZoom,
        duration: 800,
        pitch: Math.min(45, mapInstance.getPitch() + 10), // Increase pitch
        easing: t => {
          // Custom spring-like easing function
          const s = 0.5;
          return t < s 
            ? (2 * t) * (2 * t) * (2 * t) / (s * s * s) 
            : ((t - s) * (2 * t - s - 1) * (2 * t - s - 1) + s * s * s) / ((1 - s) * (1 - s) * (1 - s));
        }
      });
    });
  };

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    
    // Initialize map
    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;
    
    const initializeMap = (defaultCenter: [number, number]) => {
      if (!mapContainer.current) return;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12', // Start with base style, then customize
        center: defaultCenter,
        zoom: 15,
        pitch: ISOMETRIC_VIEW.pitch,
        bearing: ISOMETRIC_VIEW.bearing,
        antialias: true, // Smoother edges
        maxPitch: ISOMETRIC_VIEW.maxPitch,
        minPitch: 0
      });
    
      map.current.on('load', () => {
        if (!map.current) return;
        
        // Apply custom styling
        applyMapStyling();
        
        // Setup enhanced map interactions
        setupMapInteractions(map.current);
        
        // Add user location control with custom appearance
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
            showUserHeading: true,
            showUserLocation: true
          }),
          'bottom-right'
        );
        
        // Example: Create map controls for zooming, etc.
        if (mapContainer.current) {
          controlsRef.current = createMapControls(map.current, defaultCenter, 15);
        }
        
        // Add radar pulse effect
        if (map.current && userLocation) {
          radarPulseRef.current = createRadarPulse(map.current);
          if (radarPulseRef.current) {
            radarPulseRef.current.updatePosition(userLocation);
          }
        }
        
        // Example: Add some hotspot markers
        const newHotspots = [
          createHotspotMarker([defaultCenter[0] + 0.002, defaultCenter[1]], map.current!, 'cafe'),
          createHotspotMarker([defaultCenter[0], defaultCenter[1] + 0.002], map.current!, 'park'),
          createHotspotMarker([defaultCenter[0] - 0.002, defaultCenter[1]], map.current!, 'landmark')
        ];
        setHotspots(newHotspots);

        // Load nearby profiles for example
        updateNearbyProfiles(defaultCenter);
    
        // Fetch nearby locations
        fetchNearbyLocations(defaultCenter)
          .then(locations => {
            console.log('Nearby locations:', locations);
            // TODO: Create markers for these locations
          })
          .catch(error => {
            console.error('Error fetching nearby locations:', error);
          });
      });
      
      return defaultCenter;
    };
    
    // Try getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userCoords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(userCoords);
          initializeMap(userCoords);
        },
        error => {
          console.warn('Error getting user location:', error);
          setUserLocation(DEFAULT_LOCATION);
          initializeMap(DEFAULT_LOCATION);
        }
      );
    } else {
      setUserLocation(DEFAULT_LOCATION);
      initializeMap(DEFAULT_LOCATION);
    }
    
    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (radarPulseRef.current) {
        radarPulseRef.current.cleanup();
      }
      profileMarkersRef.current.forEach(marker => marker.cleanup());
      if (hotspots.length > 0) {
        hotspots.forEach(marker => marker.remove());
      }
    };
  }, []);
  
  // Update radar pulse when user location changes
  useEffect(() => {
    if (map.current && userLocation && !radarPulseRef.current) {
      radarPulseRef.current = createRadarPulse(map.current);
      if (radarPulseRef.current) {
        radarPulseRef.current.updatePosition(userLocation);
      }
    } else if (map.current && userLocation && radarPulseRef.current) {
      radarPulseRef.current.updatePosition(userLocation);
    }
  }, [userLocation]);

  // Add floating animation to the radar pulse
  useEffect(() => {
    if (radarPulseRef.current) {
      // Access the element safely with proper type checking
      const pulseElement = radarPulseRef.current as any;
      if (pulseElement && pulseElement.getElement) {
        const element = pulseElement.getElement();
        if (element) {
          element.classList.add('float-effect');
        }
      }
    }
  }, [radarPulseRef.current]);

  return (
    <div ref={mapContainer} className="relative h-full w-full">
      {/* Add floating action buttons in Pokémon GO style */}
      <div className="absolute bottom-24 right-4 z-30 flex flex-col gap-3">
        <button 
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center pop-in-effect hover:scale-110 transition-transform"
          onClick={() => console.log('Refresh nearby profiles')}
          aria-label="Refresh"
        >
          <div className="w-8 h-8 bg-dating-primary mask-refresh"></div>
        </button>
        <button 
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center pop-in-effect hover:scale-110 transition-transform"
          onClick={() => console.log('Filter profiles')}
          aria-label="Filter"
        >
          <div className="w-8 h-8 bg-dating-secondary mask-filter"></div>
        </button>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .mask-refresh {
            mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>');
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>');
            -webkit-mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
          }
          .mask-filter {
            mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>');
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>');
            -webkit-mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
          }
        `
      }} />
    </div>
  );
}

function calculateDistance(
  point1: [number, number],
  point2: [number, number]
): number {
  // Convert degrees to radians
  const lon1 = (point1[0] * Math.PI) / 180;
  const lon2 = (point2[0] * Math.PI) / 180;
  const lat1 = (point1[1] * Math.PI) / 180;
  const lat2 = (point2[1] * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 6371; // Radius of earth in kilometers
  return c * r;
} 