'use client';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

const CharacterCard = ({ character, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-500/25';
      case 'Dead': return 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/25';
      default: return 'bg-gradient-to-r from-slate-500 to-slate-600 shadow-slate-500/25';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Alive': return '🟢';
      case 'Dead': return '🔴';
      default: return '⚪';
    }
  };

  // Safe access to nested properties with fallbacks
  const originName = character.origin?.name || 'Unknown';
  const locationName = character.location?.name || 'Unknown';

  return (
    <Link href={`/characters/${character.id}`}>
      <div 
        className={`group cursor-pointer overflow-hidden transform transition-all duration-700 ease-out ${
          isHovered ? 'scale-105 -translate-y-2' : 'scale-100'
        }`}
        style={{ 
          animationDelay: `${index * 0.1}s`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Card Container */}
        <div className="relative h-96 w-full">
          {/* Background Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl transition-all duration-700 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`} />
          
          {/* Glass Card */}
          <div className="relative h-full w-full glass-dark rounded-3xl overflow-hidden border border-white/10">
            
            {/* Character Image Section */}
            <div className="relative h-64 overflow-hidden">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage 
                  src={character.image} 
                  alt={character.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? 'scale-110 brightness-110 saturate-110' : 'scale-100'
                  }`}
                />
                <AvatarFallback className="w-full h-full text-4xl bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                  {character.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 transform transition-all duration-300 hover:scale-110">
                <Badge className={`${getStatusColor(character.status)} text-white border-0 shadow-lg backdrop-blur-sm px-3 py-2`}>
                  <span className="flex items-center space-x-2 text-sm font-medium">
                    <span>{getStatusIcon(character.status)}</span>
                    <span>{character.status}</span>
                  </span>
                </Badge>
              </div>

              {/* Hover Info Overlay */}
              <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 transform ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <div className="glass rounded-2xl px-4 py-3 border border-white/20">
                  <p className="text-white text-sm font-medium font-body">
                    🌍 {originName}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card Content Section */}
            <div className="p-6 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-b-3xl"></div>
              
              <div className="relative z-10">
                {/* Character Name */}
                <h3 className="text-xl font-bold font-display text-white mb-4 transition-all duration-300 uppercase tracking-wide leading-tight">
                  {character.name}
                </h3>
                
                {/* Character Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🧬</span>
                    <p className="text-sm text-slate-300 font-medium font-body">{character.species || 'Unknown'}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-base">📍</span>
                    <p className="text-sm text-slate-400 font-body truncate">{originName}</p>
                  </div>
                </div>
              </div>
              
              {/* Animated Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 ${
                isHovered 
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-100' 
                  : 'bg-transparent opacity-0'
              }`} />
            </div>
          </div>
          
          {/* Hover Glow Effect */}
          <div className={`absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl transition-opacity duration-700 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } -z-10 blur-xl`} />
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
