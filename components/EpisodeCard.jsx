'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const EpisodeCard = ({ episode, index = 0 }) => {
  // Extract season and episode number from episode code (e.g., "S01E01")
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
    <Link href={`/episodes/${episode.id}`}>
      <Card 
        className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Season {season}
            </Badge>
            <Badge variant="outline">
              Episode {episodeNum}
            </Badge>
          </div>
          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">
            {episode.name}
          </CardTitle>
          <p className="text-sm text-gray-600">{episode.air_date}</p>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-semibold">Characters:</span> {episode.characters.length}
            </p>
            
            {/* Character Avatars */}
            <div className="flex -space-x-2 overflow-hidden">
              {episode.characters.slice(0, 6).map((character) => (
                <Avatar 
                  key={character.id} 
                  className="inline-block border-2 border-white w-10 h-10 hover:scale-110 transition-transform duration-200"
                >
                  <AvatarImage 
                    src={character.image} 
                    alt={character.name}
                  />
                  <AvatarFallback className="text-xs">
                    {character.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {episode.characters.length > 6 && (
                <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full border-2 border-white text-xs font-semibold text-gray-600">
                  +{episode.characters.length - 6}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            {episode.episode} • {episode.characters.length} characters
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EpisodeCard;
