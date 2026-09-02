/**
 * RSVP Service Abstraction
 * Manages RSVP submissions and persistence without exposing credentials or internal backend logic.
 */

const STORAGE_KEY = 'evervow_rsvps';

export const rsvpService = {
  /**
   * Submit guest RSVP
   * @param {Object} data - { id, guestName, phone, guestCount, attendance, events, mealPreference, message, submittedAt }
   * @returns {Promise<{ success: boolean, id: string }>}
   */
  async submitRSVP(data) {
    // Simulate brief network latency for authentic luxury feel
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const sanitized = {
        id: data.id || `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        guestName: String(data.guestName || '').trim(),
        phone: String(data.phone || '').trim(),
        guestCount: Number(data.guestCount) || 1,
        attendance: data.attendance || 'attending',
        events: Array.isArray(data.events) ? data.events : [],
        mealPreference: data.mealPreference || 'Vegetarian',
        message: String(data.message || '').trim(),
        submittedAt: new Date().toISOString()
      };

      // Persist to local storage buffer
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.push(sanitized);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      return { success: true, id: sanitized.id };
    } catch (error) {
      console.error('RSVP submission error:', error);
      throw new Error('Failed to submit RSVP');
    }
  }
};
