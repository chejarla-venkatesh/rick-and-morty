'use client';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_EPISODES } from '../../lib/queries';
import EpisodeCard from '../../components/EpisodeCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function EpisodesPage() {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: { page }
  });

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-500 text-2xl font-body">Error loading episodes: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="text-5xl font-bold font-display text-gray-900 mb-6">
          Rick & Morty Episodes
        </h1>
        <p className="text-xl text-gray-600 mb-8 font-body max-w-3xl mx-auto">
          Explore all {data?.episodes?.info?.count || '51'} episodes from the Rick and Morty series across multiple seasons and dimensions
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Episodes Grid */}
      {data?.episodes?.results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {data.episodes.results.map((episode, index) => (
              <EpisodeCard 
                key={episode.id} 
                episode={episode} 
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-6">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setPage(page - 1)}
              disabled={!data.episodes.info.prev}
              className="text-lg px-8 py-3 font-medium"
            >
              Previous
            </Button>
            <span className="text-xl text-gray-600 font-body font-medium px-6">
              Page {page} of {data.episodes.info.pages}
            </span>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => setPage(page + 1)}
              disabled={!data.episodes.info.next}
              className="text-lg px-8 py-3 font-medium"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
