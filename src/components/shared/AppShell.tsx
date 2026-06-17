'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import ScrollProvider from './ScrollProvider';
import FloatingLeaves from './FloatingLeaves';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <ScrollProvider>
      <CustomCursor />
      <FloatingLeaves />
      
      <div className="flex flex-col min-h-screen">
        <Navbar onCartOpen={() => setCartOpen(true)} onSearchOpen={() => setSearchOpen(true)} />
        
        <main className="flex-grow">{children}</main>
        
        <Footer />
      </div>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </ScrollProvider>
  );
}
