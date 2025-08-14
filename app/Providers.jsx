'use client';

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import Navbar from "@/components/Navbar";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
          <div className="min-h-screen bg-animated-gradient relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-40 left-40 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
            </div>
            
            {/* Content overlay */}
            <div className="relative z-10 backdrop-blur-sm">
              <Navbar />
              <main className="transition-all duration-500 ease-in-out">
                {children}
              </main>
            </div>
          </div>
        </ApolloProvider>
  );
}