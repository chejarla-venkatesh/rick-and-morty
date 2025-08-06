'use client';
import { use } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_EPISODE } from '../../../lib/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function EpisodeDetailPage({ params }) {
  
    const { id } = use(params);
  
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-500 text-xl">Error loading episode: {error.message}</p>
      </div>
    );
  }

  const episode = data?.episode;
  if (!episode) return null;

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

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Episode Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-center space-x-4 mb-4">
            <Badge className="bg-blue-600 text-white">
              Season {season}
            </Badge>
            <Badge variant="outline">
              Episode {episodeNum}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {episode.name}
          </h1>
          
          <div className="text-gray-600 space-y-2">
            <p className="text-lg">Aired: {episode.air_date}</p>
            <p>Episode Code: {episode.episode}</p>
            <p>Characters Featured: {episode.characters.length}</p>
          </div>
        </div>

        {/* Characters Grid */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Characters in this Episode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {episode.characters.map((character, index) => (
                <Link key={character.id} href={`/characters/${character.id}`}>
                  <div className="group cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={character.image} alt={character.name} />
                      <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-semibold text-center text-gray-900 group-hover:text-blue-600 transition-colors">
                      {character.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">{character.species}</p>
                    <div className="flex justify-center mt-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          character.status === 'Alive' ? 'bg-green-100 text-green-800' : 
                          character.status === 'Dead' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {character.status}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
