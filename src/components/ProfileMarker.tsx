import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

interface Profile {
  id: string;
  name: string;
  photo: string;
  interests: string[];
  location: [number, number];
  compatibility?: number; // Optional compatibility score 0-100
  activeStatus?: 'online' | 'recently' | 'away'; // Online status
  distance?: string; // Distance from user
}

interface ProfileMarkerProps {
  profile: Profile;
  map: mapboxgl.Map;
}

export const createProfileMarker = (
  profile: Profile,
  map: mapboxgl.Map,
  onWave: (profileId: string) => void
) => {
  const el = document.createElement('div');
  el.className = 'profile-marker';
  
  // Add styles for the marker and animations
  const style = document.createElement('style');
  style.textContent = `
    .profile-marker {
      width: 50px;
      height: 50px;
      cursor: pointer;
      position: relative;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 10;
    }

    .profile-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      border: 3px solid #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: spawn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
                float 3s ease-in-out infinite;
      transform-origin: center center;
      will-change: transform, opacity;
      position: relative;
      z-index: 2;
    }

    .profile-marker::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 10px;
      background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
      border-radius: 50%;
      z-index: 1;
      animation: shadow-pulse 3s ease-in-out infinite;
    }

    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      z-index: 3;
    }

    .status-online {
      background-color: #00E676;
      box-shadow: 0 0 0 rgba(0, 230, 118, 0.4);
      animation: pulse-status 2s infinite;
    }

    .status-recently {
      background-color: #FFAB00;
    }

    .status-away {
      background-color: #ccc;
    }

    .compatibility-ring {
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top: 2px solid var(--dating-primary);
      z-index: 3;
      animation: rotate 4s linear infinite;
    }

    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes shadow-pulse {
      0% { opacity: 0.6; transform: translateX(-50%) scale(1); }
      50% { opacity: 0.4; transform: translateX(-50%) scale(0.8); }
      100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
    }

    @keyframes pulse-status {
      0% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 230, 118, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 230, 118, 0); }
    }

    @keyframes spawn {
      0% {
        opacity: 0;
        transform: scale(0.3) translateY(20px);
      }
      50% {
        opacity: 1;
        transform: scale(1.1) translateY(-5px);
      }
      75% {
        transform: scale(0.95) translateY(2px);
      }
      100% {
        transform: scale(1) translateY(0);
      }
    }

    @keyframes float {
      0% { 
        transform: translateY(0) scale(1); 
      }
      50% { 
        transform: translateY(-8px) scale(1.02);
      }
      100% { 
        transform: translateY(0) scale(1); 
      }
    }

    .profile-avatar:hover {
      animation: none;
      transform: scale(1.15);
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }

    .profile-card {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      padding: 20px;
      border-radius: 24px 24px 0 0;
      box-shadow: 0 -5px 25px rgba(0,0,0,0.1);
      transform: translateY(100%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1000;
      max-height: 80vh;
      overflow-y: auto;
    }

    .profile-card.active {
      transform: translateY(0);
    }

    .profile-card-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .profile-card-photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
      border: 3px solid #FFD166;
      object-fit: cover;
    }

    .profile-card-info {
      flex: 1;
    }

    .profile-card-info h2 {
      margin: 0 0 5px 0;
      color: #333;
      font-size: 1.5em;
      font-weight: 700;
    }

    .profile-meta {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #666;
      font-size: 0.9em;
    }

    .profile-meta .distance {
      margin-right: 15px;
    }

    .match-percentage {
      color: var(--dating-primary);
      font-weight: 600;
    }

    .interests-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 15px 0;
    }

    .interest-tag {
      background: #f6f6f6;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 0.9em;
      color: #555;
      font-weight: 500;
      transition: all 0.2s;
    }

    .interest-tag:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .wave-button {
      background: var(--dating-primary);
      color: white;
      border: none;
      padding: 14px 24px;
      border-radius: 50px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      flex: 1;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(255, 77, 121, 0.3);
    }

    .wave-button:hover {
      background: #ff3366;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(255, 77, 121, 0.4);
    }

    .pass-button {
      background: #f0f0f0;
      color: #666;
      border: none;
      padding: 14px 24px;
      border-radius: 50px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      flex: 1;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .pass-button:hover {
      background: #e5e5e5;
      transform: translateY(-2px);
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(3px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
      z-index: 999;
    }

    .backdrop.active {
      opacity: 1;
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  // Create avatar element
  const avatar = document.createElement('div');
  avatar.className = 'profile-avatar';
  avatar.style.backgroundImage = `url(${profile.photo})`;
  el.appendChild(avatar);

  // Add status indicator if available
  if (profile.activeStatus) {
    const statusIndicator = document.createElement('div');
    statusIndicator.className = `status-indicator status-${profile.activeStatus}`;
    el.appendChild(statusIndicator);
  }

  // Add compatibility ring if score is available
  if (profile.compatibility && profile.compatibility > 70) {
    const compatibilityRing = document.createElement('div');
    compatibilityRing.className = 'compatibility-ring';
    el.appendChild(compatibilityRing);
  }

  // Create profile card with enhanced UI
  const card = document.createElement('div');
  card.className = 'profile-card';
  
  const interestsHTML = profile.interests.map(interest => 
    `<span class="interest-tag">${interest}</span>`
  ).join('');
  
  const compatibilityHTML = profile.compatibility ? 
    `<span class="match-percentage">${profile.compatibility}% Match</span>` : '';
  
  const distanceHTML = profile.distance ? 
    `<span class="distance">${profile.distance} away</span>` : '';

  card.innerHTML = `
    <div class="profile-card-header">
      <img src="${profile.photo}" class="profile-card-photo" alt="${profile.name}" />
      <div class="profile-card-info">
        <h2>${profile.name}</h2>
        <div class="profile-meta">
          ${distanceHTML}
          ${compatibilityHTML}
        </div>
        <div class="interests-list">
          ${interestsHTML}
        </div>
      </div>
    </div>
    <div class="action-buttons">
      <button class="wave-button">👋 Wave Hello</button>
      <button class="pass-button">✕ Not Now</button>
    </div>
  `;
  document.body.appendChild(card);

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'backdrop';
  document.body.appendChild(backdrop);

  // Add click handlers
  el.addEventListener('click', () => {
    card.classList.add('active');
    backdrop.classList.add('active');
  });

  backdrop.addEventListener('click', () => {
    card.classList.remove('active');
    backdrop.classList.remove('active');
  });

  const waveButton = card.querySelector('.wave-button');
  if (waveButton) {
    waveButton.addEventListener('click', () => {
      onWave(profile.id);
      
      // Add successful match animation
      waveButton.innerHTML = '✓ Sent!';
      (waveButton as HTMLElement).style.background = 'var(--dating-success)';
      
      setTimeout(() => {
        card.classList.remove('active');
        backdrop.classList.remove('active');
      }, 1500);
    });
  }
  
  const passButton = card.querySelector('.pass-button');
  if (passButton) {
    passButton.addEventListener('click', () => {
      card.classList.remove('active');
      backdrop.classList.remove('active');
    });
  }

  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(profile.location)
    .addTo(map);

  return {
    marker,
    cleanup: () => {
      card.remove();
      backdrop.remove();
      marker.remove();
    }
  };
}; 