'use client';
import { useState, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CharacterCarousel = ({ characters, page, totalPages, onPageChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  // Limit to max 5 cards for better performance
  const displayedCharacters = useMemo(() => 
    characters.slice(0, 5), [characters]
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
      case 'Dead': return 'bg-gradient-to-r from-red-500 to-red-600';
      default: return 'bg-gradient-to-r from-slate-500 to-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Alive': return '🟢';
      case 'Dead': return '🔴';
      default: return '⚪';
    }
  };

  // Enhanced card positioning with smooth transitions
  const getCardTransform = useCallback((index, totalCards) => {
    const centerIndex = Math.floor(totalCards / 2);
    const offset = (index - centerIndex) * 280; // Increased spacing
    const isCenter = index === centerIndex;
    
    let zIndex, scale, opacity, translateY;
    
    if (hoveredIndex === index) {
      // Hovered card
      zIndex = 100;
      scale = 1.2;
      opacity = 1;
      translateY = -40;
    } else if (hoveredIndex === null) {
      // Default state
      zIndex = 50 + index;
      scale = isCenter ? 1.1 : 0.9;
      opacity = isCenter ? 1 : 0.8;
      translateY = 0;
    } else {
      // Non-hovered cards
      zIndex = 60 + index;
      scale = 0.85;
      opacity = 0.7;
      translateY = 0;
    }
    
    return {
      transform: `translateX(${offset}px) translateY(${translateY}px) scale(${scale})`,
      zIndex,
      opacity,
    };
  }, [hoveredIndex]);

  const handleMouseEnter = useCallback((index) => {
    if (!isTransitioning) {
      setHoveredIndex(index);
    }
  }, [isTransitioning]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div className="relative mb-16 py-12">
      {/* Main Carousel Container */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-3xl blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 rounded-3xl"></div>
        
        <div 
          ref={carouselRef}
          className="relative flex justify-center items-center min-h-[700px] px-24 overflow-visible"
        >
          {/* Character Cards Container */}
          <div className="relative w-full flex justify-center items-center">
            {displayedCharacters.map((character, index) => {
              const cardStyle = getCardTransform(index, displayedCharacters.length);
              
              // Safe access to nested properties with fallbacks
              const originName = character.origin?.name || 'Unknown';
              const locationName = character.location?.name || 'Unknown';
              
              return (
                <div
                  key={character.id}
                  className="absolute cursor-pointer will-change-transform"
                  style={{
                    ...cardStyle,
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={`/characters/${character.id}`}>
                    <div className="w-80 h-[500px] glass-dark rounded-3xl shadow-2xl border border-white/20 overflow-hidden group">
                      
                      {/* Character Image Section */}
                      <div className="relative h-80 overflow-hidden">
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                            hoveredIndex === index 
                              ? 'scale-110 brightness-110 saturate-110' 
                              : 'scale-100'
                          }`}
                          style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className={`absolute top-6 right-6 transition-transform duration-300 ease-out ${
                          hoveredIndex === index ? 'scale-110' : 'scale-100'
                        }`}>
                          <Badge className={`${getStatusColor(character.status)} text-white text-sm px-4 py-2 font-semibold shadow-lg`}>
                            <span className="flex items-center space-x-2">
                              <span>{getStatusIcon(character.status)}</span>
                              <span>{character.status}</span>
                            </span>
                          </Badge>
                        </div>

                        {/* Enhanced Hover Overlay */}
                        <div className={`absolute inset-x-6 bottom-6 transition-all duration-500 ease-out ${
                          hoveredIndex === index 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-4 opacity-0'
                        }`}>
                          <div className="glass rounded-2xl px-5 py-3 border border-white/20">
                            <p className="text-white text-sm font-medium font-body mb-1">
                              <span className="text-emerald-300">🌍</span> Origin
                            </p>
                            <p className="text-white/90 text-xs font-body truncate">
                              {originName}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Content Section */}
                      <div className="p-6 relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-emerald-50/20 rounded-b-3xl"></div>
                        
                        <div className="relative z-10">
                          <h3 className={`text-xl font-bold font-display text-white mb-4 uppercase tracking-wide transition-colors duration-300 ease-out ${
                            hoveredIndex === index ? 'text-emerald-400' : ''
                          }`}>
                            {character.name}
                          </h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-base">🧬</span>
                              <p className="text-sm text-slate-300 font-medium font-body">{character.species || 'Unknown'}</p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className="text-sm">📍</span>
                              <p className="text-xs text-slate-400 font-body truncate">{locationName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Animated Border */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 ease-out ${
                          hoveredIndex === index 
                            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-100' 
                            : 'bg-transparent opacity-0'
                        }`}></div>
                      </div>
                      
                      {/* Card Glow Effect */}
                      <div className={`absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl transition-opacity duration-500 ease-out ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      } -z-10 blur-xl`}></div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full glass border-2 border-white/20 hover:bg-white/10 hover:border-emerald-400 hover:shadow-2xl shadow-lg z-50 transition-all duration-300 group"
          >
            <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full glass border-2 border-white/20 hover:bg-white/10 hover:border-emerald-400 hover:shadow-2xl shadow-lg z-50 transition-all duration-300 group"
          >
            <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Page Indicator */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center glass rounded-full px-8 py-4 shadow-xl border border-white/20">
          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(5, displayedCharacters.length) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    hoveredIndex === index 
                      ? 'bg-emerald-500 scale-125' 
                      : 'bg-white/40 scale-100'
                  }`}
                />
              ))}
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <span className="text-lg font-medium text-white font-body">
              Page {page} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCarousel;
