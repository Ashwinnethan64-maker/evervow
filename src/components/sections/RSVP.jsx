import React, { useState } from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import { rsvpService } from '../../services/rsvpService';
import './RSVP.css';

export const RSVP = () => {
  const { rsvp, events } = weddingData;
  const showEventsSelection = Array.isArray(events) && events.length > 1;

  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    guestCount: 1,
    attendance: 'attending',
    selectedEvents: events.map(e => e.id),
    mealPreference: 'Vegetarian',
    mealOther: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.attendance) {
      newErrors.attendance = 'Please select your attendance.';
    }

    if (showEventsSelection && formData.attendance === 'attending' && formData.selectedEvents.length === 0) {
      newErrors.selectedEvents = 'Please select at least one celebration.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await rsvpService.submitRSVP({
        guestName: formData.guestName,
        phone: formData.phone,
        guestCount: formData.attendance === 'attending' ? formData.guestCount : 0,
        attendance: formData.attendance,
        events: formData.attendance === 'attending' ? formData.selectedEvents : [],
        mealPreference: formData.mealPreference === 'Other' && formData.mealOther ? `Other: ${formData.mealOther}` : formData.mealPreference,
        message: formData.message
      });

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(rsvp.errorMessage || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="editorial-section rsvp-section" aria-label="Wedding RSVP">
      {/* Background radial glow */}
      <div className="rsvp-paper-backdrop" aria-hidden="true" />

      <div className="section-container rsvp-inner-container">
        
        {/* Section Heading */}
        <header className="rsvp-header text-center">
          <RevealAnimation animation="fade-up">
            <Eyebrow>{rsvp.eyebrow || "KINDLY RESPOND"}</Eyebrow>
            <h2 className="rsvp-main-heading">{rsvp.heading || "Will you join us?"}</h2>
            <Divider symbol="star" className="rsvp-divider" />
            <p className="rsvp-subtitle">{rsvp.subtitle || "Your presence would make our evening complete."}</p>
          </RevealAnimation>
        </header>

        {/* Compact Centered Invitation Form Card with 900ms card-reveal */}
        <div className="rsvp-card-wrapper">
          <RevealAnimation animation="card-reveal" delay={200} duration={900}>
            <div className="rsvp-floating-card">
              
              {isSuccess ? (
                <div className="rsvp-success-state" aria-live="polite">
                  <span className="success-flourish">❦</span>
                  <h3 className="success-title">Thank you.</h3>
                  <p className="success-subtitle">Your response has been received with love.</p>
                </div>
              ) : (
                <form className="rsvp-editorial-form" onSubmit={handleSubmit} noValidate>
                  
                  {/* 1. Guest Name Underline Field */}
                  <div className="rsvp-field-group">
                    <label htmlFor="rsvp-guest-name" className="rsvp-field-label">
                      {rsvp.fields.nameLabel || "GUEST NAME"} <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="rsvp-guest-name"
                      name="guestName"
                      required
                      value={formData.guestName}
                      onChange={handleInputChange}
                      placeholder={rsvp.fields.namePlaceholder || "Your full name"}
                      className={`rsvp-underline-input ${errors.guestName ? 'input-error' : ''}`}
                      aria-invalid={!!errors.guestName}
                      aria-describedby={errors.guestName ? "guestName-error" : undefined}
                    />
                    {errors.guestName && (
                      <span id="guestName-error" className="rsvp-inline-error" role="alert">
                        {errors.guestName}
                      </span>
                    )}
                  </div>

                  {/* 2. Phone Number Underline Field */}
                  <div className="rsvp-field-group">
                    <label htmlFor="rsvp-phone" className="rsvp-field-label">
                      {rsvp.fields.phoneLabel || "PHONE NUMBER"} <span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="rsvp-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={rsvp.fields.phonePlaceholder || "Your contact number"}
                      className={`rsvp-underline-input ${errors.phone ? 'input-error' : ''}`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="rsvp-inline-error" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* 3 & 4. Balanced Two-Column Row on Desktop: ATTENDANCE & MEAL PREFERENCE */}
                  <div className="rsvp-two-col-row">
                    
                    {/* Attendance Column */}
                    <div className="rsvp-col-item">
                      <span className="rsvp-field-label">
                        {rsvp.fields.attendanceLabel || "ATTENDANCE"} <span className="required-star">*</span>
                      </span>
                      <div className="rsvp-options-vertical">
                        <label className="rsvp-custom-radio-row">
                          <input
                            type="radio"
                            name="attendance"
                            value="attending"
                            checked={formData.attendance === 'attending'}
                            onChange={handleInputChange}
                          />
                          <span className="radio-circle" />
                          <span className="radio-label-text">{rsvp.fields.attendanceOptions.attending || "Joyfully attending"}</span>
                        </label>

                        <label className="rsvp-custom-radio-row">
                          <input
                            type="radio"
                            name="attendance"
                            value="declined"
                            checked={formData.attendance === 'declined'}
                            onChange={handleInputChange}
                          />
                          <span className="radio-circle" />
                          <span className="radio-label-text">{rsvp.fields.attendanceOptions.declined || "Regretfully declines"}</span>
                        </label>
                      </div>
                    </div>

                    {/* Meal Preference Column */}
                    {formData.attendance === 'attending' && (
                      <div className="rsvp-col-item">
                        <span className="rsvp-field-label">
                          {rsvp.fields.mealLabel || "MEAL PREFERENCE"}
                        </span>
                        <div className="rsvp-options-vertical">
                          {(rsvp.fields.mealOptions || ["Vegetarian", "Jain Vegetarian", "Non-Vegetarian"]).map(option => (
                            <label key={option} className="rsvp-custom-radio-row">
                              <input
                                type="radio"
                                name="mealPreference"
                                value={option}
                                checked={formData.mealPreference === option}
                                onChange={handleInputChange}
                              />
                              <span className="radio-circle" />
                              <span className="radio-label-text">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Conditional Number of Guests */}
                  {formData.attendance === 'attending' && (
                    <div className="rsvp-field-group">
                      <label htmlFor="rsvp-guest-count" className="rsvp-field-label">
                        {rsvp.fields.guestsLabel || "NUMBER OF GUESTS"}
                      </label>
                      <select
                        id="rsvp-guest-count"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="rsvp-underline-select"
                      >
                        {Array.from({ length: rsvp.maxGuests || 10 }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* 5. Special Message Field */}
                  <div className="rsvp-field-group">
                    <label htmlFor="rsvp-message" className="rsvp-field-label">
                      {rsvp.fields.messageLabel || "A WARM NOTE (OPTIONAL)"}
                    </label>
                    <textarea
                      id="rsvp-message"
                      name="message"
                      rows="2"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={rsvp.fields.messagePlaceholder || "Leave a blessing or note for Ash & Sakshi..."}
                      className="rsvp-underline-textarea"
                    />
                  </div>

                  {/* Submission Error Banner */}
                  {submitError && (
                    <div className="rsvp-submit-error-banner" role="alert">
                      {submitError}
                    </div>
                  )}

                  {/* Luxury Champagne Pill Button */}
                  <div className="rsvp-submit-container">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="champagne-pill-btn"
                    >
                      {isSubmitting ? (rsvp.submittingText || "SENDING...") : (rsvp.submitText || "SEND MY RESPONSE")}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </RevealAnimation>
        </div>

      </div>
    </section>
  );
};
