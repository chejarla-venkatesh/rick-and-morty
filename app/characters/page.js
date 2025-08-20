'use client';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_CHARACTERS } from '../../lib/queries';
import CharacterCard from '../../components/CharacterCard';
import CharacterCarousel from '../../components/CharacterCarousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'carousel'

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { 
      page,
      filter: searchTerm ? { name: searchTerm } : {}
    }
  });

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-400 text-xl">Error loading characters: {error.message}</p>
      </div>
    );
  }

  const LayoutIcon = ({ type, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'glass border-2 border-emerald-400 text-emerald-400 shadow-lg' 
          : 'glass-dark border-2 border-white/20 text-white/70 hover:bg-white/10 hover:text-white hover:border-emerald-400/50'
      }`}
    >
      {type === 'grid' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0V17m0-10a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="container mx-auto px-6 py-12">     
      {/* Header */}
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="text-5xl font-bold font-display text-white mb-6">
          Rick & Morty Characters
        </h1>
        <p className="text-xl text-slate-300 mb-8 font-body max-w-3xl mx-auto">
          Explore {data?.characters?.info?.count || '800+'} characters from across the multiverse
        </p>
      </div>

      {/* Search and Layout Controls */}
      <div className="mb-12 animate-fadeInUp">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mx-auto w-full">
          {/* Search Bar - Left Side */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                placeholder="Search for characters..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full h-14 text-lg glass-dark border-2 border-white/20 rounded-2xl shadow-lg focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 pl-14 pr-14 text-white placeholder:text-white/50"
              />

              {/* Search icon */}
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Clear button */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Layout Toggle - Right Side */}
          <div className="flex items-center space-x-3">
            <LayoutIcon 
              type="grid" 
              isActive={layoutMode === 'grid'} 
              onClick={() => setLayoutMode('grid')}
            />
            <LayoutIcon 
              type="carousel" 
              isActive={layoutMode === 'carousel'} 
              onClick={() => setLayoutMode('carousel')}
            />
          </div>
        </div>
      </div>

      {/* Loading State - Different for Grid vs Carousel */}
      {loading && (
        <>
          {layoutMode === 'grid' ? (
            /* Grid Loading Skeleton */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="glass-dark rounded-3xl overflow-hidden">
                    <Skeleton className="h-64 w-full bg-white/10" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 bg-white/10 mb-3" />
                      <Skeleton className="h-4 w-1/2 bg-white/10 mb-2" />
                      <Skeleton className="h-4 w-2/3 bg-white/10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Carousel Loading Skeleton */
            <div className="flex items-center justify-center gap-8 mb-12">
              {/* Left Arrow Skeleton */}
              <Skeleton className="w-16 h-16 rounded-full bg-white/10 flex-shrink-0" />

              {/* Carousel Cards Skeleton */}
              <div className="flex-1 max-w-6xl">
                <div className="relative py-12">
                  <div className="relative flex justify-center items-center min-h-[700px] px-24 overflow-visible">
                    <div className="relative w-full flex justify-center items-center">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const centerIndex = Math.floor(5 / 2);
                        const offset = (index - centerIndex) * 280;
                        const isCenter = index === centerIndex;

                        return (
                          <div
                            key={index}
                            className="absolute"
                            style={{
                              transform: `translateX(${offset}px) scale(${isCenter ? 1.1 : 0.9})`,
                              zIndex: 5 - Math.abs(index - centerIndex),
                              left: '50%',
                              top: '50%',
                              marginLeft: '-160px',
                              marginTop: '-250px',
                            }}
                          >
                            <Skeleton className="w-80 h-[500px] rounded-3xl bg-white/10" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Page indicator skeleton */}
                  <div className="text-center mt-12">
                    <Skeleton className="w-64 h-16 rounded-full bg-white/10 mx-auto" />
                  </div>
                </div>
              </div>

              {/* Right Arrow Skeleton */}
              <Skeleton className="w-16 h-16 rounded-full bg-white/10 flex-shrink-0" />
            </div>
          )}
        </>
      )}

      {/* Characters Display */}
      {data?.characters?.results && (
        <>
          {layoutMode === 'grid' ? (
            /* Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {data.characters.results.map((character, index) => (
                <CharacterCard 
                  key={character.id} 
                  character={character} 
                  index={index}
                />
              ))}
            </div>
          ) : (
            /* Carousel Layout */
            <CharacterCarousel 
              characters={data.characters.results}
              page={page}
              totalPages={data.characters.info.pages}
              onPageChange={setPage}
            />
          )}

          {/* Pagination - Only show for grid layout */}
          {layoutMode === 'grid' && (
            <div className="flex justify-center items-center space-x-6">
              <Button 
                variant="outline" 
                onClick={() => setPage(page - 1)}
                disabled={!data.characters.info.prev}
                className="text-lg px-8 py-3 font-medium glass-dark border-2 border-white/20 text-white hover:bg-white/10 hover:border-emerald-400"
              >
                Previous
              </Button>
              <span className="text-xl text-white font-body font-medium px-6">
                Page {page} of {data.characters.info.pages}
              </span>
              <Button 
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={!data.characters.info.next}
                className="text-lg px-8 py-3 font-medium glass-dark border-2 border-white/20 text-white hover:bg-white/10 hover:border-emerald-400"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {data?.characters?.results?.length === 0 && (
        <div className="text-center py-20">
          <div className="glass-dark rounded-3xl p-12 max-w-md mx-auto">
            <p className="text-white/70 text-xl mb-4">No characters found</p>
            <p className="text-white/50 text-base">Try adjusting your search terms</p>
          </div>
        </div>
      )}
    </div>
  );
}
