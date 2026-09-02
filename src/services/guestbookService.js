/**
 * Guestbook Service Abstraction & Sanitization
 * Manages guestbook wishes, moderation states, and text sanitization.
 */

const STORAGE_KEY = 'evervow_guestbook_wishes';

const INITIAL_WISHES = [
  {
    id: 'wish_1',
    name: 'Rohan & Ananya',
    wish: 'May your journey together be blessed with endless laughter, gentle adventures, and a love that deepens with every passing year. So thrilled to celebrate with you both!',
    submittedAt: '2026-08-01T12:00:00.000Z'
  },
  {
    id: 'wish_2',
    name: 'The Verma Family',
    wish: 'Warmest congratulations to dearest Ash and Sakshi. May your union bring joy, peace, and abundance to both families!',
    submittedAt: '2026-08-02T14:30:00.000Z'
  }
];

/**
 * Sanitize plain text, escape HTML tags, and enforce length limits
 */
export const sanitizeText = (input, maxLength = 600) => {
  if (!input) return '';
  return String(input)
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[<>&"']/g, (match) => {
      const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return escapeMap[match] || match;
    })
    .trim()
    .slice(0, maxLength);
};

export const guestbookService = {
  /**
   * Fetch approved wishes
   */
  async getWishes() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WISHES));
      return INITIAL_WISHES;
    } catch (e) {
      return INITIAL_WISHES;
    }
  },

  /**
   * Add a new wish with sanitization
   */
  async addWish(data) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const name = sanitizeText(data.name, 60);
    const wish = sanitizeText(data.wish, 600);

    if (!name || !wish) {
      throw new Error('Name and wish are required');
    }

    const newWish = {
      id: `wish_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      wish,
      submittedAt: new Date().toISOString()
    };

    const existing = await this.getWishes();
    const updated = [newWish, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return newWish;
  }
};
