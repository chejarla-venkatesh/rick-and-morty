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
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-red-500 text-xl">Error loading character: {error.message}</p>
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
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-fade-in-up">
          <div className="relative">
            <Avatar className="w-full h-96 rounded-xl shadow-2xl">
              <AvatarImage 
                src={character.image} 
                alt={character.name}
                className="object-cover"
              />
              <AvatarFallback className="w-full h-96 text-6xl">
                {character.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {character.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge className={`${getStatusColor(character.status)} text-white`}>
                  {character.status}
                </Badge>
                <span className="text-gray-600 text-lg">{character.species}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Gender</h3>
                <p className="text-gray-600">{character.gender}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Origin</h3>
                <p className="text-gray-600">{character.origin.name}</p>
                {character.origin.dimension && (
                  <p className="text-sm text-gray-500">{character.origin.dimension}</p>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Last Known Location</h3>
                <p className="text-gray-600">{character.location.name}</p>
                {character.location.dimension && (
                  <p className="text-sm text-gray-500">{character.location.dimension}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Episodes ({character.episode.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {character.episode.map((episode) => (
                <div 
                  key={episode.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900">{episode.name}</h4>
                  <p className="text-sm text-gray-600">{episode.episode}</p>
                  <p className="text-xs text-gray-500">{episode.air_date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
