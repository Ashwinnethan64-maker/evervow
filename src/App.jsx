import React, { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { Story } from './components/sections/Story';
import { Surprise } from './components/sections/Surprise';
import { Invitation } from './components/sections/Invitation';
import { Countdown } from './components/sections/Countdown';
import { Venue } from './components/sections/Venue';
import { Gallery } from './components/sections/Gallery';
import { RSVP } from './components/sections/RSVP';
import { Guestbook } from './components/sections/Guestbook';
import { Footer } from './components/layout/Footer';
import { AmbientBackground } from './components/common/AmbientBackground';
import { WaxSealEnvelope } from './components/common/WaxSealEnvelope';
import { MusicPlayer } from './components/common/MusicPlayer';
import { WeddingInvitationPrint } from './components/common/WeddingInvitationPrint';
import './styles/global.css';

function App() {
  const [hasUnsealed, setHasUnsealed] = useState(false);

  return (
    <div className="site-wrapper">
      {/* 1. Personalized Wax Seal Opener */}
      <WaxSealEnvelope onUnseal={() => setHasUnsealed(true)} />

      {/* Background Ambient Float / Petals */}
      <AmbientBackground />

      {/* 2. Floating Minimalist Vinyl Audio Player */}
      <MusicPlayer />

      {/* Main Navigation */}
      <Navigation />

      <main id="main-content">
        {/* Key changes upon unsealing to cleanly mount Hero and replay all entrance animations */}
        <Hero key={hasUnsealed ? 'hero-unsealed' : 'hero-sealed'} />
        <Story />
        <Surprise />
        <Invitation />
        <Countdown />
        <Venue />
        <Gallery />
        <RSVP />
        <Guestbook />
      </main>

      <Footer />

      {/* 5. Dedicated Single-Page Wedding Invitation PDF/Print Layout */}
      <WeddingInvitationPrint />
    </div>
  );
}

export default App;
