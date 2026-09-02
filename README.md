# EverVow

EverVow is a premium wedding website crafted to deliver an elegant, romantic, and memorable digital wedding invitation and celebration experience. Designed with an editorial aesthetic, refined typography, and smooth CSS-driven interactions, EverVow offers guests an immersive journey from the first reveal to event celebration.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESNext-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Design_Tokens-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License](https://img.shields.io/badge/License-Private-lightgrey.svg)]()

---

## ✨ Features

- **Editorial Wedding-Focused UI**: Curated luxury typography, bespoke flourishes, refined borders, and warm palette tokens tailored specifically for an elevated wedding presentation.
- **Hero Landmark & Brand Identity**: Romantic hero section featuring couple portraiture, ceremony date badges, and a custom EverVow monogram emblem.
- **Interactive Scratch Card Reveal**: A gamified, celebratory scratch-card canvas experience with custom confetti and sound effects to unveil wedding surprises.
- **Formal Wedding Stationery Invitation**: Digital stationery sheet design displaying traditional invocations (*Shree Ganeshaya Namaha*), host announcements, and ceremony details.
- **Live Countdown Timer**: Real-time ticker counting down the days, hours, minutes, and seconds to the celebration.
- **Ceremony & Venue Showcase**: Detailed venue cards with ceremony timing, address details, and direct Google Maps navigation links.
- **Editorial Photo Gallery & Lightbox**: Curated photo grid capturing key moments with an interactive, full-screen lightbox modal supporting image zoom and navigation.
- **Interactive RSVP Experience**: Form for guests to confirm attendance, submit guest counts, select dietary preferences, and leave warm wishes.
- **Live Guestbook**: Interactive message board enabling guests to write and display heartfelt blessings and memories in real time.
- **Responsive Navigation**: Fixed top header with smooth section scrolling, dynamic background transitions, and full mobile navigation menu support.
- **Refined Reveal Animations**: Lightweight viewport entrance animations (fade, slide, zoom) that bring content to life as the user scrolls.

---

## 🎨 Design & Experience

The design philosophy behind EverVow is anchored in timeless sophistication:

- **Elegant & Premium**: Inspired by bespoke printed wedding stationery, utilizing high-contrast editorial serifs (`Playfair Display`, `Cormorant Garamond`) paired with clean sans-serif accents (`Montserrat`).
- **Warm & Romantic Palette**: Thoughtfully balanced tones of warm champagne, blush rose, deep burgundy, and gold accents.
- **Cinematic & Balanced Motion**: Animations and scroll transitions are orchestrated to feel graceful and organic, elevating the emotional atmosphere without ever overwhelming the reader.
- **Fully Responsive & Accessible**: Meticulously structured layouts optimized for desktops, tablets, and mobile smartphones with fluid typography and touch-friendly controls.

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/)
- **Build Tool & Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: Vanilla CSS3 with Custom Design Tokens (`tokens.css`, `global.css`)
- **Linter & Code Quality**: [Oxlint](https://oxc.rs/)
- **State & Storage**: React Hooks (`useState`, `useEffect`, `useRef`) with LocalStorage service persistence for RSVP and Guestbook

---

## 📁 Project Structure

```text
evervow/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── gallery/
│   │   │   ├── og/
│   │   │   └── venue/
│   │   └── wedding/
│   ├── Logos/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/             # Reusable UI components (BrandLogo, Lightbox, ScratchCard, etc.)
│   │   ├── layout/             # Navigation header and footer
│   │   └── sections/           # Landing sections (Hero, Story, Invitation, Countdown, Venue, Gallery, RSVP, Guestbook)
│   ├── config/
│   │   └── weddingData.js      # Centralized wedding information & content configuration
│   ├── services/
│   │   ├── guestbookService.js # Guestbook storage & data handling
│   │   └── rsvpService.js      # RSVP submission & management
│   ├── styles/
│   │   ├── global.css          # Core layouts and global rules
│   │   └── tokens.css          # Color tokens, typography, and spacing variables
│   ├── App.jsx                 # Main application structure
│   ├── index.css
│   └── main.jsx
├── .oxlintrc.json
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or newer recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashwinnethan64-maker/evervow.git
   cd evervow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run linter:
   ```bash
   npm run lint
   ```
