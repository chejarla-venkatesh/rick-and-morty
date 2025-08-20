'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative">
      <div className="container mx-auto px-6 py-20 relative">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 opacity-30">
          <div className="text-6xl animate-float">🛸</div>
        </div>
        <div className="absolute top-40 right-20 w-16 h-16 opacity-30">
          <div className="text-4xl animate-float" style={{animationDelay: '1s'}}>⚡</div>
        </div>
        <div className="absolute bottom-40 left-20 w-12 h-12 opacity-30">
          <div className="text-3xl animate-float" style={{animationDelay: '2s'}}>🌀</div>
        </div>

        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-12">
            <div className="inline-block p-6 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 mb-8 animate-pulse-glow border border-emerald-500/30">
              <span className="text-5xl">🚀</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold font-display text-white mb-8 leading-tight tracking-wide">
            <span className="inline-block animate-fadeInUp">EXPLORE</span>{' '}
            <span className="inline-block animate-fadeInUp" style={{animationDelay: '0.2s'}}>THE</span>
            <br />
            <span className="text-sci-fi-animated inline-block font-bold text-5xl md:text-6xl">
              RICK & MORTY
            </span>
            <br />
            <span className="inline-block animate-fadeInUp" style={{animationDelay: '0.6s'}}>UNIVERSE</span>
          </h1>

          <p className={`text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-body transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            🌌 Discover characters, episodes, and dimensions from the multiverse. 
            Dive into the chaotic world of Rick and Morty with our comprehensive, beautifully animated explorer.
          </p>

          <div className={`flex flex-col sm:flex-row justify-center gap-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Link href="/characters">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-xl font-semibold px-10 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <span className="relative z-10 font-body">
                  Meet Characters
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20"></div>
              </Button>
            </Link>

            <Link href="/episodes">
              <Button 
                variant="outline" 
                size="lg" 
                className="group relative overflow-hidden text-xl font-semibold px-10 py-4 rounded-2xl border-2 border-white/30 hover:border-emerald-400 hover:text-emerald-400 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 glass-dark text-white"
              >
                <span className="relative z-10 font-body">
                  Watch Episodes
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/10 to-blue-50/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-50"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`container mx-auto px-6 py-20 transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '👥', label: 'Characters', value: '800+', color: 'from-emerald-500 to-emerald-600' },
            { icon: '📺', label: 'Episodes', value: '50+', color: 'from-blue-500 to-blue-600' },
            { icon: '🌌', label: 'Dimensions', value: '∞', color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-10 glass-dark rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fadeInUp border border-white/10"
              style={{animationDelay: `${0.8 + index * 0.2}s`}}
            >
              <div className={`inline-block p-6 rounded-full bg-gradient-to-r ${stat.color} text-white text-4xl mb-6 shadow-lg animate-float`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold font-display text-white mb-3">{stat.value}</h3>
              <p className="text-xl text-slate-300 font-medium font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
