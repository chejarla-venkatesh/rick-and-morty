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
          <Skeleton className="h-16 w-3/4 mb-6" />
          <Skeleton className="h-8 w-1/2 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
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
        <p className="text-red-500 text-2xl font-body">Error loading episode: {error.message}</p>
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
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Episode Header */}
        <div className="mb-16 animate-fadeInUp">
          <div className="flex items-center space-x-6 mb-6">
            <Badge className="bg-blue-600 text-white text-xl px-6 py-3 font-semibold">
              Season {season}
            </Badge>
            <Badge variant="outline" className="text-xl px-6 py-3 font-medium border-2">
              Episode {episodeNum}
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display text-gray-900 mb-8 leading-tight">
            {episode.name}
          </h1>
          
          <div className="text-gray-600 space-y-3 text-xl font-body">
            <p><span className="font-semibold">Aired:</span> {episode.air_date}</p>
            <p><span className="font-semibold">Episode Code:</span> {episode.episode}</p>
            <p><span className="font-semibold">Characters Featured:</span> {episode.characters.length}</p>
          </div>
        </div>

        {/* Characters Grid */}
        <Card className="animate-fadeInUp shadow-2xl" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold font-display text-gray-900">
              Characters in this Episode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {episode.characters.map((character, index) => (
                <Link key={character.id} href={`/characters/${character.id}`}>
                  <div className="group cursor-pointer p-6 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1 bg-white/60 backdrop-blur-sm">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={character.image} alt={character.name} />
                      <AvatarFallback className="text-xl font-bold">{character.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-xl font-semibold font-display text-center text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {character.name}
                    </h3>
                    <p className="text-lg text-gray-600 text-center font-body mb-3">{character.species}</p>
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className={`text-base px-3 py-1 ${
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
