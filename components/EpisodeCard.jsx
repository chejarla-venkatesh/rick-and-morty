'use client';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

const EpisodeCard = ({ episode, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract season and episode number from episode code (e.g., "S01E01")
  const getSeasonInfo = (episodeCode) => {
    const match = episodeCode.match(/S(\d+)E(\d+)/);
    if (match) {
      return {
        season: parseInt(match[1]),
        episode: parseInt(match[2])
      };
    }
    return { season: 1, episode: 1 };
  };

  const { season, episode: episodeNum } = getSeasonInfo(episode.episode);

  // Safe access to characters array with fallback
  const characters = episode.characters || [];
  const characterCount = characters.length;

  return (
    <Link href={`/episodes/${episode.id}`}>
      <div 
        className={`group cursor-pointer overflow-hidden transform transition-all duration-700 ease-out ${
          isHovered ? 'scale-105 -translate-y-3' : 'scale-100'
        }`}
        style={{ 
          animationDelay: `${index * 0.1}s`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Card Container */}
        <div className="relative h-full w-full">
          {/* Background Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl transition-all duration-700 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`} />
          
          {/* Glass Card */}
          <div className="relative h-full w-full glass-dark rounded-3xl overflow-hidden border border-white/10">
            
            {/* Header Section */}
            <div className="p-6 border-b border-white/10">
              {/* Badges */}
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-3 py-1.5 font-semibold border-0">
                  Season {season}
                </Badge>
                <Badge variant="outline" className="text-white/80 border-white/30 text-sm px-3 py-1.5 font-medium">
                  Episode {episodeNum}
                </Badge>
              </div>
              
              {/* Episode Title */}
              <h3 className="text-xl font-bold font-display text-white group-hover:text-emerald-400 transition-colors duration-300 mb-3 leading-tight">
                {episode.name}
              </h3>
              
              {/* Air Date */}
              <p className="text-sm text-slate-400 font-body">{episode.air_date}</p>
            </div>
            
            {/* Content Section */}
            <div className="p-6">
              {/* Character Count */}
              <div className="mb-6">
                <p className="text-sm text-slate-300 mb-4 font-body">
                  <span className="font-semibold text-white">Characters:</span> {characterCount}
                </p>
                
                {/* Character Avatars */}
                <div className="flex -space-x-3 overflow-hidden mb-4">
                  {characters.slice(0, 6).map((character) => (
                    <Avatar 
                      key={character.id} 
                      className="inline-block border-2 border-white/20 w-10 h-10 hover:scale-110 transition-transform duration-200"
                    >
                      <AvatarImage 
                        src={character.image} 
                        alt={character.name}
                      />
                      <AvatarFallback className="text-xs font-semibold bg-slate-700 text-white">
                        {character.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {characterCount > 6 && (
                    <div className="flex items-center justify-center w-10 h-10 bg-slate-700 rounded-full border-2 border-white/20 text-xs font-bold text-white">
                      +{characterCount - 6}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Episode Info */}
              <div className="text-sm text-slate-400 font-body">
                {episode.episode} • {characterCount} characters
              </div>
            </div>
            
            {/* Animated Border */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 ${
              isHovered 
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-100' 
                : 'bg-transparent opacity-0'
            }`} />
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

export default EpisodeCard;
