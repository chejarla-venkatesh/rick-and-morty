'use client';
import { useState, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CharacterCarousel = ({ characters, page, totalPages, onPageChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const carouselRef = useRef(null);

  // Limit to max 5 cards
  const displayedCharacters = useMemo(() => 
    characters.slice(0, 5), [characters]
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'Dead': return 'bg-gradient-to-r from-red-500 to-red-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  // Anti-flicker mouse event handlers
  const handleMouseEnter = useCallback((index) => {
    // Clear any pending timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Only update if not transitioning
    if (!isTransitioning) {
      setHoveredIndex(index);
    }
  }, [isTransitioning]);

  const handleMouseLeave = useCallback(() => {
    // Don't immediately reset - use timeout to prevent flicker
    hoverTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setHoveredIndex(null);
      
      // Reset transition flag after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 150); // Delay before resetting
  }, []);

  // Container mouse enter to clear timeout if mouse re-enters quickly
  const handleContainerMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
      setIsTransitioning(false);
    }
  }, []);

 // Enhanced card positioning with better center card visibility
  const getCardTransform = useCallback((index, totalCards) => {
    const centerIndex = Math.floor(totalCards / 2);
    const offset = (index - centerIndex) * 250;
    const isCenter = index === centerIndex;
    
    // Simple z-index: hovered card = 100, others based on index
    let zIndex;
    if (hoveredIndex === index) {
      zIndex = 100; // Hovered card always on top
    } else if (hoveredIndex === null) {
      zIndex = 50 + index; // Default state - each card has unique z-index
    } else {
      zIndex = 60 + index; // Non-hovered cards get higher base z-index
    }
    
    if (hoveredIndex === null) {
      return {
        transform: `translateX(${offset}px) scale(${isCenter ? 1.1 : 0.95}) translateZ(0)`, // Increased center scale and added translateZ for better rendering
        zIndex: isCenter ? zIndex + 10 : zIndex, // Give center card extra z-index boost
        opacity: 1,
      };
    }
    
    if (hoveredIndex === index) {
      return {
        transform: `translateX(${offset}px) translateY(-30px) scale(1.15) translateZ(0)`,
        zIndex: zIndex,
        opacity: 1,
      };
    }
    
    // Adjacent cards
    if (Math.abs(hoveredIndex - index) === 1) {
      return {
        transform: `translateX(${offset}px) scale(0.98) translateZ(0)`,
        zIndex: zIndex,
        opacity: 0.95,
      };
    }
    
    // Distant cards
    return {
      transform: `translateX(${offset}px) scale(0.9) translateZ(0)`,
      zIndex: zIndex,
      opacity: 0.9,
    };
  }, [hoveredIndex]);
  

  return (
    <div className="relative mb-16 py-8">
      {/* Main Carousel Container with anti-flicker handler */}
      <div className="relative" onMouseEnter={handleContainerMouseEnter}>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
        
        <div 
          ref={carouselRef}
          className="relative flex justify-center items-center min-h-[650px] px-20 overflow-visible"
        >
          {/* Character Cards Container */}
          <div className="relative w-full flex justify-center items-center">
            {displayedCharacters.map((character, index) => {
              const cardStyle = getCardTransform(index, displayedCharacters.length);
              
              return (
                <div
                  key={character.id}
                  className="absolute cursor-pointer will-change-transform"
                  style={{
                    ...cardStyle,
                    transition: isTransitioning 
                      ? 'all 0.2s ease-out' 
                      : 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smoother easing
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={`/characters/${character.id}`}>
                    <div className="w-72 h-[450px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 overflow-hidden group">
                      
                      {/* Character Image Section */}
                      <div className="relative h-72 overflow-hidden">
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className={`w-full h-full object-cover transition-all duration-300 ease-out ${
                            hoveredIndex === index 
                              ? 'scale-110 brightness-110 saturate-110' 
                              : 'scale-100'
                          }`}
                          style={{ 
                            backfaceVisibility: 'hidden', // Prevent flickering during transforms
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        />
                        
                        {/* Static Gradient Overlay - Prevents flicker */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className={`absolute top-6 right-6 transition-transform duration-200 ease-out ${
                          hoveredIndex === index ? 'scale-110' : 'scale-100'
                        }`}>
                          <Badge className={`${getStatusColor(character.status)} text-white text-sm px-3 py-1.5 font-semibold shadow-lg`}>
                            <span className="flex items-center space-x-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${
                                character.status === 'Alive' 
                                  ? 'bg-green-300 animate-pulse' 
                                  : character.status === 'Dead' 
                                  ? 'bg-red-300' 
                                  : 'bg-gray-300'
                              }`}></div>
                              <span>{character.status}</span>
                            </span>
                          </Badge>
                        </div>

                        {/* Enhanced Hover Overlay */}
                        <div className={`absolute inset-x-6 bottom-6 transition-all duration-300 ease-out ${
                          hoveredIndex === index 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-2 opacity-0'
                        }`}>
                          <div className="bg-black/80 backdrop-blur-lg rounded-2xl px-5 py-3 border border-white/20">
                            <p className="text-white text-sm font-medium font-body mb-1">
                              <span className="text-green-300">🌍</span> Origin
                            </p>
                            <p className="text-white/90 text-xs font-body truncate">
                              {character.origin.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Content Section */}
                      <div className="p-6 relative">
                        {/* Static background - no hover changes to prevent flicker */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-blue-50/30 rounded-b-3xl"></div>
                        
                        <div className="relative z-10">
                          <h3 className={`text-lg font-bold font-display text-gray-900 mb-3 uppercase tracking-wide transition-colors duration-200 ease-out ${
                            hoveredIndex === index ? 'text-green-600' : ''
                          }`}>
                            {character.name}
                          </h3>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-base">🧬</span>
                              <p className="text-sm text-gray-600 font-medium font-body">{character.species}</p>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className="text-sm">📍</span>
                              <p className="text-xs text-gray-500 font-body truncate">{character.location.name}</p>
                            </div>
                          </div>
                        </div>

                        {/* Simplified Animated Border */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ease-out ${
                          hoveredIndex === index 
                            ? 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-100' 
                            : 'bg-transparent opacity-0'
                        }`}></div>
                      </div>
                      
                      {/* Simplified card glow effect */}
                      <div className={`absolute -inset-1 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl transition-opacity duration-300 ease-out ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      } -z-10`}></div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows - Same as before */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border-2 border-white/60 hover:bg-white hover:border-green-300 hover:shadow-xl shadow-lg z-50 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border-2 border-white/60 hover:bg-white hover:border-green-300 hover:shadow-xl shadow-lg z-50 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Page Indicator */}
      <div className="text-center mt-10">
        <div className="inline-flex items-center bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/40">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, displayedCharacters.length) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    hoveredIndex === index 
                      ? 'bg-green-500 scale-125' 
                      : 'bg-gray-300 scale-100'
                  }`}
                />
              ))}
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <span className="text-lg font-medium text-gray-700 font-body">
              Page {page} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCarousel;
