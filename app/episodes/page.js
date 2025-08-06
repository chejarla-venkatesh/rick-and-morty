'use client';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_EPISODES } from '../../lib/queries';
import EpisodeCard from '../../components/EpisodeCard';
import { Input } from '@/components/ui/input';
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
        <p className="text-red-500 text-xl">Error loading episodes: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rick & Morty Episodes
        </h1>
        <p className="text-gray-600 mb-8">
          Explore all {data?.episodes?.info?.count || '51'} episodes across multiple seasons
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Episodes Grid */}
      {data?.episodes?.results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.episodes.results.map((episode, index) => (
              <EpisodeCard 
                key={episode.id} 
                episode={episode} 
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setPage(page - 1)}
              disabled={!data.episodes.info.prev}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {page} of {data.episodes.info.pages}
            </span>
            <Button 
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={!data.episodes.info.next}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
