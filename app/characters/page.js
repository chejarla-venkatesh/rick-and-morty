'use client';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_CHARACTERS } from '../../lib/queries';
import CharacterCard from '../../components/CharacterCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { 
      page,
      filter: searchTerm ? { name: searchTerm } : {}
    }
  });

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-500 text-xl">Error loading characters: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rick & Morty Characters
        </h1>
        <p className="text-gray-600 mb-8">
          Discover all {data?.characters?.info?.count || '826'} characters from the multiverse
        </p>
        
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <Input
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // Reset to first page when searching
            }}
            className="text-lg"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Characters Grid */}
      {data?.characters?.results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {data.characters.results.map((character, index) => (
              <CharacterCard 
                key={character.id} 
                character={character} 
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setPage(page - 1)}
              disabled={!data.characters.info.prev}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {page} of {data.characters.info.pages}
            </span>
            <Button 
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={!data.characters.info.next}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* No Results */}
      {data?.characters?.results?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No characters found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
