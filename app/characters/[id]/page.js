'use client';
import { use } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '../../../lib/queries';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function CharacterDetailPage({ params }) {
  const { id } = use(params);
  
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-500 text-2xl font-body">Error loading character: {error.message}</p>
      </div>
    );
  }

  const character = data?.character;
  if (!character) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return 'bg-green-500';
      case 'Dead': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 animate-fadeInUp">
          <div className="relative">
            <Avatar className="w-full h-[500px] rounded-xl shadow-2xl">
              <AvatarImage 
                src={character.image} 
                alt={character.name}
                className="object-cover"
              />
              <AvatarFallback className="w-full h-[500px] text-6xl bg-gradient-to-br from-green-200 to-blue-200 font-display">
                {character.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-6 uppercase tracking-wide">
                {character.name}
              </h1>
              <div className="flex items-center space-x-6 mb-6">
                <Badge className={`${getStatusColor(character.status)} text-white text-lg px-4 py-2 font-semibold`}>
                  {character.status}
                </Badge>
                <span className="text-2xl text-gray-600 font-body font-medium">{character.species}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold font-display text-gray-900 mb-2">Gender</h3>
                <p className="text-xl text-gray-600 font-body">{character.gender}</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold font-display text-gray-900 mb-2">Origin</h3>
                <p className="text-xl text-gray-600 font-body">{character.origin.name}</p>
                {character.origin.dimension && (
                  <p className="text-lg text-gray-500 font-body">{character.origin.dimension}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold font-display text-gray-900 mb-2">Last Known Location</h3>
                <p className="text-xl text-gray-600 font-body">{character.location.name}</p>
                {character.location.dimension && (
                  <p className="text-lg text-gray-500 font-body">{character.location.dimension}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <Card className="animate-fadeInUp shadow-2xl" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold font-display text-gray-900">
              Episodes ({character.episode.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {character.episode.map((episode) => (
                <div 
                  key={episode.id}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:border-green-300 transition-all duration-300 bg-white/60 backdrop-blur-sm"
                >
                  <h4 className="text-xl font-semibold font-display text-gray-900 mb-2">{episode.name}</h4>
                  <p className="text-lg text-gray-600 font-mono font-medium mb-1">{episode.episode}</p>
                  <p className="text-base text-gray-500 font-body">{episode.air_date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
