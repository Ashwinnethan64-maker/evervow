import React, { useState } from 'react';
import { weddingData } from '../../config/weddingData';
import './AddToCalendar.css';

/**
 * 3. "Add to Calendar" Smart Button (.ics / Google / Apple / Outlook)
 * Generates calendar export links and standard .ics files.
 * Includes authentic, recognizable brand logos for Google, Apple, and Outlook.
 */
export const AddToCalendar = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { couple, events } = weddingData;

  const title = `${couple.groom.firstName} & ${couple.bride.firstName}'s Engagement Ceremony`;
  const description = `Together with our families, we invite you to celebrate the engagement ceremony of Ash and Sakshi.\n\nDate: Friday, 14 August 2026\nTime: 7:15 PM onwards\nVenue: Woodrose, Belgaum, Karnataka\nWebsite: https://evervow-ash-sakshi.vercel.app`;
  const location = "Woodrose, Belgaum, Karnataka, India";
  const startIso = "20260814T134500Z"; // 7:15 PM IST in UTC
  const endIso = "20260814T183000Z";   // 12:00 AM IST in UTC

  // 1. Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // 2. Outlook Web URL
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=2026-08-14T19:15:00+05:30&enddt=2026-08-14T23:59:00+05:30&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // 3. Apple Calendar / .ics File Generator
  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//EverVow//Ash and Sakshi Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      `LOCATION:${location}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Ash & Sakshi's Engagement Tomorrow",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ash_and_Sakshi_Wedding_14Aug2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <div className={`add-to-calendar-container ${className}`}>
      <button
        type="button"
        className="add-to-calendar-trigger-btn"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span className="calendar-icon">📅</span>
        <span>SAVE THE DATE TO CALENDAR</span>
        <span className="calendar-chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="calendar-dropdown-menu" role="menu">
          {/* Google Calendar with Official Multi-color Logo */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-option"
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            <span className="cal-brand-logo-wrap" aria-hidden="true">
              <svg className="cal-brand-svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </span>
            <span>Google Calendar</span>
          </a>

          {/* Apple Calendar with Official Monochrome Apple Logo */}
          <button
            type="button"
            className="calendar-option"
            onClick={downloadIcs}
            role="menuitem"
          >
            <span className="cal-brand-logo-wrap" aria-hidden="true">
              <svg className="cal-brand-svg" viewBox="0 0 170 170" width="18" height="18" fill="#1A1411">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.7-7.85-12-14.4-6.3-9.59-11.23-20.7-14.8-33.32-3.56-12.63-5.34-24.36-5.34-35.18 0-14.52 3.65-26.68 10.96-36.48 7.3-9.8 16.63-14.83 27.99-15.08 5.11 0 10.66 1.34 16.66 4.01 6 2.68 9.94 4.08 11.81 4.22 1.63 0 5.65-1.39 12.06-4.17 6.41-2.78 12.04-4.04 16.9-3.78 12.87.64 23.36 5.56 31.47 14.77-11.23 6.81-16.73 16.32-16.51 28.53.22 9.53 3.96 17.65 11.22 24.35 4.5 4.15 9.77 7.08 15.82 8.79-2.39 7.07-5.38 14.07-8.98 21zm-24.96-107.82c0 6.64-2.42 12.87-7.26 18.69-5.94 7.08-13.34 11.24-21.75 11.02-.11-1.09-.16-2.07-.16-2.94 0-6.64 2.65-13.19 7.74-19.04 2.72-3.15 6.09-5.83 10.12-8.04 4.02-2.22 7.74-3.46 11.15-3.73.1.98.16 2.04.16 3.04z"/>
              </svg>
            </span>
            <span>Apple Calendar (.ics)</span>
          </button>

          {/* Microsoft Outlook with Official Outlook Blue & Cyan Logo */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-option"
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            <span className="cal-brand-logo-wrap" aria-hidden="true">
              <svg className="cal-brand-svg" viewBox="0 0 32 32" width="18" height="18">
                <path fill="#0078D4" d="M18 6l10 3.33v13.34L18 26V6z"/>
                <path fill="#28A8EA" d="M18 10l8 2.67v6.66L18 22V10z"/>
                <path fill="#0078D4" d="M4 8h14v16H4z"/>
                <circle cx="11" cy="16" r="4.5" fill="#FFFFFF"/>
                <circle cx="11" cy="16" r="2.5" fill="#0078D4"/>
              </svg>
            </span>
            <span>Outlook Calendar</span>
          </a>
        </div>
      )}
    </div>
  );
};
