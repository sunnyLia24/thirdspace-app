import React from 'react';
import { cn } from '@/lib/utils';
import type { NearbyUser } from '@/data/nearbyUsers';

interface UserAvatarProps {
  user: NearbyUser;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'medium', className }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div 
      className={cn(
        "rounded-full overflow-hidden border-2 border-white shadow-sm",
        sizeClasses[size],
        className
      )}
      title={user.name}
    >
      <img 
        src={user.profileImage} 
        alt={user.name} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserAvatar; 