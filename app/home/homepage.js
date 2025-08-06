'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Explore the
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {" "}Rick & Morty
          </span>
          <br />Universe
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover characters, episodes, and dimensions from the multiverse. 
          Dive into the chaotic world of Rick and Morty.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/characters">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              Meet Characters
            </Button>
          </Link>
          <Link href="/episodes">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-gray-300 hover:border-blue-300 hover:text-blue-600">
              Watch Episodes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
