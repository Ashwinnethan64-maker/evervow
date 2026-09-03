import React from 'react';
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
import './styles/global.css';

function App() {
  return (
    <div className="site-wrapper">
      <AmbientBackground />
      <Navigation />
      <main id="main-content">
        <Hero />
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
    </div>
  );
}

export default App;
