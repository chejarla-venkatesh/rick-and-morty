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
        className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp bg-white/80 backdrop-blur-sm`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="pb-6">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-base px-3 py-1 font-semibold">
              Season {season}
            </Badge>
            <Badge variant="outline" className="text-base px-3 py-1 font-medium">
              Episode {episodeNum}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold font-display group-hover:text-blue-600 transition-colors duration-200 mb-3">
            {episode.name}
          </CardTitle>
          <p className="text-lg text-gray-600 font-body">{episode.air_date}</p>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4 font-body">
              <span className="font-semibold">Characters:</span> {episode.characters.length}
            </p>
            
            {/* Character Avatars */}
            <div className="flex -space-x-2 overflow-hidden mb-4">
              {episode.characters.slice(0, 6).map((character) => (
                <Avatar 
                  key={character.id} 
                  className="inline-block border-2 border-white w-12 h-12 hover:scale-110 transition-transform duration-200"
                >
                  <AvatarImage 
                    src={character.image} 
                    alt={character.name}
                  />
                  <AvatarFallback className="text-base font-semibold">
                    {character.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {episode.characters.length > 6 && (
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full border-2 border-white text-sm font-bold text-gray-600">
                  +{episode.characters.length - 6}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-base text-gray-500 font-body">
            {episode.episode} • {episode.characters.length} characters
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EpisodeCard;
