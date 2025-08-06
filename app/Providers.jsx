'use client';

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import Navbar from "@/components/Navbar";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    </ApolloProvider>
  );
}