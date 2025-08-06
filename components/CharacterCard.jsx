'use client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const CharacterCard = ({ character, index = 0 }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return 'bg-green-500 hover:bg-green-600';
      case 'Dead': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Link href={`/characters/${character.id}`}>
      <Card 
        className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fade-in-up`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative overflow-hidden">
          <Avatar className="w-full h-64 rounded-none">
            <AvatarImage 
              src={character.image} 
              alt={character.name}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <AvatarFallback className="w-full h-64 text-2xl">
              {character.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <Badge className={`${getStatusColor(character.status)} text-white border-0`}>
              {character.status}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {character.name}
          </h3>
          <p className="text-gray-600 mb-1 font-medium">{character.species}</p>
          <p className="text-sm text-gray-500">{character.origin.name}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CharacterCard;
