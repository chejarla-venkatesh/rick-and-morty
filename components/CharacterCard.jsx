'use client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

const CharacterCard = ({ character, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return 'bg-gradient-to-r from-green-500 to-green-600 shadow-green-300';
      case 'Dead': return 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-300';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 shadow-gray-300';
    }
  };

  return (
    <Link href={`/characters/${character.id}`}>
      <Card 
        className={`character-card group cursor-pointer overflow-hidden transform transition-all duration-500 hover:scale-105 animate-fadeInUp ${
          isHovered ? 'shadow-2xl -translate-y-4' : 'shadow-lg hover:shadow-2xl hover:-translate-y-2'
        }`}
        style={{ 
          animationDelay: `${index * 0.1}s`,
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <Avatar className="character-image-container w-full h-64 rounded-none relative">
            <AvatarImage 
              src={character.image} 
              alt={character.name}
              className={`character-image object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-110' : 'scale-100'
              }`}
            />
            <AvatarFallback className="w-full h-64 text-2xl bg-gradient-to-br from-green-200 to-blue-200">
              {character.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {/* Animated overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Glowing effect */}
          <div className={`absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Status badge with enhanced styling */}
          <div className="absolute top-4 right-4 transform transition-all duration-300 hover:scale-110">
            <Badge className={`${getStatusColor(character.status)} text-white border-0 shadow-lg backdrop-blur-sm`}>
              <span className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  character.status === 'Alive' ? 'bg-green-300 animate-pulse' : 
                  character.status === 'Dead' ? 'bg-red-300' : 'bg-gray-300'
                }`}></div>
                <span>{character.status}</span>
              </span>
            </Badge>
          </div>

          {/* Hover info overlay */}
          <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <p className="text-white text-base font-medium drop-shadow-lg font-body" style={{color: 'white'}}>
              🌍 {character.origin.name}
            </p>
          </div>
        </div>
        
        <CardContent className="p-6 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-green-100 to-blue-100"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-3 transition-all duration-300 uppercase tracking-wide">
              {character.name}
            </h3>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-xl">🧬</span>
              <p className="text-lg text-gray-600 font-medium font-body">{character.species}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-base">📍</span>
              <p className="text-base text-gray-500 font-body truncate">{character.origin.name}</p>
            </div>
          </div>          
        </CardContent>
      </Card>
    </Link>
  );
};

export default CharacterCard;
