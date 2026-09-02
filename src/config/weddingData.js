/**
 * EverVow Wedding Microsite Central Data Store
 * Couple: Ash & Sakshi
 * Brand: EverVow
 * Date: 14 August 2026 | 7:15 PM
 * Venue: Woodrose, Belgaum, Karnataka
 */

export const weddingData = {
  couple: {
    groom: {
      firstName: "Ash",
      fullName: "Ashwin",
      role: "Groom"
    },
    bride: {
      firstName: "Sakshi",
      fullName: "Sakshi",
      role: "Bride"
    },
    monogram: "A + S",
    brandName: "EverVow",
    dateFormatted: "Friday, 14 August 2026",
    dateDisplay: "14 August 2026",
    timeDisplay: "7:15 PM onwards",
    venueSummary: "Woodrose, Belgaum, Karnataka",
    hashtag: "#AshSakshiForever"
  },

  navigation: [
    { label: "Story", href: "#story" },
    { label: "Surprise", href: "#surprise" },
    { label: "Invitation", href: "#invitation" },
    { label: "Venue", href: "#venue" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#rsvp" }
  ],

  hero: {
    eyebrow: "TOGETHER WITH OUR FAMILIES",
    scriptJoiner: "WITH",
    tagline: "SAVE THE DATE",
    date: "14 August 2026",
    location: "Woodrose, Belgaum",
    heroImage: "/assets/wedding/couple.jpg",
    heroImageAlt: "Ash & Sakshi intimate wedding ceremony artwork",
    scrollHint: "SCROLL TO EXPLORE"
  },

  story: {
    eyebrow: "OUR CHAPTERS",
    title: "An engagement story",
    blocks: [
      {
        numeral: "I",
        heading: "How it began",
        quote: "“A quiet conversation that never quite ended.”",
        paragraph: "What began as a simple conversation slowly became something neither of us wanted to leave behind. Somewhere between ordinary moments and unexpected smiles, Ash and Sakshi found the beginning of something worth holding onto.",
        image: "/assets/wedding/story-1-BE3UnMDF.jpg",
        imageAlt: "Ash and Sakshi under wedding floral archway",
        imageCaption: "Where conversations turned into promises"
      },
      {
        numeral: "II",
        heading: "The quiet yes",
        quote: "“In a world of ordinary days, you are my perfect moment.”",
        paragraph: "Some moments arrive quietly, without asking for attention. For Ash and Sakshi, one of those moments became a quiet yes — a promise to keep choosing one another through every ordinary and extraordinary day.",
        image: "/assets/wedding/story-2-A463YQLO.jpg",
        imageAlt: "Ash and Sakshi sharing a quiet tea ceremony moment",
        imageCaption: "A promise of warmth and togetherness"
      }
    ]
  },

  surprise: {
    heading: "A special surprise awaits you",
    subtitle: "Gently scratch the gold foil to uncover the day we have been waiting for.",
    foilCover: {
      tagline: "SAVE THE DATE",
      dateHint: "AUGUST 2026",
      yearHint: "BELGAUM",
      instruction: "SCRATCH TO REVEAL",
      note: "Rub gently with finger or mouse cursor"
    },
    revealed: {
      date: "14 August 2026",
      announcement: "WE ARE GETTING ENGAGED",
      location: "Woodrose, Belgaum",
      time: "7:15 PM ONWARDS",
      badge: "Save The Date"
    }
  },

  invitation: {
    eyebrow: "FORMAL INVITATION",
    title: "You Are Cordially Invited",
    primaryEventId: "engagement",
    ceremonialHeader: "Shree Ganeshaya Namaha",
    warmClosing: "We eagerly look forward to your gracious presence and heartfelt blessings."
  },

  events: [
    {
      id: "engagement",
      title: "The Engagement Ceremony",
      invitationPrompt: "Together with our families, we invite you to join us in celebrating our engagement ceremony",
      dateFormatted: "Friday, 14 August 2026",
      timeFormatted: "7:15 PM onwards",
      venueFormatted: "Woodrose, Belgaum, Karnataka",
      isoDateTime: "2026-08-14T19:15:00+05:30",
      regards: "WITH WARM REGARDS FROM BOTH FAMILIES"
    }
  ],

  countdown: {
    eyebrow: "COUNTING THE DAYS",
    heading: "Until the evening begins",
    targetEventId: "engagement",
    completedMessage: "The celebration has begun! Thank you for being with us."
  },

  venue: {
    eyebrow: "LOCATION & TRAVEL",
    title: "Woodrose, Belgaum",
    name: "Woodrose",
    city: "Belgaum",
    state: "Karnataka",
    timingDisplay: "Friday, 14 August 2026 · 7:15 PM onwards",
    image: "/assets/images/venue/venue-nqUDGq52.jpg",
    imageAlt: "Woodrose Banquet Hall estate entrance in Belgaum",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Woodrose+Banquet+Hall+Belgaum+Karnataka",
    embedMapUrl: "https://maps.google.com/maps?q=Woodrose+Banquet+Hall+Belgaum+Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed",
    additionalInfo: {
      valet: "Valet parking service will be available at the main entrance.",
      attire: "Traditional Indian / Formal Evening Wear",
      airport: "Belgaum Airport (IXG) is approximately 25 minutes from the venue."
    }
  },

  gallery: {
    eyebrow: "EDITORIAL",
    heading: "Moments, framed",
    subtitle: "A glimpse into our quiet laughter, candid glances, and shared adventures.",
    images: [
      {
        id: "gallery-01-arch",
        src: "/assets/wedding/story-1-BE3UnMDF.jpg",
        alt: "Ash and Sakshi standing together under a floral archway",
        caption: "Where conversations turned into promises",
        layout: "feature"
      },
      {
        id: "gallery-02-proposal",
        src: "/assets/wedding/couple.jpg",
        alt: "Ash proposing to Sakshi amidst floral drapery",
        caption: "A timeless promise",
        layout: "top-sub-left"
      },
      {
        id: "gallery-03-tea",
        src: "/assets/wedding/story-2-A463YQLO.jpg",
        alt: "Ash and Sakshi sharing a quiet tea ceremony moment",
        caption: "In a world of ordinary days, you are my perfect moment",
        layout: "top-sub-right"
      },
      {
        id: "gallery-04-venue",
        src: "/assets/images/venue/venue-nqUDGq52.jpg",
        alt: "Woodrose Banquet Hall illuminated entrance with floral arch",
        caption: "The Grand Entrance at Woodrose",
        layout: "wide-venue"
      },
      {
        id: "gallery-05-sunset",
        src: "/assets/wedding/thankyou-0fdsHCDC.jpg",
        alt: "Ash and Sakshi standing hand in hand against romantic pastel sunset",
        caption: "With all our love — toward forever",
        layout: "bottom-wide"
      }
    ]
  },

  rsvp: {
    eyebrow: "CELEBRATE WITH US",
    heading: "Will you join our celebration?",
    subtitle: "Kindly let us know by 15 July 2026",
    deadline: "15 July 2026",
    deadlineIso: "2026-07-15",
    maxGuests: 10,
    successTitle: "Thank you for your RSVP",
    successSubtitle: "We look forward to celebrating this special milestone with you.",
    errorMessage: "Something went wrong while submitting your RSVP. Please try again.",
    submitText: "CONFIRM ATTENDANCE",
    submittingText: "CONFIRMING...",
    fields: {
      nameLabel: "Your Full Name",
      namePlaceholder: "Enter your full name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      attendanceLabel: "Will you be able to attend?",
      attendanceOptions: {
        attending: "Joyfully Accepts",
        declined: "Regretfully Declines"
      },
      guestsLabel: "Number of Guests Attending",
      mealLabel: "Dietary & Meal Preference",
      mealOptions: ["Vegetarian", "Jain Vegetarian", "Non-Vegetarian", "Other"],
      mealOtherPlaceholder: "Please specify dietary requirements",
      messageLabel: "A Warm Message for the Couple (Optional)",
      messagePlaceholder: "Leave a warm blessing, memory, or note for Ash & Sakshi..."
    }
  },

  guestbook: {
    eyebrow: "WARMEST WISHES",
    heading: "Leave a note for Ash & Sakshi",
    subtitle: "Your blessings and warm words mean the world to us as we begin our forever.",
    placeholderNote: "Write your blessings, advice, or warm memories for the couple...",
    initialWishes: [
      {
        id: "wish-01",
        author: "Aunt Sunita & Family",
        message: "May your journey ahead be filled with overflowing laughter, deep understanding, and endless happiness!",
        date: "2026-08-01"
      },
      {
        id: "wish-02",
        author: "Rohan & Priya",
        message: "From college canteen chats to this beautiful forever — couldn't be happier for you both! Cheers to Ash & Sakshi!",
        date: "2026-08-05"
      },
      {
        id: "wish-03",
        author: "Grandma Sharma",
        message: "Blessings and love for a lifetime of togetherness, warmth, and peace. You two are meant for each other.",
        date: "2026-08-10"
      }
    ]
  }
};
